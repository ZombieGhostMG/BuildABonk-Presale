import * as anchor from '@project-serum/anchor'
import { useEffect, useMemo, useState } from 'react'
import { PRESALE_PROGRAM_PUBKEY } from '../constants'
import { IDL as presaleIDL } from '../constants/idl'
import { SystemProgram } from '@solana/web3.js'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { authorFilter } from '../utils'
import toast from 'react-hot-toast'
import { ProgramAccount } from '@project-serum/anchor'

export function useTodo() {

    const handleChange = (e)=> {
        setInput(e.target.value)
    }

    const { connection } = useConnection()
    const { publicKey } = useWallet()
    const anchorWallet = useAnchorWallet()

    const [initialized, setInitialized] = useState(false)
    const [lastTodo, setLastTodo] = useState([])
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [transactionPending, setTransactionPending] = useState(false)
    const [input, setInput] = useState("")

    const program = useMemo(() => {
        if (anchorWallet) {
            const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
            return new anchor.Program(presaleIDL, PRESALE_PROGRAM_PUBKEY, provider)
        }
    }, [connection, anchorWallet])

    useEffect(() => {
        const findWalletAccounts = async () => {
            if (program && publicKey && !transactionPending) {
                try {
                    setLoading(true);
                    const [walletPDA, walletBump] = await findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId);
                    const walletAccount = await program.account.walletDetails.fetch(walletPDA);

                    if (walletAccount) {
                        setLastTodo([walletAccount.nextPresaleIdentifier])
                        setInitialized(true)

                        const todoAccounts = await program.account.todoAccount.all([authorFilter(publicKey.toString())])
                        setTodos(todoAccounts)
                    } else {
                        setInitialized(false)
                    }
                } catch (error) {
                    console.log(error)
                    setInitialized(false)
                    setTodos([])
                } finally {
                    setLoading(false)
                }
            }
        }

        findWalletAccounts()
    }, [publicKey, program, transactionPending])

    const initializeUser = async () => {
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                const [walletPDA, walletBump] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)

                const tx = await program.methods
                    .initializeUser()
                    .accounts({
                        userProfile: walletPDA,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId,
                    })
                    .rpc()
                setInitialized(true)
                toast.success('Successfully initialized user.')
            } catch (error) {
                console.log(error)
                toast.error(error.toString())
            } finally {
                setTransactionPending(false)
            }
        }
    }

    const addTodo = async (e) => {
        e.preventDefault()
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                const [walletPDA, walletBump] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                const [presalePDA, presaleBump] = findProgramAddressSync([utf8.encode('TODO_STATE'), publicKey.toBuffer(), Uint8Array.from(lastTodo)], program.programId)

                if (input) {

                await program.methods
                    .addTodo(input)
                    .accounts({
                        userProfile: walletPDA,
                        todoAccount: presalePDA,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId,
                    })
                    .rpc()
                toast.success('Successfully added todo.')
                }
            } catch (error) {
                console.log(error)
                toast.error(error.toString())
            } finally {
                setTransactionPending(false)
            }
        }
    }

    const markTodo = async (presalePDA, todoIdx) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                setLoading(true)
                const [walletPDA, walletBump] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)

                await program.methods
                    .markTodo(todoIdx)
                    .accounts({
                        userProfile: walletPDA,
                        todoAccount: presalePDA,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId,
                    })
                    .rpc()
                toast.success('Successfully marked todo.')
            } catch (error) {
                console.log(error)
                toast.success(error.toString())
            } finally {
                setLoading(false)
                setTransactionPending(false)
            }
        }
    }

    const removeTodo = async (presalePDA, todoIdx) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                setLoading(true)
                const [walletPDA, walletBump] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)

                await program.methods
                    .removeTodo(todoIdx)
                    .accounts({
                        userProfile: walletPDA,
                        todoAccount: presalePDA,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId,
                    })
                    .rpc()
                toast.success('Successfully removed todo.')
            } catch (error) {
                console.log(error)
                toast.error(error.toString())
            } finally {
                setLoading(false)
                setTransactionPending(false)
            }
        }
    }

    const incompleteTodos = useMemo(() => todos.filter((todo) => !todo.account.marked), [todos])
    const completedTodos = useMemo(() => todos.filter((todo) => todo.account.marked), [todos])

    return { initialized, initializeUser, loading, transactionPending, completedTodos, incompleteTodos, addTodo, markTodo, removeTodo, handleChange }
}

import * as anchor from "@project-serum/anchor";
import { Program, web3, BN } from "@project-serum/anchor";
import { TokenPresale } from "../target/types/token_presale";
import { PublicKey } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
} from "@solana/spl-token"; 
import { assert } from "chai";

describe("token_presale", () => {
  // Configure the client to use the local cluster.

  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TokenPresale as Program<TokenPresale>;
  const PROGRAM_ID = program.programId;

  const WALLET_SEED = "WALLET_SEED";
  const PRESALE_SEED = "PRESALE_SEED";

  const myWallet = anchor.AnchorProvider.env().wallet;
  const myPubkey = myWallet.publicKey;

  const pubkey1 = anchor.web3.Keypair.generate().publicKey;
  const pubkey2 = anchor.web3.Keypair.generate().publicKey;
  const TEN = new BN(10);
  const ONE = new BN(1);
  const TWO = new BN(2);


  const getWalletPDA = async () => {
    return (
      await PublicKey.findProgramAddressSync(
        [Buffer.from(WALLET_SEED), myPubkey.toBuffer()],
        PROGRAM_ID
      )
    )[0];
  };

  const getPresalePDA = async (presaleIdentifier: number) => {
    return (
      await PublicKey.findProgramAddressSync(
        [Buffer.from(PRESALE_SEED), myPubkey.toBuffer(), Uint8Array.from([presaleIdentifier])],
        PROGRAM_ID
      )
    )[0];
  };

  console.log(`My pubkey: ${myPubkey}`);
  console.log(`pubkey1: ${pubkey1}`);
  console.log(`pubkey2: ${pubkey2}`);

  it("Wallet account is initialized!", async () => {
    const walletPDA = await getWalletPDA();
    console.log(`Wallet account address: ${walletPDA}`);

    const tx = await program.methods
      .initializeWallet( )
      .accounts({
        walletDetails: walletPDA,
        authority: myPubkey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Presale account 0 is initialized!", async () => {

    const walletPDA = await getWalletPDA();
    const presalePDA = await getPresalePDA( 0 );
    console.log(`Wallet address: ${walletPDA}`);
    console.log(`Presale address: ${presalePDA}`);

    const tx = await program.methods
      .createPresale( pubkey1, pubkey2, TEN, ONE, TWO )
      .accounts({
        walletDetails: walletPDA,
        presaleDetails: presalePDA,
        authority: myPubkey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Your transaction signature", tx);
  });
  it("Presale account 1 is initialized!", async () => {

    const walletPDA = await getWalletPDA();
    const presalePDA = await getPresalePDA( 1 );
    console.log(`Wallet address: ${walletPDA}`);
    console.log(`Presale address: ${presalePDA}`);

    const tx = await program.methods
      .createPresale( pubkey1, pubkey2, TEN, ONE, TWO )
      .accounts({
        walletDetails: walletPDA,
        presaleDetails: presalePDA,
        authority: myPubkey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Your transaction signature", tx);
  });

  it("Edited presale account 1!", async () => {

    const presalePDA = await getPresalePDA( 1 );
    console.log(`Presale address: ${presalePDA}`);

    const tx = await program.methods
      .editPresale( 1, pubkey1, pubkey2, ONE, ONE, TEN )
      .accounts({
        presaleDetails: presalePDA,
        authority: myPubkey
      })
      .rpc();

    console.log("Your transaction signature", tx);
  });

  it("Got accounts!", async () => {

    const walletPDA = await getWalletPDA();
    const presalePDA = await getPresalePDA( 1 );
    console.log(`Presale address: ${presalePDA}`);

    const walletAccounts = await program.account.walletDetails.all();
    const presaleAccounts = await program.account.presaleDetails.all();
    const presaleAccount = await program.account.presaleDetails.fetch(presalePDA);

    // const todoAccounts = await program.account.todoAccount.all([authorFilter(publicKey.toString())])

    // const incompleteTodos = useMemo(() => todos.filter((todo) => !todo.account.marked), [todos])
    // const completedTodos = useMemo(() => todos.filter((todo) => todo.account.marked), [todos])

    console.log(walletAccounts);
    console.log(presaleAccounts);

  });



  const mintKey: anchor.web3.Keypair = anchor.web3.Keypair.generate();
  // AssociatedTokenAccount for anchor's workspace wallet
  let associatedTokenAccount = undefined;

  it("Mint a token", async () => {
    // Get anchor's wallet's public key
    const key = anchor.AnchorProvider.env().wallet.publicKey;
    // Get the amount of SOL needed to pay rent for our Token Mint
    const lamports: number = await program.provider.connection.getMinimumBalanceForRentExemption(
      MINT_SIZE
    );

    // Get the ATA for a token and the account that we want to own the ATA (but it might not existing on the SOL network yet)
    associatedTokenAccount = await getAssociatedTokenAddress(
      mintKey.publicKey,
      key
    );

    // Fires a list of instructions
    const mint_tx = new anchor.web3.Transaction().add(
      // Use anchor to create an account from the mint key that we created
      anchor.web3.SystemProgram.createAccount({
        fromPubkey: key,
        newAccountPubkey: mintKey.publicKey,
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID,
        lamports,
      }),
      // Fire a transaction to create our mint account that is controlled by our anchor wallet
      createInitializeMintInstruction(
        mintKey.publicKey, 0, key, key
      ),
      // Create the ATA account that is associated with our mint on our anchor wallet
      createAssociatedTokenAccountInstruction(
        key, associatedTokenAccount, key, mintKey.publicKey
      )
    );

    // sends and create the transaction
    const res = await anchor.AnchorProvider.env().sendAndConfirm(mint_tx, [mintKey]);

    console.log(
      await program.provider.connection.getParsedAccountInfo(mintKey.publicKey)
    );

    console.log("Account: ", res);
    console.log("Mint key: ", mintKey.publicKey.toString());
    console.log("User: ", key.toString());

    // Executes our code to mint our token into our specified ATA
    await program.methods.mintToken().accounts({
      mint: mintKey.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      tokenAccount: associatedTokenAccount,
      authority: key,
    }).rpc();

  });

  it("Transfer token", async () => {
    // Get anchor's wallet's public key
    const myWallet = anchor.AnchorProvider.env().wallet.publicKey;
    // Wallet that will receive the token 
    const toWallet: anchor.web3.Keypair = anchor.web3.Keypair.generate();
    // The ATA for a token on the to wallet (but might not exist yet)
    const toATA = await getAssociatedTokenAddress(
      mintKey.publicKey,
      toWallet.publicKey
    );

    // Fires a list of instructions
    const mint_tx = new anchor.web3.Transaction().add(
      // Create the ATA account that is associated with our To wallet
      createAssociatedTokenAccountInstruction(
        myWallet, toATA, toWallet.publicKey, mintKey.publicKey
      )
    );

    // Sends and create the transaction
    await anchor.AnchorProvider.env().sendAndConfirm(mint_tx, []);

    // Executes our transfer smart contract 
    await program.methods.transferToken().accounts({
      tokenProgram: TOKEN_PROGRAM_ID,
      from: associatedTokenAccount,
      fromAuthority: myWallet,
      to: toATA,
    }).rpc();

  });








  
});

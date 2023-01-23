import * as anchor from "@project-serum/anchor";
import { Program, web3, BN } from "@project-serum/anchor";
import { TokenPresale } from "../target/types/token_presale";
import { PublicKey } from "@solana/web3.js";

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








  
});

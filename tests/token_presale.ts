import * as anchor from "@project-serum/anchor";
import { Program, web3, BN } from "@project-serum/anchor";
import { TokenPresale } from "../target/types/token_presale";
import { PublicKey } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createMint,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAccount,
} from "@solana/spl-token"

describe("token_presale", () => {
  // Configure the client to use the local cluster.

  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TokenPresale as Program<TokenPresale>;
  const PROGRAM_ID = program.programId;

  const WALLET_SEED = "WALLET_SEED";
  const PRESALE_SEED = "PRESALE_SEED";

  const MY_WALLET = anchor.AnchorProvider.env().wallet;
  const MY_PUBKEY = MY_WALLET.publicKey;

  const PUBKEY1 = anchor.web3.Keypair.generate().publicKey;
  const PUBKEY2 = anchor.web3.Keypair.generate().publicKey;
  const TEN = new BN(10);
  const ONE = new BN(1);
  const TWO = new BN(2);

  const getWalletPDA = async () => {
    return (
      await PublicKey.findProgramAddressSync(
        [Buffer.from(WALLET_SEED), MY_PUBKEY.toBuffer()],
        PROGRAM_ID
      )
    )[0];
  };

  const getPresalePDA = async (presaleIdentifier: number) => {
    return (
      await PublicKey.findProgramAddressSync(
        [Buffer.from(PRESALE_SEED), MY_PUBKEY.toBuffer(), Uint8Array.from([presaleIdentifier])],
        PROGRAM_ID
      )
    )[0];
  };

  console.log(`My pubkey: ${MY_PUBKEY}`);
  console.log(`pubkey1: ${PUBKEY1}`);
  console.log(`pubkey2: ${PUBKEY2}`);

  it("Wallet account is initialized!", async () => {
    const WALLET_PDA = await getWalletPDA();
    console.log(`Wallet account address: ${WALLET_PDA}`);

    const tx = await program.methods
      .initializeWallet( )
      .accounts({
        walletDetails: WALLET_PDA,
        authority: MY_PUBKEY,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Presale account 0 is initialized!", async () => {

    const WALLET_PDA = await getWalletPDA();
    const PRESALE_PDA = await getPresalePDA( 0 );
    console.log(`Wallet address: ${WALLET_PDA}`);
    console.log(`Presale address: ${PRESALE_PDA}`);

    const tx = await program.methods
      .createPresale( PUBKEY1, PUBKEY2, TEN, ONE, TWO )
      .accounts({
        walletDetails: WALLET_PDA,
        presaleDetails: PRESALE_PDA,
        authority: MY_PUBKEY,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Your transaction signature", tx);
  });
  it("Presale account 1 is initialized!", async () => {

    const WALLET_PDA = await getWalletPDA();
    const PRESALE_PDA = await getPresalePDA( 1 );
    console.log(`Wallet address: ${WALLET_PDA}`);
    console.log(`Presale address: ${PRESALE_PDA}`);

    const tx = await program.methods
      .createPresale( PUBKEY1, PUBKEY2, TEN, ONE, TWO )
      .accounts({
        walletDetails: WALLET_PDA,
        presaleDetails: PRESALE_PDA,
        authority: MY_PUBKEY,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Your transaction signature", tx);
  });

  it("Edited presale account 1!", async () => {

    const PRESALE_PDA = await getPresalePDA( 1 );
    console.log(`Presale address: ${PRESALE_PDA}`);

    const tx = await program.methods
      .editPresale( 1, PUBKEY1, PUBKEY2, ONE, ONE, TEN )
      .accounts({
        presaleDetails: PRESALE_PDA,
        authority: MY_PUBKEY
      })
      .rpc();

    console.log("Your transaction signature", tx);
  });

  it("Deposited tokens", async () => {

    const PRESALE_PDA = await getPresalePDA( 1 );
    console.log(`Presale address: ${PRESALE_PDA}`);

    const tx = await program.methods
      .editPresale( 1, PUBKEY1, PUBKEY2, ONE, ONE, TEN )
      .accounts({
        presaleDetails: PRESALE_PDA,
        authority: MY_PUBKEY
      })
      .rpc();

    console.log("Your transaction signature", tx);
  });







  
});

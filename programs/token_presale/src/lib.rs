use anchor_lang::prelude::*;
use anchor_spl::token;
use anchor_spl::token::{Token, MintTo, Transfer};

pub mod constants;
pub mod errors;
pub mod state;
use crate::{
    constants::*, 
    // errors::*, 
    state::*
};

declare_id!("3nCqy8nALeMvFPG8Rou5xL7UVcrRyz7QEUVHgV26ATP8");

#[program]
pub mod token_presale {
    use super::*;

    // Initialize a wallet_details PDA for your wallet
    pub fn initialize_wallet(ctx: Context<InitializeWallet>) -> Result<()> {

        let wallet = &mut ctx.accounts.wallet_details;

        // Number of presales for a wallet will always be zero when initializing
        wallet.next_presale_identifier = 0;
        
        wallet.bump = *ctx.bumps.get("wallet_details").unwrap();
        
        msg!("Initialized your wallet");

        Ok(())
    }

    // Create a new presale, initializing a new presale_details PDA
    pub fn create_presale(
        ctx: Context<CreatePresale>,
        token_mint_address: Pubkey,
        quote_token_mint_address: Pubkey,
        token_amount: u64,
        max_token_amount_per_address: u64,
        price_per_token: u64
    ) -> Result<()> {
        
        
        let presale = &mut ctx.accounts.presale_details;
        let wallet = &mut ctx.accounts.wallet_details;

        // Set the presale details to the parameters given
        presale.token_mint_address = token_mint_address;
        presale.quote_token_mint_address = quote_token_mint_address;
        presale.token_amount = token_amount;
        presale.max_token_amount_per_address = max_token_amount_per_address;
        presale.price_per_token = price_per_token;
        presale.identifier = wallet.next_presale_identifier;
        presale.bump = *ctx.bumps.get("presale_details").unwrap();

        // Increase the wallet's presale count
        wallet.next_presale_identifier = wallet.next_presale_identifier.checked_add(1).unwrap();

        msg!(
            "Created a presale for token: {}",
            presale.token_mint_address
        );

        Ok(())
    }

    // Edit the details for a presale
    pub fn edit_presale(
        ctx: Context<EditPresale>,
        _presale_identifier: u8,
        token_mint_address: Pubkey,
        quote_token_mint_address: Pubkey,
        token_amount: u64,
        max_token_amount_per_address: u64,
        price_per_token: u64
    ) -> Result<()> {
        
        let presale = &mut ctx.accounts.presale_details;

        // Set the presale details to the parameters given
        presale.token_mint_address = token_mint_address;
        presale.quote_token_mint_address = quote_token_mint_address;
        presale.token_amount = token_amount;
        presale.max_token_amount_per_address = max_token_amount_per_address;
        presale.price_per_token = price_per_token;

        msg!(
            "Edited the presale details for token: {}",
            presale.token_mint_address
        );

        Ok(())
    }

    pub fn mint_token(ctx: Context<MintToken>,) -> Result<()> {
        // Create the MintTo struct for our context
        let cpi_accounts = MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.token_account.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        
        let cpi_program = ctx.accounts.token_program.to_account_info();
        // Create the CpiContext we need for the request
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

        // Execute anchor's helper function to mint tokens
        token::mint_to(cpi_ctx, 10)?;
        
        Ok(())
    }

    pub fn transfer_token(ctx: Context<TransferToken>) -> Result<()> {
        // Create the Transfer struct for our context
        let transfer_instruction = Transfer{
            from: ctx.accounts.from.to_account_info(),
            to: ctx.accounts.to.to_account_info(),
            authority: ctx.accounts.from_authority.to_account_info(),
        };
         
        let cpi_program = ctx.accounts.token_program.to_account_info();
        // Create the Context for our Transfer request
        let cpi_ctx = CpiContext::new(cpi_program, transfer_instruction);

        // Execute anchor's helper function to transfer tokens
        anchor_spl::token::transfer(cpi_ctx, 5)?;
 
        Ok(())
    }

}

#[derive(Accounts)]
#[instruction()]
pub struct InitializeWallet<'info> {
    
    // Initialize the wallet_detils account
    #[account(
        init,
        payer = authority,
        space = 8 + 8 + 1,
        seeds = [WALLET_SEED, authority.key().as_ref()],
        bump
    )]
    pub wallet_details: Account<'info, WalletDetails>,
    
    // Set the authority to the transaction signer
    #[account(mut)]
    pub authority: Signer<'info>,
    
    // Must be included when initializing an account
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(
    token_mint_address: Pubkey,
    quote_token_mint_address: Pubkey,
    token_amount: u64,
    max_token_amount_per_address: u64,
    price_per_token: u64
)]
pub struct CreatePresale<'info> {
    
    #[account(
        mut,
        seeds = [WALLET_SEED, authority.key().as_ref()],
        bump = wallet_details.bump
    )]
    pub wallet_details: Account<'info, WalletDetails>,
    
    // Initialize the presale_detils account
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 32 + 8 + 8 + 8 + 8 + 1,
        seeds = [PRESALE_SEED, authority.key().as_ref(), [wallet_details.next_presale_identifier].as_ref()],
        bump
    )]
    pub presale_details: Account<'info, PresaleDetails>,
    
    // Set the authority to the transaction signer
    #[account(mut)]
    pub authority: Signer<'info>,
    
    // Must be included when initializing an account
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(
    presale_identifier: u8,
    token_mint_address: Pubkey,
    quote_token_mint_address: Pubkey,
    token_amount: u64,
    max_token_amount_per_address: u64,
    price_per_token: u64
)]
pub struct EditPresale<'info> {
    
    #[account(
        mut,
        seeds = [PRESALE_SEED, authority.key().as_ref(), [presale_identifier].as_ref()],
        bump = presale_details.bump
    )]
    pub presale_details: Account<'info, PresaleDetails>,
    
    // Set the authority to the transaction signer
    #[account(mut)]
    pub authority: Signer<'info>,

}

#[derive(Accounts)]
pub struct MintToken<'info> {
    /// CHECK: This is the token that we want to mint
    #[account(mut)]
    pub mint: AccountInfo<'info>,
    pub token_program: Program<'info, Token>,
    /// CHECK: This is the token account that we want to mint tokens to
    #[account(mut)]
    pub token_account: AccountInfo<'info>,
    /// CHECK: the authority of the mint account
    #[account(mut)]
    pub authority: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct TransferToken<'info> {
    pub token_program: Program<'info, Token>,
    /// CHECK: The associated token account that we are transferring the token from
    #[account(mut)]
    pub from: AccountInfo<'info>,
    /// CHECK: The associated token account that we are transferring the token to
    #[account(mut)]
    pub to: AccountInfo<'info>,
    // the authority of the from account 
    pub from_authority: Signer<'info>,
}

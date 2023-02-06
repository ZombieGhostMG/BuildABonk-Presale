use {
    anchor_lang::prelude::*,
    anchor_spl::{
        token,
        associated_token,
    },
};

use crate::state::PresaleDetails;
use crate::constants::PRESALE_SEED;

pub fn buy_presale_tokens(
    ctx: Context<BuyPresaleTokens>, 
    quantity: u64,
    presale_identifier: u8,
    _presale_authority: Pubkey,
) -> Result<()> {

    msg!("Transferring quote tokens to presale {}...", presale_identifier);
    msg!("Mint: {}", &ctx.accounts.quote_token_mint_account.to_account_info().key());   
    msg!("From Token Address: {}", &ctx.accounts.buyer_quote_token_associated_token_account.key());     
    msg!("To Token Address: {}", &ctx.accounts.presale_quote_token_associated_token_account.key());     
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.buyer_quote_token_associated_token_account.to_account_info(),
                to: ctx.accounts.presale_quote_token_associated_token_account.to_account_info(),
                authority: ctx.accounts.buyer_authority.to_account_info(),
            },
        ),
        quantity,
    )?;

    msg!("Quote tokens transferred successfully.");

    msg!("Transferring presale tokens to buyer {}...", &ctx.accounts.buyer.key());
    msg!("Mint: {}", &ctx.accounts.presale_token_mint_account.to_account_info().key());   
    msg!("From Token Address: {}", &ctx.accounts.presale_presale_token_associated_token_account.key());     
    msg!("To Token Address: {}", &ctx.accounts.buyer_presale_token_associated_token_account.key());     
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.presale_presale_token_associated_token_account.to_account_info(),
                to: ctx.accounts.buyer_presale_token_associated_token_account.to_account_info(),
                authority: ctx.accounts.presale_details_pda.to_account_info(),
            },
        ),
        quantity,
    )?;

    msg!("Presale tokens transferred successfully.");

    Ok(())
}


#[derive(Accounts)]
#[instruction(quantity: u64, presale_identifier: u8, presale_authority: Pubkey)]
pub struct BuyPresaleTokens<'info> {

    // Quote token accounts
    #[account(mut)]
    pub quote_token_mint_account: Account<'info, token::Mint>,
    #[account(
        associated_token::mint = quote_token_mint_account,
        associated_token::authority = buyer_authority,
    )]
    pub buyer_quote_token_associated_token_account: Account<'info, token::TokenAccount>,
    #[account(
        associated_token::mint = quote_token_mint_account,
        associated_token::authority = presale_details_pda,
    )]
    pub presale_quote_token_associated_token_account: Account<'info, token::TokenAccount>,

    // Presale token accounts
    #[account(mut)]
    pub presale_token_mint_account: Account<'info, token::Mint>,
    #[account(
        associated_token::mint = presale_token_mint_account,
        associated_token::authority = buyer_authority,
    )]
    pub buyer_presale_token_associated_token_account: Account<'info, token::TokenAccount>,
    #[account(
        init_if_needed,
        payer = buyer,
        associated_token::mint = presale_token_mint_account,
        associated_token::authority = presale_details_pda,
    )]
    pub presale_presale_token_associated_token_account: Account<'info, token::TokenAccount>,

    #[account(
        mut,
        seeds = [PRESALE_SEED, presale_authority.key().as_ref(), [presale_identifier].as_ref()],
        bump = presale_details_pda.bump
    )]
    pub presale_details_pda: Account<'info, PresaleDetails>,
    #[account(constraint = buyer.key() == buyer_authority.key())]
    pub buyer_authority: SystemAccount<'info>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
}
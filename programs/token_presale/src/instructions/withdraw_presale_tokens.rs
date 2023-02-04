use {
    anchor_lang::prelude::*,
    anchor_spl::{
        token,
        associated_token,
    },
};

use crate::state::PresaleDetails;
use crate::constants::PRESALE_SEED;


pub fn withdraw_presale_tokens(
    ctx: Context<WithdrawPresaleTokens>, 
    quantity: u64,
    presale_identifier: u8,
) -> Result<()> {

    let bump = &[ctx.accounts.presale_details.bump];

    msg!("Transferring tokens...");
    msg!("Mint: {}", &ctx.accounts.mint_account.to_account_info().key());   
    msg!("From Token Address: {}", &ctx.accounts.from_associated_token_account.key());     
    msg!("To Token Address: {}", &ctx.accounts.to_associated_token_account.key());     
    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.from_associated_token_account.to_account_info(),
                to: ctx.accounts.to_associated_token_account.to_account_info(),
                authority: ctx.accounts.owner.to_account_info(),
            },
            &[&[b"PRESALE_SEED", ctx.accounts.payer.key().as_ref(), &[presale_identifier], bump][..]],
        ),
        quantity,
    )?;

    msg!("Tokens transferred successfully.");

    Ok(())
}


#[derive(Accounts)]
#[instruction(quantity: u64, presale_identifier: u8)]
pub struct WithdrawPresaleTokens<'info> {

    #[account(
        mut,
        seeds = [PRESALE_SEED, payer.key().as_ref(), [presale_identifier].as_ref()],
        bump = presale_details.bump
    )]
    pub presale_details: Account<'info, PresaleDetails>,
    #[account(mut)]
    pub mint_account: Account<'info, token::Mint>,
    #[account(
        init_if_needed,
        payer = payer,
        associated_token::mint = mint_account,
        associated_token::authority = owner,
    )]
    pub from_associated_token_account: Account<'info, token::TokenAccount>,
    /// CHECK: the presale PDA
    pub owner: AccountInfo<'info>,
    #[account(
        init_if_needed,
        payer = payer,
        associated_token::mint = mint_account,
        associated_token::authority = recipient,
    )]
    pub to_associated_token_account: Account<'info, token::TokenAccount>,
    pub recipient: SystemAccount<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
}
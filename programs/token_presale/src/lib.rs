use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod state;
pub mod instructions;

use instructions::*;

declare_id!("3nCqy8nALeMvFPG8Rou5xL7UVcrRyz7QEUVHgV26ATP8");

#[program]
pub mod token_presale {
    use super::*;

    pub fn initialize_wallet(
        ctx: Context<InitializeWallet>
    ) -> Result<()> {
        
        initialize_wallet::initialize_wallet(ctx)

    }

    pub fn create_presale(
        ctx: Context<CreatePresale>,
        token_mint_address: Pubkey,
        quote_token_mint_address: Pubkey,
        token_amount: u64,
        max_token_amount_per_address: u64,
        price_per_token: u64
    ) -> Result<()> {
        
        create_presale::create_presale(
            ctx,
            token_mint_address,
            quote_token_mint_address,
            token_amount,
            max_token_amount_per_address,
            price_per_token
        )

    }

    pub fn edit_presale(
        ctx: Context<EditPresale>,
        presale_identifier: u8,
        token_mint_address: Pubkey,
        quote_token_mint_address: Pubkey,
        token_amount: u64,
        max_token_amount_per_address: u64,
        price_per_token: u64
    ) -> Result<()> {
        
        edit_presale::edit_presale(
            ctx,
            presale_identifier,
            token_mint_address,
            quote_token_mint_address,
            token_amount,
            max_token_amount_per_address,
            price_per_token
        )

    }

    pub fn create_token(
        ctx: Context<CreateToken>, 
        token_title: String, 
        token_symbol: String, 
        token_uri: String,
    ) -> Result<()> {

        create_token::create_token(
            ctx, 
            token_title, 
            token_symbol, 
            token_uri,
        )
    }

    pub fn mint_to(
        ctx: Context<MintTo>, 
        quantity: u64,
    ) -> Result<()> {

        mint_to::mint_to(
            ctx, 
            quantity,
        )
    }


}







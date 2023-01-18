use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct WalletDetails {
    // Number of presales (opened and closed)
    pub next_presale_identifier: u8,
    // Bump used when creating the PDA
    pub bump: u8
}

#[account]
#[derive(Default)]
pub struct PresaleDetails {
    // Mint address of the presale token
    pub token_mint_address: Pubkey,
    // Mint address of the quote token
    pub quote_token_mint_address: Pubkey,
    // Total amount of presale tokens available in the presale
    pub token_amount: u64,
    // Maximum amount of presale tokens an address can purchase
    pub max_token_amount_per_address: u64,
    // Quote token per presale token
    pub price_per_token: u64,
    // Identifier for finding the PDA
    pub identifier: u8,
    // Bump used when creating the PDA
    pub bump: u8
}
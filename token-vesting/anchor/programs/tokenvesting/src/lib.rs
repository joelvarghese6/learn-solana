#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;
use anchor_spl::token_interface::{
  Mint,
  TokenAccount, 
  TokenInterface,
};

declare_id!("5ggBoWbAKgokpAQUr6VCTvwW7JzjatsVb3BroFb9o21x");

#[program]
pub mod tokenvesting {

    use super::*;

    pub fn create_vesting_account(ctx: Context<CreateVestingAccount>, company_name: String) -> Result<()> {
      *ctx.accounts.vesting_account = VestingAccount {
        owner: ctx.accounts.signer.key(),
        mint: ctx.accounts.mint.key(),
        treasury_token_account: ctx.accounts.treasury_token_account.key(),
        company_name,
        treasury_bump: ctx.bumps.treasury_token_account,
        bump: ctx.bumps.vesting_account,
      };


      Ok(())
    }

    pub fn create_employee_account(_ctx: Context<CreateEmployeeAccount>) -> Result<()> {

      Ok(())
    }

}

#[derive(Accounts)]
#[instruction(company_name: String)]
pub struct CreateVestingAccount<'info> {

  #[account(mut)]
  pub signer: Signer<'info>,

  #[account(
    init,
    payer = signer,
    space = 8 + VestingAccount::INIT_SPACE,
    seeds = [company_name.as_ref()],
    bump
  )]
  pub vesting_account: Account<'info, VestingAccount>,

  pub mint: InterfaceAccount<'info, Mint>,

  #[account(
    init,
    token::mint = mint,
    token::authority = treasury_token_account,
    payer = signer,
    seeds = [b"vesting_treasury", company_name.as_bytes()],
    bump
  )]
  pub treasury_token_account: InterfaceAccount<'info, TokenAccount>,

  pub system_program: Program<'info, System>,
  pub token_program: Interface<'info, TokenInterface>
}

#[derive(Account)]
pub struct CreateEmployeeAccount<'info> {

  #[account(mut)]
  pub owner: Signer<'info>,

  pub benficiary: SystemAccount<'ifno>
}

#[account]
#[derive(InitSpace)]
pub struct VestingAccount {
  pub owner: Pubkey,
  pub mint: Pubkey,
  pub treasury_token_account: Pubkey,
  #[max_len(50)]
  pub company_name: String,
  pub treasury_bump: u8,
  pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct EmployeeAccount {
  pub benficiary: Pubkey,
  pub start_time: i64,
  pub end_time: i64,
  pub cliff_time: i64,
  pub vesting_account: Pubkey,
  pub total_amount: u64,
  pub total_withdrawn: u64,
}


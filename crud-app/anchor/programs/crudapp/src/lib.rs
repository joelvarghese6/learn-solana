#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("9aKkeAujUKZojBipT62NcZR6eBjzFNqtzKJ7XTh33GuV");

#[program]
pub mod crudapp {
    use super::*;

    pub fn create_journal_entry(ctx: Context<CreateEntry>, title: String, message: String) -> Result<()> {
      let journal = &mut ctx.accounts.journal_entry;
      journal.title = title;
      journal.message = message;
      journal.owner = ctx.accounts.signer.key();
      Ok(())
    }

    pub fn update_journal_entry(ctx: Context<UpdateEntry>, _title: String, message: String) -> Result<()> {
      let journal = &mut ctx.accounts.journal_entry;
      journal.message = message;
      Ok(())
    }

    pub fn delete_journal_entry(_ctx: Context<DeleteEntry>, _title: String) -> Result<()> {
      Ok(())
    }
  
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct CreateEntry<'info> {
  #[account(mut)]
  pub signer: Signer<'info>,

  #[account(
    init,
    payer = signer,
    space = 8 + JournalEntryState::INIT_SPACE,
    seeds = [title.as_bytes(), signer.key().as_ref()],
    bump
  )]
  pub journal_entry: Account<'info, JournalEntryState>,

  pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct UpdateEntry<'info> {
  #[account(mut)]
  pub signer: Signer<'info>,

  #[account(
    mut,
    seeds = [title.as_bytes(), signer.key().as_ref()],
    bump,
    realloc = 8 + JournalEntryState::INIT_SPACE,
    realloc::payer = signer,
    realloc::zero = true,
  )]
  pub journal_entry: Account<'info, JournalEntryState>,

  pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct DeleteEntry<'info> {
  #[account(mut)]
  pub signer: Signer<'info>,

  #[account(
    mut,
    seeds = [title.as_bytes(), signer.key().as_ref()],
    bump,
    close = signer,
  )]
  pub journal_entry: Account<'info, JournalEntryState>,

  pub system_program: Program<'info, System>
}

#[account]
#[derive(InitSpace)]
pub struct JournalEntryState {
  pub owner: Pubkey,
  #[max_len(50)]
  pub title: String,
  #[max_len(1000)]
  pub message: String,
}
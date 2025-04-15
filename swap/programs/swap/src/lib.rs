pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("AhaZiricbigAWgrdz3NqjWGAqcMgDzQhaSjs3D8vGAB3");

#[program]
pub mod swap {
    use super::*;

    pub fn make_offer(context: Context<MakeOffer>) -> Result<()> {
        instructions::make_offer::send_offered_tokens_to_vault()?;
        instructions::make_offer::save_offer()?
    }
}

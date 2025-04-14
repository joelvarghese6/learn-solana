import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair, PublicKey } from '@solana/web3.js'
import { Crudapp } from '../target/types/crudapp'
import { BankrunProvider, startAnchor } from 'anchor-bankrun';

const IDL = require("../target/idl/crudapp.json");

const crudappAddress = new PublicKey("9aKkeAujUKZojBipT62NcZR6eBjzFNqtzKJ7XTh33GuV");

describe('crudapp', () => {

  it("Create Journal", async () => {

    let context = await startAnchor("", [{name: "crudapp", programId: crudappAddress}], []);
    let provider = new BankrunProvider(context);
    let crudappProgram = new Program<Crudapp>(
      IDL,
      provider
    );

    await crudappProgram.methods.createJournalEntry(
      "Johnson",
      "we are living the best part of our life now."
    ).rpc()

    const [journalAddress] = await PublicKey.findProgramAddressSync(
      [Buffer.from("Johnson")],
      crudappAddress
    )
  })
})

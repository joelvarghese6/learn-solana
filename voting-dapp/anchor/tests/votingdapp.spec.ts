import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair, PublicKey } from '@solana/web3.js'
import { Votingdapp } from '../target/types/votingdapp'
import { BankrunProvider, startAnchor } from 'anchor-bankrun';

const IDL = require("../target/idl/votingdapp.json");

const votingAddress = new PublicKey("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

describe('votingdapp', () => {

  let context;
  let provider;
  let votingProgram: Program<Votingdapp>;

  beforeAll(async () => {
    context = await startAnchor("", [{name: "votingdapp", programId: votingAddress}], []);
    provider = new BankrunProvider(context);

    votingProgram = new Program<Votingdapp>(
      IDL,
      provider
    )
  })
  
  it('Initialize Poll' , async () => {
    await votingProgram.methods.initializePoll(
      new anchor.BN(1),
      new anchor.BN(0),
      new anchor.BN(1753758894),
      "what is your favorite type of food",
    ).rpc()

    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
      votingAddress
    )

    const poll = await votingProgram.account.poll.fetch(pollAddress);

    console.log(poll)

  })

  it("initialize Candidate", async () => {

    await votingProgram.methods.initializeCandidate(
      "Crunchy",
      new anchor.BN(1)
    ).rpc()


    await votingProgram.methods.initializeCandidate(
      "Smooth",
      new anchor.BN(1)
    ).rpc()

    const [crunchyAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8), Buffer.from("Crunchy")],
      votingAddress,
    )

    const crunchCandidate = await votingProgram.account.candidate.fetch(crunchyAddress);
    console.log(crunchCandidate);

    const [smoothAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8), Buffer.from("Smooth")],
      votingAddress,
    )

    const smoothCandidate = await votingProgram.account.candidate.fetch(smoothAddress);
    console.log(smoothCandidate);

  })

  it("vote", async () => {

    await votingProgram.methods.vote(
      "Crunchy",
      new anchor.BN(1)
    ).rpc()

    const [crunchyAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8), Buffer.from("Crunchy")],
      votingAddress,
    )

    const crunchyCandidate = await votingProgram.account.candidate.fetch(crunchyAddress);
    
    console.log(crunchyCandidate);

  })
})

/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/tokenvesting.json`.
 */
export type Tokenvesting = {
  "address": "5ggBoWbAKgokpAQUr6VCTvwW7JzjatsVb3BroFb9o21x",
  "metadata": {
    "name": "tokenvesting",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createVestingAccount",
      "discriminator": [
        129,
        178,
        2,
        13,
        217,
        172,
        230,
        218
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vestingAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "companyName"
              }
            ]
          }
        },
        {
          "name": "mint"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "vestingAccount",
      "discriminator": [
        102,
        73,
        10,
        233,
        200,
        188,
        228,
        216
      ]
    }
  ],
  "types": [
    {
      "name": "vestingAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "treasuryTokenAccount",
            "type": "pubkey"
          },
          {
            "name": "companyName",
            "type": "string"
          },
          {
            "name": "treasuryBump",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};

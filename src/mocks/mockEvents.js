import { ObjectId } from "mongodb";

import { EricId, BenId, NicholasId, MariuszId, AndreyId } from "./mockUsers";
import { binsId, cateringId, consentId, securityId } from "./mockCapabilities";

export const gamesNightId = new ObjectId();
export const hackmonId = new ObjectId();
export const partyId = new ObjectId();

export default [
  {
    _id: gamesNightId,
    name: "WIRED Games Night",
    description: "A night of fun and relaxation for all!",
    organiserIds: [EricId],
    capabilities: [
      {
        _id: cateringId,
        name: "Catering",
        description: "Food and refreshments for your event",
        checkpoints: [
          {
            description: "Allocate Budget",
            done: false,
            type: "TodoCheckpoint"
          },
          {
            description: "Find suitable catering",
            done: false,
            type: "TodoCheckpoint"
          },
          {
            description: "Order catering",
            done: false,
            type: "TodoCheckpoint"
          },
          {
            description: "Pay catering company",
            done: false,
            type: "TodoCheckpoint"
          }
        ],
        delegateGroupNames: ["catering"]
      },
      {
        _id: binsId,
        name: "Bins",
        description: "Rubbish disposal for your event",
        checkpoints: [
          { description: "Find bins", done: false, type: "TodoCheckpoint" },
          {
            description: "Arrange disposal time",
            done: false,
            type: "TodoCheckpoint"
          }
        ],
        delegateGroupNames: ["bins"]
      }
    ],
    audiences: ["STUDENT"],
    maxCapacity: 50,
    startDateTime: "2019-04-10T15:00:00Z",
    endDateTime: "2019-04-10T20:00:00Z"
  },
  {
    _id: hackmonId,
    name: "HackMon 2019",
    description: "If you don't like it, change it.",
    organiserIds: [BenId, MariuszId],
    capabilities: [
      {
        _id: cateringId,
        name: "Catering",
        description: "Food and refreshments for your event",
        checkpoints: [
          {
            description: "Allocate Budget",
            done: false,
            type: "TodoCheckpoint"
          },
          {
            description: "Find suitable catering",
            done: false,
            type: "TodoCheckpoint"
          },
          {
            description: "Order catering",
            done: false,
            type: "TodoCheckpoint"
          },
          {
            description: "Pay catering company",
            done: false,
            type: "TodoCheckpoint"
          }
        ],
        delegateGroupNames: ["catering"]
      },
      {
        _id: binsId,
        name: "Bins",
        description: "Rubbish disposal for your event",
        checkpoints: [
          { description: "Find bins", done: false, type: "TodoCheckpoint" },
          {
            description: "Arrange disposal time",
            done: false,
            type: "TodoCheckpoint"
          }
        ],
        delegateGroupNames: ["bins"]
      },

      {
        _id: securityId,
        name: "Security",
        description: "Campus security for your event",
        checkpoints: [
          {
            description: "Finalise event duration",
            done: false,
            type: "TodoCheckpoint"
          },
          {
            description: "Contact campus security",
            done: false,
            type: "TodoCheckpoint"
          },
          { description: "Event approval", done: false, type: "TodoCheckpoint" }
        ],
        delegateGroupsNames: ["security"]
      }
    ],
    audiences: ["STUDENT", "STAFF"],
    maxCapacity: 200,
    startDateTime: "2019-04-06T00:00:00Z",
    endDateTime: "2019-04-07T00:00:00Z"
  },
  {
    _id: partyId,
    name: "Meme Party",
    description: "meme meme meme meme",
    organiserIds: [NicholasId, AndreyId],
    capabilities: [
      {
        _id: binsId,
        name: "Bins",
        description: "Rubbish disposal for your event",
        checkpoints: [
          { description: "Find bins", done: false, type: "TodoCheckpoint" },
          {
            description: "Arrange disposal time",
            done: false,
            type: "TodoCheckpoint"
          }
        ],
        delegateGroupNames: ["bins"]
      },

      {
        _id: securityId,
        name: "Security",
        description: "Campus security for your event",
        checkpoints: [
          {
            description: "Finalise event duration",
            done: false,
            type: "TodoCheckpoint"
          },
          {
            description: "Contact campus security",
            done: false,
            type: "TodoCheckpoint"
          },
          { description: "Event approval", done: false, type: "TodoCheckpoint" }
        ],
        delegateGroupsNames: ["security"]
      },
      {
        _id: consentId,
        name: "Sexual Consent (Moodle)",
        description: "Sexual Consent module",
        checkpoints: [
          {
            description: "All participants completed module",
            done: false,
            type: "TodoCheckpoint"
          }
        ],
        delegateGroupsNames: []
      }
    ],
    audiences: ["PUBLIC", "STUDENT"],
    maxCapacity: 100,
    startDateTime: "2019-04-12T15:00:00Z",
    endDateTime: "2019-04-12T20:00:00Z"
  }
];

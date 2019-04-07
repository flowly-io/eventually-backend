import { ObjectId } from "mongodb";

export const cateringId = new ObjectId("5ca926d5d30ca8fde7ddc6d6");
export const binsId = new ObjectId("5ca926d5d30ca8fde7ddc6d7");
export const securityId = new ObjectId("5ca926d5d30ca8fde7ddc6d8");
export const consentId = new ObjectId("5ca926d5d30ca8fde7ddc6d9");

export default [
  {
    _id: cateringId,
    name: "Catering",
    description: "Food and refreshments for your event",
    checkpoints: [
      { description: "Allocate Budget", done: false, type: "TodoCheckpoint" },
      {
        description: "Find suitable catering",
        done: false,
        type: "TodoCheckpoint"
      },
      { description: "Order catering", done: false, type: "TodoCheckpoint" },
      {
        description: "Pay catering company",
        done: false,
        type: "TodoCheckpoint"
      }
    ],
    delegateGroupNames: ["catering", "staff"]
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
    delegateGroupNames: ["security"]
  },
  {
    _id: consentId,
    name: "Alchocol RSA",
    description: "License to serve alcohol at your event",
    checkpoints: [
      {
        description: "Ensure all event organisers have a valid RSA",
        done: false,
        type: "TodoCheckpoint"
      }
    ],
    delegateGroupNames: ["security"]
  }
];

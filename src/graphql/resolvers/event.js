import { ObjectId } from "mongodb";
import { UserInputError, ForbiddenError } from "apollo-server";

import { isDateTimeValid } from "../utils/validators";

export default {
  Query: {
    // Get list of capabilities
    async events(parent, args, ctx) {
      return ctx.db
        .collection("events")
        .find({})
        .toArray();
    },

    // Get event by id
    async event(parent, args, ctx) {
      return ctx.db
        .collection("events")
        .findOne({ _id: new ObjectId(ctx.eventId) });
    }
  },

  Mutation: {
    async createEvent(parent, args, ctx) {
      // Validate arguments
      const _id = new ObjectId();
      const { userId } = ctx;

      if (
        !isDateTimeValid(args.startDateTime) ||
        !isDateTimeValid(args.endDateTime)
      ) {
        throw new UserInputError(
          "Start Date/End Date Time must be in a valid ISO format"
        );
      }
      await ctx.db.collection("events").insertOne({
        _id,
        organiserIds: [new ObjectId(userId)],
        audiences: [],
        capabilities: [],
        ...args.event
      });
      return await ctx.db.collection("events").findOne({ _id });
    },

    async deleteEvent(parent, args, ctx) {
      // Validate arguments

      if (!args.eventId) throw new UserInputError("Event Id cannot be empty");
      const result = await ctx.db
        .collection("events")
        .removeOne({ _id: new ObjectId(args.eventId) });
      return result.deletedCount;
    },

    async setOrganisers(parent, args, ctx) {
      // Validate arguments
      const collectionsDb = ctx.db.collection("events");
      const eventId = args.eventId;
      const organiserIds = args.organiserIds;
      if (!eventId) throw new UserInputError("Event Id cannot be empty");
      const object = await collectionsDb.findOne({
        _id: new ObjectId(eventId)
      });
      if (!object) {
        throw new UserInputError("Event does not exist");
      }
      const res = await collectionsDb.updateOne(
        { _id: new ObjectId(eventId) },
        { $set: { organiserIds: organiserIds.map(id => new ObjectId(id)) } }
      );
      return await collectionsDb.findOne({ _id: new ObjectId(eventId) });
    },

    async setAudiences(parent, args, ctx) {
      // Validate arguments
      const collectionsDb = ctx.db.collection("events");
      const eventId = args.eventId;
      const audiences = args.audiences;
      if (!eventId) throw new UserInputError("Event Id cannot be empty");
      const object = await collectionsDb.findOne({
        _id: new ObjectId(eventId)
      });
      if (!object) {
        throw new UserInputError("Event does not exist");
      }
      const res = await collectionsDb.updateOne(
        { _id: new ObjectId(eventId) },
        { $set: { audiences } }
      );
      return await collectionsDb.findOne({ _id: new ObjectId(eventId) });
    },

    async addCapability(parent, args, ctx) {
      // Validate arguments
      const { eventId, capabilityId } = args;
      if (!eventId) throw new UserInputError("Event Id cannot be empty");
      if (!capabilityId)
        throw new UserInputError("Capability Id cannot be empty");

      // Check that event exists
      const eventCheck = await ctx.db
        .collection("events")
        .findOne({ _id: new ObjectId(eventId) });

      if (!eventCheck)
        return new ForbiddenError(
          `The requested event "${capabilityId}" does not exist.`
        );

      // Check that capability exists
      const capabilityCheck = await ctx.db
        .collection("capabilities")
        .findOne({ _id: new ObjectId(capabilityId) });

      if (!capabilityCheck)
        return new ForbiddenError(
          `The requested capability "${capabilityId}" does not exist.`
        );

      // Ensure the capability is not duplicated in the event
      if (
        eventCheck.capabilities
          .map(c => c.name)
          .indexOf(capabilityCheck.name) >= 0
      ) {
        throw new ForbiddenError(
          `The capability ${
            capabilityCheck.name
          } is already added to this event.`
        );
      }

      // Create capabiliity instance
      const capabilityInstance = {
        _id: new ObjectId(),
        name: capabilityCheck.name,
        description: capabilityCheck.description,
        checkpoints: capabilityCheck.checkpoints.map(c => ({
          description: c,
          done: false
        }))
      };

      // Add the capability
      await ctx.db
        .collection("events")
        .updateOne(
          { _id: new ObjectId(eventId) },
          { $push: { capabilities: capabilityInstance } }
        );

      return ctx.db
        .collection("events")
        .findOne({ _id: new ObjectId(eventId) });
    },

    async removeCapability(parent, args, ctx) {
      // Validate arguments
      const { eventId, capabilityInstanceId } = args;
      if (!eventId) throw new UserInputError("Event Id cannot be empty");
      if (!capabilityInstanceId)
        throw new UserInputError("Capability instance Id cannot be empty");

      // Check that event exists
      const eventCheck = await ctx.db
        .collection("events")
        .findOne({ _id: new ObjectId(eventId) });

      if (!eventCheck)
        return new ForbiddenError(
          `The requested event "${eventId}" does not exist.`
        );

      // Remove the capability
      await ctx.db.collection("events").update(
        { _id: new ObjectId(eventId) },
        {
          $pull: { capabilities: { _id: new ObjectId(capabilityInstanceId) } }
        }
      );

      return ctx.db
        .collection("events")
        .findOne({ _id: new ObjectId(eventId) });
    }
  }
};

export const Event = {
  async organisers(parent, args, ctx) {
    if (!parent.organiserIds) {
      return [];
    }
    return ctx.loaders.eventOrganisersLoader.loadMany(parent.organiserIds);
  }
};

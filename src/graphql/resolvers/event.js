import { ObjectId } from "mongodb";
import { UserInputError } from "apollo-server";
import moment from "moment";

const isDateTimeValid = dateTime => {
  return moment(dateTime).isValid();
};

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
    },
    async setAudiences(parent, args, ctx) {
      // Validate arguments
    },
    async addCapability(parent, args, ctx) {
      // Validate arguments
    },
    async removeCapability(parent, args, ctx) {
      // Validate arguments
    }
  }
};

export const Event = {
  async organisers(parent, args, ctx) {
    return ctx.loaders.eventOrganisersLoader.loadMany(parent.organiserIds);
  }
};

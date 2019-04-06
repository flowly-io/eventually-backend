import { ObjectId } from "mongodb";
import { UserInputError } from "apollo-server";

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
  Mutation: {}
};

export const Event = {
  async organisers(parent, args, ctx) {
    return ctx.loaders.eventOrganisersLoader.loadMany(parent.organiserIds);
  }
};

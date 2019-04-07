import { ObjectId } from "mongodb";
import { UserInputError, ForbiddenError } from "apollo-server";

export default {
  Query: {
    // Get list of capabilities
    async capabilities(parent, args, ctx) {
      return ctx.db
        .collection("capabilities")
        .find({})
        .toArray();
    }
  },

  Mutation: {
    async createCapability(parent, args, ctx) {
      const { capability } = args;

      // Check that capability has a unique name
      const capabilityCheck = await ctx.db
        .collection("capabilities")
        .findOne({ name: capability.name });
      if (capabilityCheck)
        throw new ForbiddenError(
          `A capability with the name "${capability.name}" already exists.`
        );

      // Create capability object
      const _id = new ObjectId();
      await ctx.db.collection("capabilities").insertOne({
        _id,
        ...capability,
        checkpoints: [],
        delegateGroupNames: []
      });
      return await ctx.db.collection("capabilities").findOne({ _id });
    },

    async deleteCapability(parent, args, ctx) {
      if (!args.capabilityId)
        throw new UserInputError("Capability Id cannot be empty");
      const result = await ctx.db
        .collection("capabilities")
        .removeOne({ _id: new ObjectId(args.capabilityId) });
      return result.deletedCount;
    },

    async setCapabilityDelegateGroups(parent, args, ctx) {
      const { capabilityId, groups } = args;
      // Ensure capabilityId is not null
      if (!capabilityId)
        throw new UserInputError("Capability Id cannot be empty");

      // Check that capability exists
      const capabilityCheck = await ctx.db
        .collection("capabilities")
        .findOne({ _id: new ObjectId(capabilityId) });

      if (!capabilityCheck)
        throw new ForbiddenError(
          `The capability "${capabilityId}" does not exist.`
        );

      // Check that groups is an array
      if (!Array.isArray(groups)) {
        throw new UserInptuError(`Groups must be an array of strings.`);
      }

      await ctx.db
        .collection("capabilities")
        .updateOne(
          { _id: new ObjectId(capabilityId) },
          { $set: { delegateGroupNames: groups } }
        );

      return await ctx.db
        .collection("capabilities")
        .findOne({ _id: new ObjectId(capabilityId) });
    },

    async removeCapabilityCheckpiont(parent, args, ctx) {
      const { capabilityId, checkpoint } = args;
      // Ensure capabilityId is not null
      if (!capabilityId)
        throw new UserInputError("Capability Id cannot be empty");

      // Check that capability exists
      const capabilityCheck = await ctx.db
        .collection("capabilities")
        .findOne({ _id: new ObjectId(capabilityId) });

      if (!capabilityCheck)
        throw new ForbiddenError(
          `The capability "${capabilityId}" does not exist.`
        );

      // Remove checkpoint
      await ctx.db
        .collection("capabilities")
        .updateOne(
          { _id: new ObjectId(capabilityId) },
          { $pull: { checkpoints: { description: checkpoint } } }
        );

      return await ctx.db
        .collection("capabilities")
        .findOne({ _id: new ObjectId(capabilityId) });
    },

    async addCapabilityCheckpointTodo(parent, args, ctx) {
      const { capabilityId, checkpoint } = args;
      // Ensure capabilityId is not null
      if (!capabilityId)
        throw new UserInputError("Capability Id cannot be empty");

      // Check that capability exists
      const capabilityCheck = await ctx.db
        .collection("capabilities")
        .findOne({ _id: new ObjectId(capabilityId) });

      if (!capabilityCheck)
        throw new ForbiddenError(
          `The capability "${capabilityId}" does not exist.`
        );

      // Check that capability checkpoint is unique
      let checkpointCheck;
      capabilityCheck.checkpoints.forEach(c => {
        if (c.description === checkpoint.description) {
          checkpointCheck = c;
        }
      });
      if (checkpointCheck) {
        throw new ForbiddenError(
          `A checkpoint with the same description already exists.`
        );
      }

      // Add checkpoint
      await ctx.db
        .collection("capabilities")
        .updateOne(
          { _id: new ObjectId(capabilityId) },
          { $push: { checkpoints: { ...checkpoint, type: "TodoCheckpoint" } } }
        );

      return await ctx.db
        .collection("capabilities")
        .findOne({ _id: new ObjectId(capabilityId) });
    },

    async setCapabilityCheckpointTodoStatus(parnet, args, ctx) {
      const { capabilityId, checkpointIndex, status } = args;

      // Ensure capabilityId is not null
      if (!capabilityId)
        throw new UserInputError("Capability Id cannot be empty");

      // Check that capability exists
      const capabilityCheck = await ctx.db
        .collection("capabilities")
        .findOne({ _id: new ObjectId(capabilityId) });

      if (!capabilityCheck)
        throw new ForbiddenError(
          `The capability "${capabilityId}" does not exist.`
        );

      // Check that capability checkpoint is a todo
      const checkpoint = capabilityCheck.checkpoints[checkpointIndex];
      if (!checkpoint || checkpoint.type !== "TodoCheckpoint") {
        if (checkpoint) {
          throw new ForbiddenError(
            `The checkpoint "${checheckpoint.description}" is not a Todo`
          );
        } else
          throw new ForbiddenError(
            `The checkpoint index "${checkpointIndex}" is invalid`
          );
      }

      // Check that status is a boolean
      if (typeof status !== "boolean") {
        throw new UserInputError(
          `status must be a boolean, recieved ${typeof status}`
        );
      }

      // Set the capability
      await ctx.db.collection("capabilities").updateOne(
        {
          _id: new ObjectId(capabilityId)
        },
        {
          $set: { [`checkpoints.${checkpointIndex}.done`]: status }
        }
      );

      return ctx.db.collection("capabilities").findOne({
        _id: new ObjectId(capabilityId)
      });
    }
  }
};

export const Capability = {
  async delegateGroups(parent, args, ctx) {
    return parent.delegateGroupNames.map(name => ({ name }));
  }
};

export const CapabilityInstance = {
  async template(parent, args, ctx) {
    return ctx.db
      .collection("capabilities")
      .findOne({ _id: new ObjectId(parent._id) });
  }
};

export const CapabilityInterface = {
  __resolveType(parent, args, ctx) {
    return parent.type || "Capability";
  }
};

export const CheckpointInterface = {
  __resolveType(parent, args, ctx) {
    return parent.type || "Checkpoint";
  }
};

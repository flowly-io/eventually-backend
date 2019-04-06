import user from "./user";
import capability, {
  Capability,
  CapabilityInstance,
  CapabilityInterface,
  CheckpointInterface
} from "./capability";
import event, { Event } from "./event";
import group, { Group } from "./group";

const resolvers = {
  Query: {
    ...user.Query,
    ...capability.Query,
    ...event.Query,
    ...group.Query
  },
  Mutation: {
    ...user.Mutation,
    ...capability.Mutation,
    ...event.Mutation,
    ...group.Mutation
  },
  Event,
  Group,
  Capability,
  CapabilityInstance,
  CapabilityInterface,
  CheckpointInterface
};

export { resolvers };

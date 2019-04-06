import { ObjectId } from "mongodb";

export const EricId = new ObjectId();
export const NicholasId = new ObjectId();
export const AndreyId = new ObjectId();
export const BenId = new ObjectId();
export const MariuszId = new ObjectId();

export default [
  {
    _id: EricId,
    firstname: "Eric",
    lastname: "Jiang",
    userType: "STAFF",
    email: "Eric.Jiang@monash.edu",
    groups: ["admins"]
  },
  {
    _id: NicholasId,
    firstname: "Nicholas",
    lastname: "Whittaker",
    userType: "STAFF",
    email: "Nicholas.Whittaker@monash.edu",
    groups: ["admins", "musicians"]
  },
  {
    _id: AndreyId,
    firstname: "Andrey",
    lastname: "Mayorov",
    userType: "STUDENT",
    email: "Andrey.Mayorov@student.monash.edu",
    groups: ["students"]
  },
  {
    _id: MariuszId,
    firstname: "Mariusz",
    lastname: "Skoneczko",
    userType: "STUDENT",
    email: "Mariusz.Skoneczko@student.monash.edu",
    groups: ["students"]
  },
  {
    _id: BenId,
    firstname: "Ben",
    lastname: "Yap",
    email: "bwyap@outlook.com",
    userType: "PUBLIC",
    groups: ["catering"]
  }
];

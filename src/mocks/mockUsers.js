import { ObjectId } from "mongodb";

export const EricId = new ObjectId("5ca9281dd78acaff9d807ba3");
export const NicholasId = new ObjectId("5ca9281dd78acaff9d807ba4");
export const AndreyId = new ObjectId("5ca9281dd78acaff9d807ba5");
export const BenId = new ObjectId("5ca9281dd78acaff9d807ba7");
export const MariuszId = new ObjectId("5ca9281dd78acaff9d807ba6");

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

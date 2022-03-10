import { User } from "../../models/index.js";
import skillLevelData from "../../../skillLevelData.js";

class UserSeeder {
  static async seed() {
    await User.query().insert({
      name: "Djokovic",
      email: "d@d.com",
      password: "password",
      skillLevel: skillLevelData.skillLevel[5],
      location: "02145",
      gender: "M",
      age: 34,
      image: "https://tennis-meetup-development.s3.amazonaws.com/djokovic.jpeg"
    });
    await User.query().insert({
      name: "Federer",
      email: "f@f.com",
      password: "password",
      skillLevel: skillLevelData.skillLevel[5],
      location: "22033",
      gender: "M",
      age: 40,
      image: "https://tennis-meetup-development.s3.amazonaws.com/federer.jpeg"
    });
    await User.query().insert({
      name: "Nadal",
      email: "n@n.com",
      password: "password",
      skillLevel: skillLevelData.skillLevel[5],
      location: "02155",
      gender: "M",
      age:35,
      image: "https://tennis-meetup-development.s3.amazonaws.com/nadal.jpeg"
    });
    await User.query().insert({
      name: "Emma",
      email: "e@e.com",
      password: "password",
      skillLevel: skillLevelData.skillLevel[4],
      location: "02139",
      gender: "F",
      age:21,
      image: "https://tennis-meetup-development.s3.amazonaws.com/Emma.jpeg"
    });
    await User.query().insert({
      name: "Sharapova",
      email: "s@s.com",
      password: "password",
      skillLevel: skillLevelData.skillLevel[5],
      location: "02116",
      gender: "F",
      age:39,
      image: "https://tennis-meetup-development.s3.amazonaws.com/sharapova.jpeg"
    });
    await User.query().insert({
      name: "Coco",
      email: "c@c.com",
      password: "password",
      skillLevel: skillLevelData.skillLevel[4],
      location: "02122",
      gender: "F",
      age:22,
      image: "https://tennis-meetup-development.s3.amazonaws.com/coco.jpeg"
    });
  }
}

export default UserSeeder;

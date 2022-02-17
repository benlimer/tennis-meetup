import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    await User.query().insert({
      name: "Djokovic",
      email: "d@d.com",
      password: "password",
      skillLevel: 7,
      location: "00002",
      gender: "M",
      age: 34
    });
    await User.query().insert({
      name: "Federer",
      email: "f@f.com",
      password: "password",
      skillLevel: 8,
      location: "00001",
      gender: "M",
      age: 40
    });
    await User.query().insert({
      name: "Nadal",
      email: "n@n.com",
      password: "password",
      skillLevel: 7,
      location: "00003",
      gender: "M",
      age:35
    });
  }
}

export default UserSeeder;

import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    await User.query().insert({
      name: "Djokovic",
      email: "d@d.com",
      password: "password",
      skillLevel: 7,
      location: "69 adams st, Somerville, MA 02145",
      gender: "M",
      age: 34
    });
    await User.query().insert({
      name: "Federer",
      email: "f@f.com",
      password: "password",
      skillLevel: 8,
      location: "12209 Fairfield House Dr, Fairfax, VA 22033",
      gender: "M",
      age: 40
    });
    await User.query().insert({
      name: "Nadal",
      email: "n@n.com",
      password: "password",
      skillLevel: 7,
      location: "132 Dover St, Medford, MA 02155",
      gender: "M",
      age:35
    });
    
  }
}

export default UserSeeder;

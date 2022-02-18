/* eslint-disable no-console */
import { connection } from "../boot.js"
import CourtSeeder from "./seeders/CourtSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"
import MatchSeeder from "./seeders/MatchSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("seeding users")
    await UserSeeder.seed()
    console.log("seeding courts")
    await CourtSeeder.seed()
    console.log("seeding matches")
    await MatchSeeder.seed()
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
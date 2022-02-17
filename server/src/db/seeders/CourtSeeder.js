import { Court } from "../../models/index.js";

class CourtSeeder {
  static async seed() {
    await Court.query().insert({
      courtName: "Francis Neighborhood Tennis Court",
      address: "17 Bryant St, Cambridge, MA 02138",
    });
    await Court.query().insert({
      courtName: "Pemberton Tennis Courts",
      address: "Pemberton Tennis Courts, Cambridge, MA 02140"
    });
    await Court.query().insert({
      courtName: "Dilboy Tennis Courts",
      address: "110 Alewife Brook Pkwy, Somerville, MA 02144"
    });
  }
}

export default CourtSeeder;

import { User } from "../../models/index.js";

class MatchSeeder {
  static async seed() {
    const federer = await User.query().findOne("name", "Federer");
    const djokovic = await User.query().findOne("name", "Djokovic");
    const nadal = await User.query().findOne("name", "Nadal");

    await federer.$relatedQuery("opponentMatches").insertAndFetch({
      type: "Just rallied",
      date: "08/01/2016",
      result: "6-0 W",
      hostId: djokovic.id,
    });
    await federer.$relatedQuery("opponentMatches").insertAndFetch({
      type: "Played a match",
      date: "07/01/2017",
      result: "6-3 W",
      hostId: nadal.id,
    });
    await federer.$relatedQuery("opponentMatches").insertAndFetch({
      type: "Just rallied",
      date: "06/01/2019",
      result: "6-0 W",
      hostId: nadal.id,
    });
    await nadal.$relatedQuery("opponentMatches").insertAndFetch({
      type: "Played a match",
      date: "08/01/2020",
      result: "6-0 W",
      hostId: djokovic.id,
    });
  }
}

export default MatchSeeder;

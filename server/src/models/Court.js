const Model = require("./Model");

class Court extends Model {
  static get tableName() {
    return "courts";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["courtName", "address"],
      properties: {
        address: { type: "string" },
        courtName: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const Match = require("./Match");

    return {
      matches: {
        relation: Model.HasManyRelation,
        modelClass: Match,
        join: {
          from: "courts.id",
          to: "matches.courtId",
        },
      },
    };
  }
}
module.exports = Court;

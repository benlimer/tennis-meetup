const Model = require("./Model");

class Match extends Model {
  static get tableName() {
    return "matches";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["type", "date"],
      properties: {
        type: { type: "string" },
        hostId: { type: ["integer", "string"] },
        opponentId: { type: ["integer", "string"] },
        result: { type: "string" },
        date: { type: ["string", "integer"] },
        courtId: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const User = require("./User");
    const Court = require("./Court");

    return {
      host: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "matches.hostId",
          to: "users.id",
        },
      },

      opponent: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "matches.opponentId",
          to: "users.id",
        },
      },

      court: {
        relation: Model.BelongsToOneRelation,
        modelClass: Court,
        join: {
          from: "matches.courtId",
          to: "courts.id",
        },
      },
    };
  }
}
module.exports = Match;

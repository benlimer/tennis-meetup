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
        type: { type: "string", minLength: 1, maxLength: 30 },
        userIdOne: { type: "integer" },
        userIdTwo: { type: "integer" },
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
      userOne: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "matches.userIdOne",
          to: "users.id",
        },
      },

      userTwo: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "matches.userIdTwo",
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

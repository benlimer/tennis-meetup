/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "name", "location", "skillLevel"],

      properties: {
        email: { type: "string", format: "email" },
        cryptedPassword: { type: "string" },
        name: { type: "string" },
        location: { type: ["string", "integer"] },
        skillLevel: { type: ["string", "integer"] },
        gender: { type: "string" },
        age: { type: ["integer", "string"] },
      },
    };
  }

  static get relationMappings() {
    const Match = require("./Match");

    return {
      hostMatches: {
        relation: Model.HasManyRelation,
        modelClass: Match,
        join: {
          from: "users.id",
          to: "matches.hostId",
        },
      },
      opponentMatches: {
        relation: Model.HasManyRelation,
        modelClass: Match,
        join: {
          from: "users.id",
          to: "matches.opponentId",
        },
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;

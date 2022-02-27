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
    const Chat = require("./Chat.js")
    const Message = require("./Message")

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
      senderMessages: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: "users.id",
          to: "messages.senderId"
        }
      },
      receiverMessages: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: "users.id",
          to: "messages.receiverId"
        }
      },
      chats: {
        relation: Model.ManyToManyRelation,
        modelClass: Chat,
        join: {
          from: "users.id",
          through:{
            from: "messages.senderId",
            to: "messages.chatId"
          },
          to: "chats.id" 
        }
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

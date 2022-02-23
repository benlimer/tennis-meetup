const Model = require("./Model");

class Conversation extends Model {
  static get tableName() {
    return "conversations";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        members: { type: "array" },
      },
    };
  }

  
}
module.exports = Conversation;

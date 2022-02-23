const Model = require("./Model");

class Message extends Model {
  static get tableName() {
    return "messages";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        sender: { type: "string" },
        text: { type: "string"}
      },
    };
  }

  
}
module.exports = Message;

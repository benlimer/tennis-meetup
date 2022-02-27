const Model = require("./Model");

class Message extends Model {
  static get tableName() {
    return "messages";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        senderId: { type: ["string", "integer"] },
        receiverId: { type: ["string", "integer"] },
        text: { type: "string"},
        author: { type: "string"},
        chatId: { type: ["string", "integer"] }
      },
    };
  }

  static get relationMappings() {
    const Chat = require("./Chat");
    const User = require("./User")

    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "messages.senderId",
          to: "users.id" 
        }
      },
      receiver: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "messages.receiverId",
          to: "users.id" 
        }
      },
      chat: {
        relation: Model.BelongsToOneRelation,
        modelClass: Chat,
        join: {
          from: "messages.chatId",
          to: "chats.id"
        }
      }
    }
  }

  
}
module.exports = Message;

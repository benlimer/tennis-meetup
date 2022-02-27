const Model = require("./Model");

class Chat extends Model {
  static get tableName() {
    return "chats";
  }

  static get jsonSchema() {
    return {
      type: "object",
    };
  }

  static get relationMappings() {
    const Message = require("./Message");
    const User = require("./User")

    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "chats.id",
          through:{
            from: "messages.chatId",
            to: "messages.serverId"
          },
          to: "users.id" 
        }
      },
      messages: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: "chats.id",
          to: "messages.chatId"
        }
      }
    }
  }

  
}
module.exports = Chat;

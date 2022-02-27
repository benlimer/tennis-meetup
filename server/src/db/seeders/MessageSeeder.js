import { User, Chat } from "../../models/index.js";

class MessageSeeder {
  static async seed() {
    const federer = await User.query().findOne("name", "Federer");
    const djokovic = await User.query().findOne("name", "Djokovic");
    const nadal = await User.query().findOne("name", "Nadal");

    const fedDjoChat = await Chat.query().insertAndFetch({})
    const djoNadChat = await Chat.query().insertAndFetch({})

    await fedDjoChat.$relatedQuery("messages").insertAndFetch({
      text: "Hey Roger",
      author: djokovic.name,
      receiverId: federer.id,
      senderId: djokovic.id,
    });
    await fedDjoChat.$relatedQuery("messages").insertAndFetch({
      text: "Sup Nole",
      author: federer.name,
      receiverId: djokovic.id,
      senderId: federer.id,
    });
    await djoNadChat.$relatedQuery("messages").insertAndFetch({
      text: "Hello Nadal",
      author: djokovic.name,
      receiverId: nadal.id,
      senderId: djokovic.id,
    });
    await djoNadChat.$relatedQuery("messages").insertAndFetch({
      text: "Hello DJo",
      author: nadal.name,
      receiverId: djokovic.id,
      senderId: nadal.id,
    });
  }
}

export default MessageSeeder;

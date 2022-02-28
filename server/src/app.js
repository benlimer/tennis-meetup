import express from "express";
import path from "path";
import logger from "morgan";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import "./boot.js";
import configuration from "./config.js";
import addMiddlewares from "./middlewares/addMiddlewares.js";
import rootRouter from "./routes/rootRouter.js";
import cors from "cors";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
import hbsMiddleware from "express-handlebars";

app.set("views", path.join(__dirname, "../views"));
app.engine(
  "hbs",
  hbsMiddleware({
    defaultLayout: "default",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
addMiddlewares(app);
app.use(rootRouter);
app.use(cors());

const server = app.listen(process.env.PORT || 3001);
const io = new Server(server, {
  cors: {
    origin: "https://tennis-meetup.herokuapp.com/",
    methods: ["GET", "POST"],
  },
});
let users = [];

const addUser = (userId, socketId, userName) => {
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId, userName });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId == userId);
};

io.on("connection", (socket) => {
  console.log(`Connected User: ${socket.id}`);

  socket.on("addUser", (userId, userName) => {
    addUser(userId, socket.id, userName);
    io.emit("getUsers", users);
  });
  socket.on("sendMessage", ({ senderId, receiverId, text, chatId, author }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
      author,
      chatId,
      receiverId,
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// app.listen(configuration.web.port, configuration.web.host, () => {
//   console.log("Server is listening...");
// });
export default app;

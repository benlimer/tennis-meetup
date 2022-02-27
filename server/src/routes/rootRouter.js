import express from "express";
import courtsRouter from "./api/v1/courtsRouter.js";
import playerFinderRouter from "./api/v1/playerFinderRouter.js";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import matchesRouter from "./api/v1/matchesRouter.js";
import chatsRouter from "./api/v1/chatsRouter.js";
import messagesRouter from "./api/v1/messagesRouter.js";
import geolocationRouter from "./api/geolocationRouter.js";
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/find-players", playerFinderRouter);
rootRouter.use("/api/v1/courts", courtsRouter);
rootRouter.use("/api/v1/matches", matchesRouter);
rootRouter.use("/api/v1/chats", chatsRouter);
rootRouter.use("/api/v1/messages", messagesRouter);
rootRouter.use("/api/v1/geolocation", geolocationRouter)
//place your server-side routes here

export default rootRouter;

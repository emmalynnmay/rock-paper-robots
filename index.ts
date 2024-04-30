import express from "express";
import { engine } from 'express-handlebars';
import fs from "fs";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import { buildUsersController } from "./server/controllers/users_controller";
import { buildSessionsController } from "./server/controllers/sessions_controller";
import { buildHomeController } from "./server/controllers/home_controller";
import { buildPlayController } from "./server/controllers/play_controller";
import { buildItemsController } from "./server/controllers/items_controller";
import { buildCollectionsController } from "./server/controllers/collections_controller";
import { UsersRepository } from "./server/repositories/users_respository";
import { WalletsRepository } from "./server/repositories/wallets_repository";
import { ItemsRepository } from "./server/repositories/items_repository";
import { CollectionsRepository } from "./server/repositories/collections_repository";
import {buildWalletController} from "./server/controllers/wallets_controller";

const db = new PrismaClient();
const usersRepository = UsersRepository.getInstance(db);
const walletsRepository = WalletsRepository.getInstance(db);
const itemsRepository = ItemsRepository.getInstance(db);
const collectionsRepository = CollectionsRepository.getInstance(db);

dotenv.config();

export const DEBUG = process.env.NODE_ENV !== "production";
export const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
});

if (!DEBUG) {
  app.use(express.static('static'));
} else {
  app.use((req, res, next) => {
    if (req.url.includes(".")) {
      res.redirect(`${process.env.ASSET_URL}/${req.url}`)
    } else {
      next();
    }
  });
}

app.use("/", buildHomeController());
app.use("/users", buildUsersController(usersRepository));
app.use("/wallets", buildWalletController(walletsRepository));
app.use("/items", buildItemsController(itemsRepository));
app.use("/collections", buildCollectionsController(collectionsRepository));
app.use("/sessions", buildSessionsController(db));
app.use("/play", buildPlayController(walletsRepository));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});



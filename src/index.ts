import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import signUp from "./endpoints/SignUp";
import signIn from "./endpoints/SignIn";
import getProfile from "./endpoints/GetProfile";
import getUser from "./endpoints/GetUser";
import createRecipe from "./endpoints/CreateRecipe";
import getRecipe from "./endpoints/GetRecipe";
import follow from "./endpoints/Follow";
import unFollow from "./endpoints/UnFollow";
import getFeed from "./endpoints/GetFeed";
import deleteRecipe from "./endpoints/DeleteRecipe";
import editRecipe from "./endpoints/EditRecipe";

dotenv.config();

const app = express();

app.use(express.json());

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});

app.post('/signup', signUp);
app.post('/signin', signIn);
app.get('/user/profile', getProfile);
app.post('/user/follow', follow);
app.post('/user/unfollow', unFollow);
app.get('/user/feed', getFeed)
app.get('/user/:id', getUser);
app.post('/recipe', createRecipe);
app.get('/recipe/:id', getRecipe);
app.delete('/recipe/delete/:id', deleteRecipe);
app.put('/edit/recipe/:id', editRecipe);
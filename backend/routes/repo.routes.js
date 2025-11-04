import express from "express";
import {repoController} from "../Controller/repoController.js";

const repoRouter=express.Router();

repoRouter.post("/repo/createRepo",repoController.createRepo);
repoRouter.get("/repo/getRepos",repoController.getAllRepos);
repoRouter.get("/repo/:name",repoController.fetchRepoByName);
repoRouter.get("/repo/:id",repoController.fetchRepoById);
repoRouter.get("/repo/:userId",repoController.fetchRepoForCurrUser);
repoRouter.put("/repo/update/:id",repoController.UpdateRepoById);
repoRouter.delete("/repo/delete/:id",repoController.deleteRepoById);
repoRouter.patch("/repo/toggle/:id",repoController.toggleRepoById);


export default repoRouter;
import express from "express";
import {userController} from "../Controller/userController.js";

const userRouter=express.Router();

userRouter.get("/getUsers",userController.getAllUsers);
userRouter.post("/signup",userController.signup);
userRouter.post("/login",userController.loggin);
userRouter.get("/getUserProfile/:id",userController.getUserProfile);
userRouter.put("/updateUser/:id",userController.updateUser);
userRouter.delete("/deleteUser/:id",userController.deleteUser);


export default userRouter;
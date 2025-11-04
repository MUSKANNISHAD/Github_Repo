import express from "express";
import issueController from "../Controller/issueController.js";

const issueRouter=express.Router();

issueRouter.get("/getIssues",issueController.getAllIssues);
issueRouter.post("/createIssue",issueController.createIssue);
issueRouter.put("/updateIssue",issueController.updateIssue);
issueRouter.delete("/deleteIssue",issueController.deleteIssue);
issueRouter.get("/getIssueById",issueController.getIssueById);


export default issueRouter;
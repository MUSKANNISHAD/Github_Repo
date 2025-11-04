import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { initRepo } from "./Controller/init.js";
import { addRepo } from "./Controller/add.js";
import { commitRepo } from "./Controller/commit.js";
import { pushRepo } from "./Controller/push.js";
import { pullRepo } from "./Controller/pull.js";
import { revertRepo } from "./Controller/revert.js";
import mainRouter from "./routes/main.routes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/", mainRouter);

 const httpServer = http.createServer(app);



// MongoDB + Server startup
async function serverStart() {
  const port = process.env.PORT || 3000;
  const mongoDb = process.env.MONGODB_URL;

  try {
    await mongoose.connect(mongoDb);
    console.log("✅ Successfully connected to MongoDB");

    httpServer.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }

  app.use(cors({origin:"*"}));

  

  let user="test";

// ✅ Initialize Socket.io correctly
const io = new Server(httpServer, {
  cors: {
    origin: "*", // for development; restrict in production
    methods: ["GET", "POST"],
  },
});

io.on("connection",(socket)=>{
  socket.on("join_room",(username)=>{
    user=username;
    console.log(`${username} joined the room`);
    socket.join(user);

  })
})

const db=mongoose.connection;

db.once("open", async()=>{
  console.log("Crud operations called");
})

}

// CLI commands using yargs
yargs(hideBin(process.argv))
  .command("start", "Start the server", {}, serverStart)
  .command("init", "Initialize the new Repo", {}, initRepo)
  .command("add <file>", "Add a new file to the Repo", (yargs) => {
    yargs.positional("file", {
      describe: "file to be added",
      type: "string",
    });
  }, (argv) => addRepo(argv.file))
  .command("commit <message>", "Commit changes to the Repo", (yargs) => {
    yargs.positional("message", {
      describe: "commit message",
      type: "string",
    });
  }, (argv) => commitRepo(argv.message))
  .command("push", "Push changes to remote Repo S3", {}, pushRepo)
  .command("pull", "Pull changes from remote Repo S3", {}, pullRepo)
  .command("revert <commitId>", "Revert changes from a specific commit", {}, (argv) => {
    revertRepo(argv.commitId);
  })
  .demandCommand(1, "You need at least one command before moving forward")
  .help().argv;

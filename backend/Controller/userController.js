import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { connect } from "mongoose";


dotenv.config();
const url=process.env.MONGODB_URL;

let client;

async function connectClient() {
  if (!client) {
    client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }
}



async function signup(req, res) {
  const { username, password, email } = req.body;
  try {
    await connectClient();
    const db = client.db("muskan-project");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
      email,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    };

    const result = await usersCollection.insertOne(newUser);

    const token = jwt.sign(
      { id: result.insertId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token, userId: result.insertId });
  } catch (err) {
    console.error("Error during signup : ", err.message);
    res.status(500).send("Server error");
  }
}
async function loggin(req,res){
    const {email,password}=req.body;

    try{
        await connectClient();
        const db=client.db("githubClone");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({email});
        if(!user){
            return res.status(400).json({message:"invalid Credentials"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"invalid Credentials"});
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
        });
        res.json({ token, userId: user._id });
    }catch(err){
        console.error("error during login:",err.message);
        res.status(500).send("server error");
    }
}

 async function getAllUsers(req,res){
    try{ 
     await connectClient();
     const db=client.db("muskan-project");
     const usersCollection=db.collection("users");

     const users=await usersCollection.find({}).toArray();
     res.json(users);
    }catch(err){
        console.error("error fetching Users:",err.message);
        res.status(500).send("server  error");
    }
}

async function getUserProfile(req,res){
    const currentId=req.params.id;
   try{
    await connectClient();
    const db=client.db("muskan-project");
    const usersCollection=db.collection("users");

    const user=await usersCollection.findOne({
        _id:new ObjectId(currentId),
    })
    if(!user){
       return res.status(404).json({message:"User not found"});
    }
    res.send(user);

   }catch(err){
     console.error("error fetching Users:",err.message);
        res.status(500).send("server  error");
   }
}

async function updateUser(req, res) {
  const currentID = req.params.id;
  const { email, password } = req.body;

  try {
    await connectClient();
    const db = client.db("muskan-project");
    const usersCollection = db.collection("users");

    let updateFields = { email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const result = await usersCollection.findOneAndUpdate(
      {
        _id: new ObjectId(currentID),
      },
      { $set: updateFields },
      { returnDocument: "after" }
    );
    if (!result.value) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.send(result.value);
  } catch (err) {
    console.error("Error during updating : ", err.message);
    res.status(500).send("Server error!");
  }
}

async function deleteUser(req, res) {
  const currentID = req.params.id;

  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(currentID),
    });

    if (result.deleteCount == 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ message: "User Profile Deleted!" });
  } catch (err) {
    console.error("Error during updating : ", err.message);
    res.status(500).send("Server error!");
  }
}





const userController = {
    getAllUsers,
    signup,
    loggin,
    getUserProfile,
    updateUser,
    deleteUser
};

export { userController };

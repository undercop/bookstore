import express from "express";
// import "dotenv/config";
import authRoutes from "./routes/authRoutes.js"

import { connectDB } from "../lib/db.js";


const app = express();
// get the port from dotenv file
// actual -> cosnt port = process.env.port;
const PORT = 3000;

app.subscribe("/api/auth" , authRoutes);


app.listen(PORT , () =>{
    console.log("server is running on port 3000");
    connectDB();
})
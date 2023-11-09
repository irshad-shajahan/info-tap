import express from "express";
const app = express();
import http from "http";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
const server = http.createServer(app);
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import adminRouter from './routes/adminRouter.js';

app.use(cookieParser());
//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//middlewares
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true,limit:'50mb'}))
app.use(morgan("dev"));
app.use("/api", express.static("public"));
// cors
app.use(
  cors({
    origin: ["http://localhost:3000","https://pdf.medoncall.online"],
    credentials: true,
  })
);


const port = process.env.PORT || 5000;
//listen port
server.listen(port, () => {
  console.log(
    `server running in ${process.env.NODE_MODE} Mod on port ${process.env.PORT}`
      .bgCyan.white
  );
});

import userRouter from "./routes/userRouter.js";


app.use("/api", userRouter);
app.use('/api/admin', adminRouter);


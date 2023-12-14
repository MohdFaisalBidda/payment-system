import express from "express";
import cors from "cors";
import Auth from "./routes/Auth.js";
import Payment from "./routes/Payments.js";
import bodyParser from "body-parser";
import db from "./db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api",Auth)
app.use("/api",Payment);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

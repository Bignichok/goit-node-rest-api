import "dotenv/config";

import express from "express";
import morgan from "morgan";
import cors from "cors";

import passport from "./config/passportConfig.js";

import { connectDB } from "./db/sequelize.js";
import { applyAssociations } from "./models/associations.js";

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});

applyAssociations();
await connectDB();

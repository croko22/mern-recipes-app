import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { usersRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();
const port = 3001;

//? Middlewares
app.use(express.json());
app.use(cors());

//? Routes
app.use("/auth", usersRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  "mongodb+srv://croko22:QvVWgLhfHfrOwR4J@recipes.4jlotqb.mongodb.net/recipes?retryWrites=true&w=majority"
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import express, { Application } from "express";
import "express-async-errors";
import { handleErrors } from "./errors";
import { loginRoutes } from "./routes/login.routes";
import { userRoutes } from "./routes/user.routes";
import { recipesRoutes } from "./routes/recipes.routes";
import { commentsRoutes } from "./routes/comments.routes";

const cors = require("cors");

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/login", loginRoutes);
app.use("/user", userRoutes);
app.use("/recipe", recipesRoutes);
app.use("/comments", commentsRoutes);

app.use(handleErrors);
export default app;

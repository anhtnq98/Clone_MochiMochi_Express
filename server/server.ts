import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const server: Express = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

// ROUTES
import { userRouter } from "./routes/users.routes";
import { registerRouter } from "./routes/register_login.routes";
import { courseRouter } from "./routes/courses.routes";
import { lessonRouter } from "./routes/lessons.routes";
import { lessonCompleteRouter } from "./routes/lessons_complete.routes";
import { newWordRouter } from "./routes/new_word.routes";
import { testRouter } from "./routes/tests.routes";
import { notesRouter } from "./routes/notes.routes";

// users route
server.use("/api/v1/users", userRouter);
server.use("/api/v1/register-login", registerRouter);
server.use("/api/v1/courses", courseRouter);
server.use("/api/v1/lessons", lessonRouter);
server.use("/api/v1/lessons_complete", lessonCompleteRouter);
server.use("/api/v1/new_words", newWordRouter);
server.use("/api/v1/tests", testRouter);
server.use("/api/v1/notes", notesRouter);

server.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

server.listen(5500, () => {
  console.log("This server is running on port http://localhost:5500");
});

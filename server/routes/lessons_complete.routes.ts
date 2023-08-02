import express, { Request, Response } from "express";
import { db } from "../utils/database";

const lessonCompleteRouter = express.Router();

lessonCompleteRouter.get("/", async (req: Request, res: Response) => {
  try {
    let complete = await db.execute(`SELECT * FROM lessons_complete`);

    res.status(200).json({
      message: "Lấy thông tin trạng thái bài học thành công",
      data: complete[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

lessonCompleteRouter.get("/:userId", async (req: Request, res: Response) => {
  try {
    let { userId } = req.params;
    let complete = await db.execute(
      `SELECT * FROM lessons_complete WHERE userId = "${userId}"`
    );

    res.status(200).json({
      message: "Lấy thông tin trạng thái bài học thành công",
      data: complete[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

lessonCompleteRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { lessonId, userId } = req.body;
    const newComplete = [lessonId, userId];
    await db.execute(
      `INSERT INTO lessons_complete(lessonId, userId)  VALUES (?,?)`,
      newComplete
    );

    res.status(201).json({
      message: "Thêm trạng thái hoàn thành khóa học",
      data: newComplete,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
      error,
    });
  }
});


export { lessonCompleteRouter };

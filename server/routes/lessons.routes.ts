import express, { Request, Response } from "express";
import { db } from "../utils/database";

const lessonRouter = express.Router();

lessonRouter.get("/", async (req: Request, res: Response) => {
  try {
    let lessons = await db.execute(`SELECT * FROM lessons`);

    res.status(200).json({
      message: "Lấy thông tin tất cả bài học thành công",
      data: lessons,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

lessonRouter.get("/:courseId", async (req: Request, res: Response) => {
  try {
    let { courseId } = req.params;
    let lessons = await db.execute(
      `SELECT * FROM lessons WHERE courseId = ${courseId}`
    );

    res.status(200).json({
      message: "Lấy thông tin bài học theo khóa học thành công",
      data: lessons,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

lessonRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { lessonId, courseId, lessonName, lessonSubName, lessonImg } =
      req.body;
    const newLesson = [
      lessonId,
      courseId,
      lessonName,
      lessonSubName,
      lessonImg,
    ];

    await db.execute(
      `INSERT INTO lessons(lessonId, courseId, lessonName, lessonSubName, lessonImg) VALUES (?,?,?,?,?)`,
      newLesson
    );

    res.status(201).json({
      message: "Thêm bài học mới thành công",
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
      error,
    });
  }
});

lessonRouter.put("/:lessonId", async (req: Request, res: Response) => {
  try {
    let { lessonId } = req.params;
    const { courseId, lessonName, lessonSubName, lessonImg } = req.body;
    const editLesson = [courseId, lessonName, lessonSubName, lessonImg];
    await db.execute(
      `UPDATE lessons SET courseId = ?, lessonName = ?, lessonSubName = ?, lessonImg = ?  WHERE lessonId = ${lessonId}`,
      editLesson
    );

    res.status(201).json({
      message: "Sửa khóa học thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
      error,
    });
  }
});

lessonRouter.put("/delete/:lessonId", async (req: Request, res: Response) => {
  let { lessonId } = req.params;
  try {
    let lesson = await db.execute(
      `DELETE FROM lessons WHERE lessonId = ${lessonId}`
    );
    res.status(200).json({
      message: "Xóa thông tin bài học thành công",
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

export { lessonRouter };

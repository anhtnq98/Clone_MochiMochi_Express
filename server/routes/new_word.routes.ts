import express, { Request, Response } from "express";
import { db } from "../utils/database";

const newWordRouter = express.Router();

newWordRouter.get("/", async (req: Request, res: Response) => {
  try {
    let lessons = await db.execute(`SELECT * FROM new_words`);

    res.status(200).json({
      message: "Lấy tất cả thông tin từ bảng từ mới",
      data: lessons,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

newWordRouter.get("/:lessonId", async (req: Request, res: Response) => {
  try {
    let { lessonId } = req.params;
    let newWords = await db.execute(
      `SELECT * FROM new_words WHERE lessonId = ${lessonId}`
    );

    res.status(200).json({
      message: "Lấy thông tin từ mới theo bài học thành công",
      data: newWords,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

newWordRouter.get("/lesson/:newWordId", async (req: Request, res: Response) => {
  try {
    let { newWordId } = req.params;
    let newWords = await db.execute(
      `SELECT * FROM new_words WHERE newWordId = ${newWordId}`
    );

    res.status(200).json({
      message: "Lấy thông tin từ mới thành công",
      data: newWords,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

newWordRouter.post("/", async (req: Request, res: Response) => {
  try {
    const {
      newWordId,
      lessonId,
      title,
      contentOne,
      contentTwo,
      pronound,
      translate,
      newWordImg,
      voice,
    } = req.body;
    const newNewWord = [
      newWordId,
      lessonId,
      title,
      contentOne,
      contentTwo,
      pronound,
      translate,
      newWordImg,
      voice,
    ];

    await db.execute(
      `INSERT INTO new_words(   
        newWordId,
        lessonId,
        title,
        contentOne,
        contentTwo,
        pronound,
        translate,
        newWordImg,
        voice)  VALUES (?,?,?,?,?,?,?,?,?)`,
      newNewWord
    );

    res.status(201).json({
      message: "Thêm từ mới thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
      error,
    });
  }
});

export { newWordRouter };

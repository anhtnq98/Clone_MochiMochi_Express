import express, { Request, Response } from "express";
import { db } from "../utils/database";
const notesRouter = express.Router();

notesRouter.get("/", async (req: Request, res: Response) => {
  try {
    let notes = await db.execute(`SELECT * FROM notes`);

    res.status(200).json({
      message: "Lấy tất cả thông tin ghi nhớ",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

notesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { noteId, userId, content, complete } = req.body;
    const newNote = [noteId, userId, content, complete];

    let notes = await db.execute(
      `INSERT INTO notes(  noteId, userId, content, complete )  VALUES (?,?,?,?)`,
      newNote
    );

    res.status(200).json({
      message: "Lưu ghi chú thành công",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

notesRouter.put("/:noteId", async (req: Request, res: Response) => {
  let { noteId } = req.params;
  try {
    const { complete } = req.body;
    let note = await db.execute(
      `UPDATE notes SET complete = ? WHERE noteId = ${noteId}`,
      [complete]
    );
    res.status(200).json({
      message: "Cập nhật ghi chú thành công",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
      error: error,
    });
  }
});

notesRouter.put("/update/:noteId", async (req: Request, res: Response) => {
  let { noteId } = req.params;
  try {
    const { content } = req.body;
    let note = await db.execute(
      `UPDATE notes SET content = ? WHERE noteId = ${noteId}`,
      [content]
    );
    res.status(200).json({
      message: "Cập nhật ghi chú thành công",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
      error: error,
    });
  }
});

notesRouter.put("/delete/:noteId", async (req: Request, res: Response) => {
  let { noteId } = req.params;
  try {
    let note = await db.execute(`DELETE FROM notes WHERE noteId = ${noteId}`);
    res.status(200).json({
      message: "Xóa ghi chú thành công",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

export { notesRouter };

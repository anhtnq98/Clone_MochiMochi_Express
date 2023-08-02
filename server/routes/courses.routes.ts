import express, { Request, Response } from "express";
import { db } from "../utils/database";

const courseRouter = express.Router();

courseRouter.get("/", async (req: Request, res: Response) => {
  try {
    let course = await db.execute(
      `
    SELECT * FROM courses
   `
    );
    res.status(200).json({
      message: "Lấy tất cả thông tin khóa học thành công",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

courseRouter.get("/search", async (req: Request, res: Response) => {
  let { searchCourseValue } = req.query;

  try {
    let course = await db.execute(
      `
    SELECT *
    FROM courses
    WHERE courseName LIKE "%${searchCourseValue}%"`
    );
    res.status(200).json({
      message: "Lấy tất cả thông tin khóa học thành công",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

courseRouter.get("/:courseId", async (req: Request, res: Response) => {
  let { courseId } = req.params;
  try {
    let course = await db.execute(
      `SELECT * FROM courses WHERE courseId = ${courseId}`
    );
    res.status(200).json({
      message: "Lấy thông tin khóa học thành công",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

courseRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { courseId, courseName, courseLangue, target, about } = req.body;
    const newCourse = [courseId, courseName, courseLangue, target, about];
    await db.execute(
      "INSERT INTO courses(courseId, courseName, courseLangue, target, about)  VALUES (?,?,?,?,?)",
      newCourse
    );
    res.status(201).json({
      status: 201,
      message: "Thêm khóa học mới thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

courseRouter.put("/:courseId", async (req: Request, res: Response) => {
  try {
    let { courseId } = req.params;

    let { courseName, courseLangue, target, about } = req.body;
    let editCourse = [courseName, courseLangue, target, about];
    console.log(editCourse);
    await db.execute(
      `UPDATE courses SET courseName = ?, courseLangue = ?, target = ?, about = ?  WHERE courseId = ${courseId}`,
      editCourse
    );
    res.status(201).json({
      message: "Sửa khóa học thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

courseRouter.put("/delete/:courseId", async (req: Request, res: Response) => {
  let { courseId } = req.params;
  try {
    let course = await db.execute(
      `DELETE FROM courses WHERE courseId = ${courseId}`
    );
    res.status(200).json({
      message: "Xóa thông tin khóa học thành công",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

export { courseRouter };

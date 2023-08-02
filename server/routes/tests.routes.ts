import express, { Request, Response } from "express";
import { db } from "../utils/database";

const testRouter = express.Router();

testRouter.get("/", async (req: Request, res: Response) => {
  try {
    let test = await db.execute(`SELECT * FROM test_tables`);

    res.status(200).json({
      message: "Lấy tất cả thông tin chủ đề bài kiểm tra",
      data: test,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

testRouter.get("/:testTableType", async (req: Request, res: Response) => {
  try {
    let { testTableType } = req.params;
    let test = await db.execute(
      `SELECT * FROM test_tables WHERE testTableType = ${testTableType}`
    );

    res.status(200).json({
      message: "Lấy tất cả thông tin chủ đề bài kiểm tra",
      data: test,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

testRouter.get("/my_test/all", async (req: Request, res: Response) => {
  try {
    let test = await db.execute(`SELECT * FROM tests`);

    res.status(200).json({
      message: "Lấy tất cả thông tin bài kiểm tra",
      data: test,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

testRouter.get("/my_test/text_exs", async (req: Request, res: Response) => {
  try {
    let exs = await db.execute(`SELECT * FROM test_exs`);

    res.status(200).json({
      message: "Lấy tất cả thông tin câu hỏi",
      data: exs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

testRouter.get(
  "/my_test/text_exs/:testId",
  async (req: Request, res: Response) => {
    try {
      let { testId } = req.params;
      let exs = await db.execute(
        `SELECT * FROM test_exs WHERE testId = ${testId}`
      );

      res.status(200).json({
        message: "Lấy tất cả thông tin câu hỏi theo bài kiểm tra",
        data: exs,
      });
    } catch (error) {
      res.status(500).json({
        message: "Không kết nối được với server",
      });
    }
  }
);

testRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { testTableId, testTableName, testTableType } = req.body;
    const newTestTable = [testTableId, testTableName, testTableType];
    let data = await db.execute(
      `INSERT INTO test_tables(testTableId, testTableName, testTableType)  VALUES (?,?,?)`,
      newTestTable
    );
    res.status(201).json({
      message: "Thêm chủ đề thành công",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
      error: error,
    });
  }
});

testRouter.post("/my_test/all", async (req: Request, res: Response) => {
  try {
    const { testId, testName, testTableId } = req.body;
    const newTest = [testId, testName, testTableId];
    let data = await db.execute(
      `INSERT INTO tests(testId, testName, testTableId)  VALUES (?,?,?)`,
      newTest
    );
    res.status(201).json({
      message: "Thêm bài test thành công",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
      error: error,
    });
  }
});

testRouter.post("/my_test/text_exs", async (req: Request, res: Response) => {
  try {
    const {
      exId,
      question,
      answerOne,
      answerTwo,
      answerThree,
      rightAnswer,
      testId,
    } = req.body;
    const newTest = [
      exId,
      question,
      answerOne,
      answerTwo,
      answerThree,
      rightAnswer,
      testId,
    ];
    let data = await db.execute(
      `INSERT INTO test_exs(     
        exId,
        question,
        answerOne,
        answerTwo,
        answerThree,
        rightAnswer,
        testId)  VALUES (?,?,?,?,?,?,?)`,
      newTest
    );
    res.status(201).json({
      message: "Thêm câu hỏi thành công",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
      error: error,
    });
  }
});



export { testRouter };

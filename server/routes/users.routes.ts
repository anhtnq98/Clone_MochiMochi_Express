import express, { Request, Response } from "express";
import { db } from "../utils/database";
import { checkToken } from "../middleware/authenToken";

const userRouter = express.Router();

// Lấy tất cả user

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    let users = await db.execute(`SELECT * FROM users`);

    res.status(200).json({
      message: "Lấy thông tin người dùng thành công",
      data: users[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

// Lấy user theo email

userRouter.get("/email", async (req: Request, res: Response) => {
  try {
    let { email } = req.query; // Sử dụng req.query để lấy thông tin email từ query params

    let users = await db.execute(
      `SELECT * FROM users WHERE email = "${email}"`
    );

    res.status(200).json({
      message: "Lấy thông tin người dùng thành công",
      data: users[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
    });
  }
});

// Thêm kinh nghiệm
userRouter.put(
  "/update-experience/:userId",
  async (req: Request, res: Response) => {
    try {
      console.log("vào");
      let { userId } = req.params;
      let { newExperience } = req.body;
      let update = await db.execute(
        `UPDATE users SET experience = ? WHERE userId = "${userId}"`,
        [newExperience]
      );
      res.status(200).json({
        message: "Thêm kinh nghiệm thành công",
        data: update,
      });
    } catch (error) {
      res.status(500).json({
        message: "Không kết nối được với server",
        error: error,
      });
    }
  }
);

// Nâng cấp danh hiệu
userRouter.put(
  "/update-trophy/:userId",
  async (req: Request, res: Response) => {
    try {
      let { userId } = req.params;
      let { newTrophy } = req.body;
      let update = await db.execute(
        `UPDATE users SET trophy = ? WHERE userId = "${userId}"`,
        [newTrophy]
      );
      res.status(200).json({
        message: "Nâng cấp danh hiệu thành công",
        data: update,
      });
    } catch (error) {
      res.status(500).json({
        message: "Không kết nối được với server",
        error: error,
      });
    }
  }
);

// Thay ảnh đại diện
userRouter.put(
  "/update-avatar/:userId",
  async (req: Request, res: Response) => {
    try {
      let { userId } = req.params;
      let { newAvatar } = req.body;
      let update = await db.execute(
        `UPDATE users SET photoURL = ? WHERE userId = "${userId}"`,
        [newAvatar]
      );
      res.status(200).json({
        message: "Thay đổi ảnh đại diện thành công",
        data: update,
      });
    } catch (error) {
      res.status(500).json({
        message: "Không kết nối được với server",
        error: error,
      });
    }
  }
);

// Thay đổi tên người dùng
userRouter.put(
  "/update-username/:userId",
  async (req: Request, res: Response) => {
    try {
      let { userId } = req.params;
      let { newName } = req.body;
      let update = await db.execute(
        `UPDATE users SET userName = ? WHERE userId = "${userId}"`,
        [newName]
      );
      res.status(200).json({
        message: "Thay đổi tên người dùng thành công",
        data: update,
      });
    } catch (error) {
      res.status(500).json({
        message: "Không kết nối được với server",
        error: error,
      });
    }
  }
);

// userRouter.get(
//   "/userId",
//   checkToken,
//   /* middleware1,middleware2,middleware3 dùng chung req,res */ async (
//     req: Request,
//     res: Response
//   ) => {
//     try {
//       let { userId } = req.params;
//       let { authorization } = req.headers;
//       let users = await db.execute(
//         `SELECT * FROM users where userId = ${userId}`,
//         [authorization]
//       );

//       res.status(200).json({
//         message: "Lấy thông tin người dùng thành công",
//         data: users,
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: "Không kết nối được với server",
//       });
//     }
//   }
// );

export { userRouter };

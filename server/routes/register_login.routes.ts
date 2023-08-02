import express, { Request, Response } from "express";
import { db } from "../utils/database";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { checkRegister } from "../middleware/checkRegister";
dotenv.config();

const registerRouter = express.Router();

// register
registerRouter.post(
  "/register",
  checkRegister,
  async (req: Request, res: Response) => {
    try {
      const { userName, email, password, experience, trophy, role, photoURL } =
        req.body;

      const userId = uuidv4();
      // Mã hóa mật khẩu
      let salt = bcrypt.genSaltSync(10);
      let hashPassword = bcrypt.hashSync(password, salt);
      const newUser = [
        userId,
        userName,
        email,
        hashPassword,
        experience,
        trophy,
        role,
        photoURL,
      ];
      const accessToken = jwt.sign(
        /* payload:user-id */ { email },
        "ThanNgocQuynhAnh",
        {
          expiresIn: "30s",
        }
      );

      await db.execute(
        "INSERT INTO users(userId, userName, email, password, experience, trophy, role, photoURL)  VALUES (?,?,?,?,?,?,?,?)",
        newUser
      );

      res.status(201).json({
        message: "Thêm người mới thành công",
        token: accessToken,
        data: { email },
        /* token */
      });

      console.log(newUser);
    } catch (error) {
      res.status(500).json({
        message: "Không kết nối được với server",
        error: error,
      });
    }
  }
);

registerRouter.post("/google-login", async (req: Request, res: Response) => {
  try {
    const { userName, email, password, experience, trophy, role, photoURL } =
      req.body;

    const userId = uuidv4();
    // Mã hóa mật khẩu
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    const newUser = [
      userId,
      userName,
      email,
      hashPassword,
      experience,
      trophy,
      role,
      photoURL,
    ];
    const accessToken = jwt.sign(
      /* payload:user-id */ { email },
      "ThanNgocQuynhAnh",
      {
        expiresIn: "30s",
      }
    );
    let checkEmailExist = await db.execute(
      `SELECT * FROM users WHERE email = "${email}"`
    );

    if (checkEmailExist && Array.isArray(checkEmailExist[0])) {
      if (checkEmailExist[0].length !== 1) {
        await db.execute(
          "INSERT INTO users(userId, userName, email, password, experience, trophy, role, photoURL)  VALUES (?,?,?,?,?,?,?,?)",
          newUser
        );
      }
    } else {
      console.log("check-------------------- 0");
    }

    res.status(201).json({
      message: "Đăng nhập Google",
      token: accessToken,
      data: { email },
      /* token */
    });

    console.log(newUser);
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
      error: error,
    });
  }
});

// API đăng nhập
registerRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Lấy dữ liệu từ database
    let checkEmailExist = await db.execute(
      `SELECT * FROM users WHERE email = "${email}"`
    );
    if (checkEmailExist && Array.isArray(checkEmailExist[0])) {
      if (checkEmailExist[0].length < 1) {
        res.status(401).json({
          message: "Email này không tồn tại",
        });
      } else {
        const accessToken = jwt.sign(
          /* payload:user-id */ { email },
          "ThanNgocQuynhAnh",
          {
            expiresIn: "30s",
          }
        );
        let getPassword: any = checkEmailExist[0][0];
        let checkPassword = getPassword.password;
        let isMatch = bcrypt.compareSync(password, checkPassword);
        if (isMatch === true) {
          res.status(200).json({
            message: "Đăng nhập thành công",
            token: accessToken,
            data: { email },
          });
        } else {
          res.status(401).json({
            message: "Email hoặc mật khẩu không đúng",
          });
        }
        console.log("Đăng nhập ok ===> ", isMatch);
      }
    } else {
      console.log("check-------------------- 0");
    }
  } catch (error) {
    res.status(500).json({
      message: "Không kết nối được với server",
      error: error,
    });
  }
});

export { registerRouter };
/* middleware checkToken
lấy token ra từ req.header.authen
lấy ra payload của jwt - khi đky/đăng nhập BE trả về ->user-id
sau đó truyền user-id qua các cửa phía sau bằng req.header.author
*/

import { Request, Response, NextFunction } from "express";
import { db } from "../utils/database";

type UserType = {
  userName: string;
  email: string;
  password: string;
};

export async function checkRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userName, email, password }: UserType = req.body;

  let checkEmailExist = await db.execute(
    `SELECT * FROM users WHERE email = "${email}"`
  );

  if (checkEmailExist && Array.isArray(checkEmailExist[0])) {
    if (checkEmailExist[0].length === 1) {
      res.status(404).json({
        message: "Email đã tồn tại",
      });
      return;
    } else if (password.length <= 6) {
      res.status(404).json({
        message: "Mật khẩu phải dài hơn 6 kí tự",
      });
      return;
    }
    next();
  } else {
    console.log("check-------------------- 0");
  }
}

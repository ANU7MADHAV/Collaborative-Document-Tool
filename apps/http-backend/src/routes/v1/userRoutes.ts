import { prismaClient } from "@repo/primsa/client";
import bcrypt from "bcrypt";
import express, { Request, Response } from "express";
import generateAccessToken from "../../utils/generateToken";

const userRouter = express.Router();
const prisma = prismaClient;

userRouter.post("/signup", async (req: Request, res: Response) => {
  const body = req.body;

  const { username, password, name } = body;
  const saltRounds = 10;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  const user = await prisma.user.create({
    data: {
      username,
      name,
      password: hash,
    },
  });

  if (!user) {
    res.json({ message: "user not created" });
  }

  const token = generateAccessToken(username);

  if (!token) {
    res.json({ message: "token not found" });
  }

  res.json({ message: "user created" }).status(200);
});

userRouter.post("/signin", async (req: Request, res: Response) => {
  const body = req.body;

  const { username, password } = body;

  const checkUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!checkUser) {
    return res.json({ messgae: "user not found" });
  }

  const compare = bcrypt.compareSync(password, checkUser.password);

  if (!compare) {
    return res.json({ message: "password is not correct" });
  }

  const token = generateAccessToken(username);

  res.json({ message: "succesfully logged", token: token });
});

export default userRouter;

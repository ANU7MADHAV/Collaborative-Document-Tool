import express, { Request, Response } from "express";

const sheetRouter = express.Router();

sheetRouter.get("/sheets", async (req: Request, res: Response) => {});

sheetRouter.post("/sheets", async (req: Request, res: Response) => {});

sheetRouter.put("/sheets", async (req: Request, res: Response) => {});

sheetRouter.delete("sheets", async (req: Request, res: Response) => {});

export default sheetRouter;

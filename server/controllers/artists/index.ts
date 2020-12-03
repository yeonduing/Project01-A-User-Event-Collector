import { Request, Response } from "express";
import { getArtistCovers, getArtistById } from "../../models/artists";

interface Controller {
  getAll(req: Request, res: Response): Promise<void>;
  getArtist(req: Request, res: Response): Promise<void>;
}

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getArtistCovers({});
    res.status(200).json({ Artists: result });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

const getArtist = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await getArtistById(+id);
    if (!result) throw new Error("empty data");
    res.status(200).json({ Artists: result });
  } catch (err) {
    if (err === "empty data") {
      res.status(400).json({ statusCode: 400, message: "Bad Request" });
    } else {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
};

const controller: Controller = { getAll, getArtist };
export default controller;
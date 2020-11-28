import { NextApiRequest, NextApiResponse } from "next";
import { getUserLikeArtists } from "../../../utils/libraryGet";

const handler = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const tmpUserId = 1;
  const { method } = _req;

  try {
    switch (method) {
      case "GET": {
        const result = await getUserLikeArtists(tmpUserId);
        res.json({ Artists: result });
        break;
      }

      case "POST": {
        break;
      }

      default:
        res.end();
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
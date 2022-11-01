import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  message: string;
}
const commentHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  if (req.method == "POST") {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });
      return res.status(201).send({ message: "Comment sent!" });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Bad request" });
    }
  } else if (req.method == "GET") {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments`
      );
      const result = await response.json();
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Bad request" });
    }
  }
};

export default commentHandler;

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, author, price, publisher, memo } = req.body;
    console.log("動いた")
    console.log(title)
    try {
      const newReview = await prisma.reviews.create({
        data: {
          title,
          author,
          price: Number(price), // 文字列を数値に変換
          publisher,
          memo,
        },
      });
      res.status(200).json(newReview);
    } catch (error) {
      res.status(400).json({ error: "Something went wrong" });
    }
  } else {
    // POST以外のメソッドのハンドリング
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

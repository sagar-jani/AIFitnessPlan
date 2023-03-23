import prisma from '../../lib/prismadb'
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const generationCount = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(500).json({ error: "Login to upload." });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  })
  console.log('**user', user)
  console.log('**user', user?.generationCount)
  res.status(200).json({ count: user?.generationCount });
}

export default generationCount;
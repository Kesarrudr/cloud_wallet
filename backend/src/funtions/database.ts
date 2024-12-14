import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const getUser = async (username: string) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        password: true,
        publicKey: true,
        privateKey: true,
      },
    });

    return user;
  } catch (error) {
    console.log("Error", error);
    return null;
  }
};

const createNewUser = async (
  username: string,
  password: string,
  publicKey: string,
  privateKey: string,
) => {
  try {
    const newUser = await prismaClient.user.create({
      data: {
        username: username,
        password: password,
        privateKey: privateKey,
        publicKey: publicKey,
      },
      select: {
        id: true,
        username: true,
        publicKey: true,
      },
    });

    return newUser;
  } catch (error) {
    console.log("Error", error);
    return null;
  }
};

export { createNewUser, getUser };

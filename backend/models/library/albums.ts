import prisma from "../../prisma";

const getUserLikeAlbums = async (id: number): Promise<any> => {
  const albumsWithRelation = await prisma.users_Like_Albums.findMany({
    where: { userId: id },
    include: {
      Albums: {
        include: {
          Artists: true,
        },
      },
    },
  });

  const albums = albumsWithRelation.map((elem) => elem.Albums);
  return albums;
};

const postUserLikeAlbums = async (
  userId: number,
  albumId: number
): Promise<String | Error> => {
  try {
    await prisma.users_Like_Albums.create({
      data: {
        Users: {
          connect: { id: userId },
        },
        Albums: {
          connect: { id: albumId },
        },
      },
    });
    return "Success Post";
  } catch (err) {
    return new Error("Fail Post");
  }
};

const deleteUserLikeAlbums = async (
  userId: number,
  albumId: number
): Promise<String | Error> => {
  try {
    await prisma.users_Like_Albums.deleteMany({
      where: {
        userId,
        albumId,
      },
    });
    return "Success Delete";
  } catch (err) {
    return new Error("Fail Delete");
  }
};

export { getUserLikeAlbums, postUserLikeAlbums, deleteUserLikeAlbums };

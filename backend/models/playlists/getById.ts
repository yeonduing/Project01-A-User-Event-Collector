import prisma from "../../prisma";

const getPlaylistById = async (id: number): Promise<Object | null> => {
  const playlist: any = await prisma.playlists.findUnique({
    where: { id },
    include: {
      Users: {
        select: { username: true },
      },
    },
  });
  if (!playlist) return null;

  const trackIdArr = await prisma.playlists_Tracks.findMany({
    where: { playlistId: id },
    orderBy: { playlistTrackNumber: "asc" },
    include: {
      Tracks: {
        include: {
          Albums: true,
          Artists_Tracks: {
            include: {
              Artists: {
                select: {
                  id: true,
                  artistName: true,
                },
              },
            },
          },
        },
      },
    },
  });
  playlist.Tracks = trackIdArr;

  return playlist;
};

export default getPlaylistById;

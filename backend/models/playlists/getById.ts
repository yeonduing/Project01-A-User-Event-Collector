import prisma from "../../prisma";

const getPlaylistById = async (
  id: number,
  user: any
): Promise<Object | null> => {
  const playlist: any = await prisma.playlists.findUnique({
    where: { id },
    include: {
      Users: {
        select: { username: true },
      },
      Users_Likes_Playlists: {
        where: { userId: user ? user.id : -1 },
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
          Albums: {
            include: {
              Users_Like_Albums: { where: { userId: user ? user.id : -1 } },
            },
          },
          Artists_Tracks: {
            include: {
              Artists: {
                include: {
                  Users_Like_Artists: {
                    where: { userId: user ? user.id : -1 },
                  },
                },
              },
            },
          },
          Users_Like_Tracks: {
            where: { userId: user ? user.id : -1 },
          },
        },
      },
    },
  });
  const tracks: any = [];
  trackIdArr.forEach((el) => tracks.push(el.Tracks));
  playlist.Liked = playlist.Users_Likes_Playlists.length > 0;
  delete playlist.Users_Likes_Playlists;
  playlist.Tracks = tracks;
  playlist.Tracks.forEach((el) => {
    el.Artists = [];
    el.Artists_Tracks.forEach((artist) => el.Artists.push(artist.Artists));
    delete el.Artists_Tracks;
    el.Artists.forEach((artist) => {
      artist.Liked = artist.Users_Like_Artists.length > 0;
      delete artist.Users_Like_Artists;
    });
    el.Liked = el.Users_Like_Tracks.length > 0;
    delete el.Users_Like_Tracks;
    el.Albums.Liked = el.Albums.Users_Like_Albums.length > 0;
    delete el.Albums.Users_Like_Albums;
  });

  return playlist;
};

export default getPlaylistById;

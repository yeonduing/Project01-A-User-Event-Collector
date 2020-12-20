import React, { FC } from "react";
import styled from "styled-components";
import DetailPage from "../../components/DetailPage";
import { Playlist } from "../../interfaces";

const StylePlaylistPage = styled.div`
  height: 100vh;
`;

const PlaylistPage: FC<Playlist[]> = ({ Playlists }: any) => {
  return (
    <StylePlaylistPage>
      <DetailPage type="Playlists" detailData={Playlists} tracks={Playlists.Tracks} />
    </StylePlaylistPage>
  );
};

export default PlaylistPage;

export async function getServerSideProps({ params }: any): Promise<any> {
  const apiUrl = process.env.API_URL;
  const apiPort = process.env.API_PORT;

  const res = await fetch(`${apiUrl}:${apiPort}/api/playlists/${params.pid}`);
  const { Playlists } = await res.json();

  return { props: { Playlists } };
}

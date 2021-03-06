import React, { FC } from "react";
import DetailPage from "../../components/DetailPage";
import { Album } from "../../interfaces";

const AlbumPage: FC<Album[]> = ({ Albums }: any) => {
  return <DetailPage type="Albums" detailData={Albums} tracks={Albums.Tracks} />;
};

export default AlbumPage;

export async function getServerSideProps({ params }: any): Promise<any> {
  const apiUrl = process.env.API_URL;
  const apiPort = process.env.API_PORT;

  const res = await fetch(`${apiUrl}:${apiPort}/api/albums/${params.pid}`);
  const { Albums } = await res.json();

  return { props: { Albums } };
}

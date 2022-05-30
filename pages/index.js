import { getSession } from "next-auth/react";
import Head from "next/head";
import Center from "../components/Center/Center";
import Player from "../components/Player/Player";
import SideBar from "../components/SideBar/SideBar";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Create Next App</title>
      </Head>
      <main className="flex">
        <SideBar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session: session,
    },
  };
}

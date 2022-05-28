import Head from "next/head";
import SideBar from "../components/SideBar/SideBar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SideBar />
      </main>
    </div>
  );
}

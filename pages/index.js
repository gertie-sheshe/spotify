import Head from "next/head";
import SideBar from "../components/SideBar/SideBar";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <SideBar />
      </main>
    </div>
  );
}

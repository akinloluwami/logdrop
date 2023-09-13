import BringYourFramework from "@/components/BringYourFramework";
import Hero from "@/components/Hero";
import LogEverything from "@/components/LogEverything";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>LogDrop • API Analytics, monitoring, logging and alerts.</title>
      </Head>
      <Navbar />
      <Hero />
      <BringYourFramework />
      <LogEverything />
    </>
  );
}

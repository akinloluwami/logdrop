import BringYourFramework from "@/components/BringYourFramework";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HeroAndNav from "@/components/HeroAndNav";
import HeroAndNav2 from "@/components/HeroAndNav2";
import LogEverything from "@/components/LogEverything";
import Navbar from "@/components/Navbar";
import OpenSource from "@/components/OpenSource";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>LogDrop • API Analytics, monitoring, logging and alerts.</title>
      </Head>
      {/* <HeroAndNav /> */}
      <HeroAndNav2 />
      <BringYourFramework />
      <LogEverything />
      <OpenSource />
      <Footer />
    </>
  );
}

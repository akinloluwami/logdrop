import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>ReqLog • Analytics, logging and alerts for Express APIs</title>
      </Head>
      <>
        <Navbar />
        <Hero />
      </>
    </>
  );
}

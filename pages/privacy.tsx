import Navbar from "@/components/Navbar";
import React from "react";
import parse from "html-react-parser";
import { privacy } from "@/content/privacy";
import Footer from "@/components/Footer";
import Head from "next/head";
const Privacy = () => {
  return (
    <div>
      <Head>
        <title>Privacy Policy • LogDrop</title>
      </Head>
      <Navbar />
      <h1 className="text-center text-7xl font-semibold my-28">
        Privacy Policy
      </h1>
      <div className="lg:w-[60%] px-7 mx-auto content">{parse(privacy)}</div>
      <Footer />
    </div>
  );
};

export default Privacy;

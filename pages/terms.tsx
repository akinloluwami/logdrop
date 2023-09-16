import Navbar from "@/components/Navbar";
import React from "react";
import parse from "html-react-parser";
import Footer from "@/components/Footer";
import Head from "next/head";
import { terms } from "@/content/terms";
const Terms = () => {
  return (
    <div>
      <Head>
        <title>Terms of Service • LogDrop</title>
      </Head>
      <Navbar />
      <h1 className="text-center text-7xl font-semibold my-28">
        Terms of Service
      </h1>
      <div className="lg:w-[60%] px-7 mx-auto content">{parse(terms)}</div>
      <Footer />
    </div>
  );
};

export default Terms;

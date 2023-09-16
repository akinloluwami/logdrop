import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import Cooking from "@/components/Cooking";

const Changelog = () => {
  return (
    <div>
      <Head>
        <title>Changelog • LogDrop</title>
      </Head>
      <Navbar />
      <h1 className="text-center text-7xl font-semibold my-28">Changelog</h1>
      <div className="lg:w-[60%] px-7 mx-auto content">
        <Cooking />
      </div>
      <Footer />
    </div>
  );
};

export default Changelog;

import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <>
      <Layout>
        <div className="bg-white"></div>
      </Layout>
    </>
  );
};

export default Home;

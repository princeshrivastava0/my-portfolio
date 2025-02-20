import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import About from "@/components/about";
import Portfolio from "@/components/portfolio";
import Blog from "@/components/blog";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <About />
      <Portfolio />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}

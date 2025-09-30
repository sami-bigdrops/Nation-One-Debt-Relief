"use client"


import Navbar from "../ndr/navbar";
import Hero from "../ndr/hero";
import Steps from "../ndr/steps";
import About from "../ndr/about";
import Choose from "../ndr/choose";
import Types from "../ndr/types";
import Info from "../ndr/info";
import FAQ from "../ndr/faq";
import Footer from "../ndr/footer";
export default function Home() {
  return (
    <main>
        <Navbar />
        <Hero />
        <Steps />
        <About />
        <Choose />
        <Types />
        <Info />
        <FAQ />
        <Footer />
    </main>
    
    
  );
}

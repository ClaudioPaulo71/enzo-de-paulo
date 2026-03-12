import EditProvider from "@/components/EditProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Athletics from "@/components/Athletics";
import Academic from "@/components/Academic";
import Calendar from "@/components/Calendar";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import fs from "fs/promises";
import path from "path";

function Divider() {
  return <div className="section-divider" />;
}

export default async function Home() {
  let initialTexts = {};
  let initialImages = {};

  try {
    const textsPath = path.join(process.cwd(), 'public', 'data', 'content.json');
    const textsRaw = await fs.readFile(textsPath, 'utf8');
    initialTexts = JSON.parse(textsRaw);
  } catch(e) {
    // files might not exist yet
  }

  try {
    const imagesPath = path.join(process.cwd(), 'public', 'data', 'images.json');
    const imagesRaw = await fs.readFile(imagesPath, 'utf8');
    initialImages = JSON.parse(imagesRaw);
  } catch(e) {
    // files might not exist yet
  }

  return (
    <EditProvider initialTexts={initialTexts} initialImages={initialImages}>
      <Navbar />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Athletics />
      <Divider />
      <Academic />
      <Divider />
      <Calendar />
      <Divider />
      <Gallery />
      <Divider />
      <Contact />
      <Divider />
      <Footer />
    </EditProvider>
  );
}

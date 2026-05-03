import { About } from "@/components/About";
import { Agenda } from "@/components/Agenda";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HireForm } from "@/components/HireForm";
import { MediaGallery } from "@/components/MediaGallery";
import { ShowTypes } from "@/components/ShowTypes";
import { SpotifyTracks } from "@/components/SpotifyTracks";
import { shows } from "@/data/shows";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <ShowTypes />
        <SpotifyTracks />
        <MediaGallery />
        <Agenda shows={shows} />
        <HireForm />
      </main>
      <Footer />
    </>
  );
}

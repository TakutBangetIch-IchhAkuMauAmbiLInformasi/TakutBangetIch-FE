"use client"
import Image from "next/image";
import Hero from "@/components/home/hero";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero title="SkripsiGratis" />
      </main>
      <Footer />
    </div>
    
     
  )
}

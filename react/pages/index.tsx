import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Image from 'next/image';
import LargeCard from "@/components/landing/LargeCard";

export default function Index() {
  const imgSrc = '/images/logo.svg';
  const pages = ["playstation", "furby"];
  const router = useRouter();

  const getRandomPage = () => {
    const min = 0;
    const max = pages.length;
    return Math.floor(Math.random() * (max - min));
  };
  
  const handlePowerPress = () => { 
    const pageIndex = getRandomPage();
    router.push(`/${pages[pageIndex]}`);
  };
  
  return (
    <div className="bg-black w-full min-h-screen">
      {/* snap scrolling*/}
      <div className="snap-y snap-mandatory h-screen overflow-y-auto">
        
        {/* home */}
        <section className="snap-start h-screen w-full flex flex-col justify-between items-center gap-15">
          <div className="flex-1 flex items-end justify-center">
              <h1 className="text-4xl text-white mt-2"> 
                laura saraiva feeeélix
              </h1>
          </div>
          
          <div className="flex justify-center items-center">
          
            <img 
              src={imgSrc} 
              alt="logo" 
              className="w-[30vh] h-[30vh] object-contain"
            />

          </div>
          
          <div className="flex-1 flex flex-col justify-start items-center">
            <h2 className="text-2xl"> 
              developer, gamer, reader, lego-er 
            </h2>
          
          </div>
        </section>
        
        {/* You can add more snap sections here */}
        {/* Second section example 
        <section className="snap-start h-screen w-full flex items-center justify-center bg-gray-900">
          <h2 className="text-4xl text-white">Projects</h2>
        </section>
        */}
      </div>
    </div>
  );
}
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Image from 'next/image';
import LargeCard from "@/components/landing/LargeCard";

export default function Index() {
  const imgSrc = '/images/logo.svg';
  const [isHovered, setIsHovered] = useState(false);
  const pages = ["playstation", "furby"];
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

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
      {/* Main container with snap scrolling */}
      <div className="snap-y snap-mandatory h-screen overflow-y-auto">
        
        {/* First section - Home */}
        <section className="snap-start h-screen w-full flex flex-col justify-between items-center p-10">
          <div className="flex-1 flex items-end justify-center pb-6">
            <h1 className="text-2xl md:text-4xl text-white font-extralight"> 
              laura saraiva feeeélix
            </h1>
          </div>
          
          <div className="flex-grow-[2] flex justify-center items-center">
            {mounted && (
              <img 
                src={imgSrc} 
                alt="logo" 
                className="w-[30vh] h-[30vh] object-contain"
              />
            )}
          </div>
          
          <div className="flex-1 flex flex-col justify-start items-center pt-6 space-y-6">
            <h2 className="text-xl text-white font-extralight"> 
              developer, gamer, reader, lego-er 
            </h2>
            
            <div> 
              <LargeCard 
                color="green" 
                role="Software Engineering" 
                company="Duolingo" 
                text={["baa"]} 
                icon=""
              />
            </div>
            
            {/* Commented button - uncomment if needed */}
            {/* <button
              className={`py-4 px-6 rounded-lg min-w-[220px] text-black ${
                isHovered ? 'bg-gray-500' : 'bg-gray-200'
              }`}
              onClick={handlePowerPress}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              start your experience
            </button> */}
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
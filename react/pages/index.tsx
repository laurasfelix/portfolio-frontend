import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Image from 'next/image';
import LargeCard from "@/components/landing/LargeCard";
import Lauraa from "@/components/landing/Lauraa";

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
        <section className="snap-start h-screen w-full flex flex-col items-center justify-center gap-6">
          <div className='flex items-center'>
            <Lauraa length={30}/>
          </div>
          
          <div className="flex flex-col justify-start items-center">
            <h2 className="text-2xl"> 
              <span className='inline-block transition-all duration-300 hover:scale-105 hover:rotate-5 hover:font-bold'>developer</span>, <span className='inline-block transition-all duration-300 hover:scale-105 hover:-rotate-5 hover:font-bold'>gamer</span>, <span className='inline-block transition-all duration-300 hover:scale-105 hover:rotate-5 hover:font-bold'>reader</span>, <span className='inline-block transition-all duration-300 hover:scale-105 hover:-rotate-5 hover:font-bold'>lego-er</span>
            </h2>
          
          </div>
        </section>
        
        {/* about */}
        <section className="snap-start h-screen w-full flex items-center justify-center md:flex-row flex-col">
          <div className='bg-black flex-1 h-full w-full flex justify-center items-center'>
              <Lauraa length={30}/>
          </div>
          <div className='bg-white flex-1 h-full w-full p-8'> 
            <div className='text-black text-left p-8 flex flex-col gap-6 max-w-4xl mx-auto'>
                    <div className='text-4xl font-bold mb-4'>
                      hi! i'm laura
                    </div>
                    <div className='text-xl text-gray-700 mb-6'>
                      i like to build cool stuff
                    </div>

                    <div className='space-y-4 text-lg leading-relaxed'>
                      <p>
                        i'm a brazilian studying computer science, design, and русский at northwestern university. despite my silly approach to showing off my work, i'm a disciplined and passionate person, who wants to create technology that makes change - or at least that makes people say <em>"woah that's cool"</em>.
                      </p>
                      
                      <p>
                        last summer, i got to intern at <strong className='text-green-500'>duolingo</strong> and build a language learning app that teaches through music. my team of four shipped a karaoke experience that helps users practice listening skills, and it was especially awesome because i got to bring exposure to my culture by including portuguese.
                      </p>
                      
                      <p>
                        currently, i'm running women in computing at northwestern, building a test-generation tool in the MU Collective Lab, and coding on the side whenever a random idea tickles my fancy. outside of work, i'm raising my son (a gray cat named loki who bites), cooking bad food for my girlfriend, and playing ps5 games like high on life (doom was too scary).
                      </p>
                    </div>
            </div>
          </div>
        </section>
       

        {/* stuff i do */}
        <section className="snap-start h-screen w-full flex items-center justify-center bg-black">
          <h2 className="text-4xl text-white">stuff i do?</h2>
        </section>
       


         {/* more */}
        <section className="snap-start h-screen w-full flex items-center justify-center bg-black">
          <h2 className="text-4xl text-white">your experience isn't over</h2>
        </section>
       

         {/* contact */}
        <section className="snap-start h-screen w-full flex items-center justify-center bg-black">
          <h2 className="text-4xl text-white">contact me</h2>
        </section>
       

      </div>
    </div>
  );
}
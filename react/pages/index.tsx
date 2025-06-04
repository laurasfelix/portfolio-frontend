/* eslint-disable */

import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Image from 'next/image';
import TinyCard from "@/components/landing/TinyCard";
import Lauraa from "@/components/landing/Lauraa";
import StuffDone from '@/components/landing/StuffDone';
import Link from 'next/link';

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
          {<div className='hidden md:flex bg-black flex-1 h-full w-full justify-center items-center'>
              <Lauraa length={30}/>
          </div>}
          <div className='bg-white flex-1 h-full w-full p-8 overflow-scroll hide-scrollbar'> 
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
                        currently, i'm running women in computing at northwestern, building a test-generation tool in the MU Collective Lab, and coding on the side whenever a random idea tickles my fancy. outside of work, i'm raising my son (a gray cat named loki who bites), cooking bad food for my girlfriend, and playing ps5 games like high on life (doom is too scary).
                      </p>
                    </div>
            </div>
          </div>
        </section>
       

        {/* stuff i do */}
        <section className="snap-start h-screen w-full flex flex-col items-center hide-scrollbar justify-center bg-black overflow-hidden px-10">
          {/* <h2 className="text-4xl text-white">stuff i do?</h2> */}
          <StuffDone />
          
        </section>
       


         {/* more */}
        <section className="snap-start h-screen w-full flex flex-col items-center justify-center bg-black">
          <h2 className="text-4xl text-white mb-4">don't worry, your experience isn't over...</h2>
          <h3 className="text- to xl text-white mb-4">try these other portfolio versions out</h3>

          <div className='flex flex col justify-center items-center gap-12'>
            
            <div className='text-center text-2xl group'>
              <Link href="/playstation"> <img src="/images/ps3.svg" className='w-full h-auto'/> </Link>
              <p className='group-hover:italic'> ps3 xmb version </p>
            </div>

            <div className='text-center text-2xl group'>
              <Link href="/furby"> <img src="/images/furbotron.svg" className='w-full h-auto'/></Link>
              <p className='group-hover:italic'> furbotron 3000 version </p>
            </div>
             
            

          </div>
          
        </section>
       

         {/* contact */}
        <section className="snap-start h-screen w-full flex items-center justify-center bg-black relative">
          <div className="absolute left-0 top-0 w-full h-full pointer-events-none select-none">
            <img src="/images/logo.svg" alt="contact art" className="absolute right-0 bottom-0 w-[40vw] max-w-[400px] z-10" />
          </div>
          <div className="flex flex-col items-start justify-center h-full w-full max-w-4xl px-8 z-20">
            <div className="mb-12">
              <div className="text-white text-5xl font-mono mb-4" style={{textShadow: '2px 2px 0 #fff, 4px 4px 0 #000'}}>
                <span className="inline-block border-4 border-white rounded-3xl px-8 py-4 bg-black/80" style={{fontFamily: 'monospace'}}>
                  contact me hehe
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-8 items-end mb-8 ml-4">
              {[
                {
                  label: 'github',
                  href: 'https://github.com/laurasfelix',
                  color: '#2563eb', // blue-600
                  style: 'text-blue-500',
                },
                {
                  label: 'linkedin',
                  href: 'https://linkedin.com/in/laurasfelix28',
                  color: '#6366f1', // indigo-500
                  style: 'text-indigo-500',
                },
                {
                  label: 'email',
                  href: 'mailto:laurafelix2026@u.northwestern.edu',
                  color: '#a21caf', // purple-800
                  style: 'text-purple-500',
                },
                {
                  label: 'resume',
                  href: '/resume.pdf',
                  color: '#db2777', // pink-600
                  style: 'text-pink-500',
                },
                {
                  label: 'friend me',
                  href: 'https://discord.com/users/laurasfelix',
                  color: '#f59e42', // orange-400
                  style: 'text-orange-400',
                },
              ].map((c, i) => (
                <div key={c.label} className="flex flex-col items-center group">
                  <a href={c.href} target="_blank" rel="noopener noreferrer">
                    <span style={{display:'inline-block', width:64, height:64}}>
                      <svg width="100%" height="100%" viewBox="0 0 110 96" xmlns="http://www.w3.org/2000/svg">
                        <path d="M55 0L67.7973 36.6221H109.21L75.7065 59.2558L88.5038 95.8779L55 73.2442L21.4962 95.8779L34.2935 59.2558L0.78978 36.6221H42.2027L55 0Z" fill={c.color}/>
                      </svg>
                    </span>
                  </a>
                  <span className={`text-lg mt-1 ${c.style}`}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
       

      </div>
    </div>
  );
}
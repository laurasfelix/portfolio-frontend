/* eslint-disable */

import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Image from 'next/image';
import TinyCard from "@/components/landing/TinyCard";
import Lauraa from "@/components/landing/Lauraa";
import StuffDone from '@/components/landing/StuffDone';
import Link from 'next/link';
import { biography } from "@/utils/biography";

const PulsatingArrow = ({ color = '#fff' }: { color?: string }) => (
  <div className="hidden sm:block absolute bottom-6 right-8 z-30 animate-bounce">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M19 12l-7 7-7-7" fill="none"/>
    </svg>
  </div>
);

const ConsoleNav = () => (
  <nav className="fixed text-base sm:text-xl left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 z-40 flex flex-row gap-3 sm:gap-2 bg-black/80 rounded-xl px-4 py-2 sm:p-3 shadow-lg border-2 border-white max-w-[calc(100vw-1rem)]">
    <a href="#start" className="text-white hover:underline font-mono">hi</a>
    <a href="#about" className="text-white hover:underline font-mono">about</a>
    <a href="#stuff" className="text-white hover:underline font-mono">stuff</a>
    <a href="#extras" className="text-white hover:underline font-mono">extras</a>
    <a href="#contact" className="text-white hover:underline font-mono">contact</a>
  </nav>
);

export default function Index() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, []);

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
    <div className="bg-black w-full min-h-dvh">
      {/* snap scrolling*/}
      <div className="snap-y snap-mandatory h-dvh overflow-y-auto">
        
        {/* home */}
        <section id="start" className="snap-start h-dvh w-full flex flex-col items-center justify-center gap-6 relative">
          <div className='flex items-center'>
            <Lauraa length={30}/>
          </div>
          
          <div className="flex flex-col justify-start items-center">
            <h2 className="text-xl sm:text-2xl text-center px-4"> 
              <span className='inline-block transition-all duration-300 hover:scale-105 hover:rotate-5 hover:font-bold'>developer</span>, <span className='inline-block transition-all duration-300 hover:scale-105 hover:-rotate-5 hover:font-bold'>gamer</span>, <span className='inline-block transition-all duration-300 hover:scale-105 hover:rotate-5 hover:font-bold'>reader</span>, <span className='inline-block transition-all duration-300 hover:scale-105 hover:-rotate-5 hover:font-bold'>lego-er</span>
            </h2>
          
          </div>
          <PulsatingArrow />
        </section>
        
        {/* about */}
        <section id="about" className="snap-start h-dvh w-full flex items-center justify-center md:flex-row flex-col relative">
          {<div className='hidden md:flex bg-black flex-1 h-full w-full justify-center items-center'>
              <Lauraa length={30}/>
          </div>}
          <div className='bg-white flex-1 h-full w-full p-2 sm:p-8 overflow-hidden md:overflow-y-auto hide-scrollbar'> 
            <div className='text-black text-left px-3 pt-4 pb-20 sm:p-8 flex flex-col gap-2 sm:gap-6 max-w-4xl mx-auto'>
                    <div className='text-2xl sm:text-4xl font-bold sm:mb-4'>
                      {biography["title"]}
                    </div>
                    <div className='text-base sm:text-xl text-gray-700 mb-1 sm:mb-6'>
                      {biography["subheader"]}
                    </div>

                    <div className='space-y-2 sm:space-y-4 text-[clamp(12px,1.9dvh,15px)] sm:text-lg leading-snug sm:leading-relaxed'>
                      {biography["text"].map((text, idx) => (
                      <p key={idx}>
                        {text}
                      </p>
                      ))}
                    </div>
            </div>
          </div>
          <PulsatingArrow color="#000" />
        </section>
       

        {/* stuff i do */}
        <section id="stuff" className="snap-start h-dvh w-full flex flex-col items-center hide-scrollbar justify-center bg-black overflow-hidden px-4 sm:px-10 pb-16 sm:pb-0 relative">
          {/* <h2 className="text-4xl text-white">stuff i do?</h2> */}
          <StuffDone />
          <PulsatingArrow />
        </section>
       


         {/* more */}
        <section id="extras" className="snap-start h-dvh w-full flex flex-col items-center justify-center bg-black relative">
          <h2 className="text-2xl sm:text-4xl text-white mb-4 text-center px-4">don't worry, your experience isn't over...</h2>
          <h3 className="text-lg sm:text-xl text-white mb-4 text-center px-4">try these other portfolio versions out</h3>

          <div className='flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 px-4'>
            
            <div className='text-center text-lg sm:text-2xl group w-48 sm:w-64'>
              <Link href="/playstation"> <img src="/images/ps3.svg" alt="PS3 XMB version" className='w-full h-auto'/> </Link>
              <p className='group-hover:italic'> ps3 xmb version (WORK IN PROGRESS BEWARE)</p>
            </div>

            <div className='text-center text-lg sm:text-2xl group w-48 sm:w-64'>
              <Link href="/furby"> <img src="/images/furbotron.svg" alt="Furbotron 3000 version" className='w-full h-auto'/></Link>
              <p className='group-hover:italic'> furbotron 3000 version </p>
            </div>
             
            

          </div>
          <PulsatingArrow />
        </section>
       

         {/* contact */}
        <section id="contact" className="snap-start h-dvh w-full flex items-center justify-center bg-black relative">
          <div className="absolute left-0 top-0 w-full h-full pointer-events-none select-none">
            <img src="/images/logo.svg" alt="contact art" className="absolute right-0 bottom-0 w-[40vw] max-w-[400px] z-10" />
          </div>
          <div className="flex flex-col items-center sm:items-start justify-center h-full w-full max-w-4xl px-4 sm:px-8 pb-16 sm:pb-0 z-20">
            <div className="mb-8 sm:mb-12">
              <div className="text-white text-3xl sm:text-5xl font-mono mb-4" style={{textShadow: '2px 2px 0 #fff, 4px 4px 0 #000'}}>
                <span className="inline-block border-4 border-white rounded-3xl px-5 py-3 sm:px-8 sm:py-4 bg-black/80" style={{fontFamily: 'monospace'}}>
                  contact me hehe
                </span>
              </div>
            </div>
            <div className="flex flex-row flex-wrap justify-center sm:justify-start gap-x-6 gap-y-4 sm:gap-8 items-end mb-8 sm:ml-4">
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
      <ConsoleNav />
    </div>
  );
}
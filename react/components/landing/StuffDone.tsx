import StarBox from '@/components/landing/StarBox';
import { useState } from 'react';
import colors from "@/utils/colors";
import { StarProps } from '@/components/landing/Star';

const StuffDone = () => {

    const [openModal, setOpenModal] = useState<StarProps["color"] | "">("");

    return (
        <>
        {!openModal && <div className='flex md:flex-row flex-col'>
            {/* work */}
            <div className='group md:-translate-y-1/8 md:translate-x-1/8 -translate-x-1/4 flex md:flex-col flex-row cursor-pointer'
            onClick={() => setOpenModal("green")}> 
              <StarBox color={"green"} />
              <div className='flex flex-row items-center justify-center text-center text-3xl md:mt-2 ml-2'>
                <span className='relative px-2 transition duration-300 ease-in-out'>
                <span className='relative z-10'> i work </span>
                <span 
                className='absolute left-0 top-0 h-full origin-left transform scale-x-0 
                            group-hover:scale-x-100 transition-transform duration-300 ease-in-out'
                style={{ width: '100%', backgroundColor:colors["green"].base }}
                ></span>
                </span> 
              </div>
            </div>
            {/* awards */}
            <div className='md:translate-y-1/4 md:translate-x-[5%] group flex md:flex-col flex-row cursor-pointer'
            onClick={() => setOpenModal("yellow")}> 
              <div className='flex flex-row items-center justify-center text-center text-3xl md:mb-2 mr-2'>
                <span className='relative px-2 transition duration-300 ease-in-out'>
                    <div className='flex flex-col'>
                        <span className='relative z-10'> i win </span>
                        <span className='relative invisible italic z-10 group-hover:visible text-black'> * not guaranteed </span>
                    </div>
                
                <span 
                className='absolute left-0 top-0 h-full origin-left transform scale-x-0 
                            group-hover:scale-x-100 transition-transform duration-300 ease-in-out'
                style={{ width: '100%' , backgroundColor:colors["yellow"].base }}
                ></span>
                </span> 
              </div>
              <StarBox color={"yellow"} />
            </div>

            {/* play */}
            <div className='md:-translate-y-1/4 md:translate-x-0 group translate-x-1/4 flex md:flex-col flex-row-reverse cursor-pointer'
            onClick={() => setOpenModal("red")}>
              <StarBox color={"red"} />
              <div className='flex flex-row items-center justify-center text-center text-3xl md:mt-2 mr-2'>
                <span className='relative px-2 transition duration-300 ease-in-out'>
                <span className='relative z-10'> i play </span>
                <span 
                className='absolute left-0 top-0 h-full origin-left transform scale-x-0 
                            group-hover:scale-x-100 transition-transform duration-300 ease-in-out'
                style={{ width: '100%', backgroundColor:colors["red"].base }}
                ></span>
                </span> 
              </div>
            </div>
          </div>}

          {openModal == "green" &&
            <div className='flex w-[90%] h-[80%] m-8 mx-16 p-[2vw] rounded-[5vw] flex-col justify-between' style={{backgroundColor:colors[openModal].base }}
            >
                <div className='grid grid-cols-3 items-start justify-start'>

                    <div className=''>
                        <div className='text-center'>
                            <img src={colors[openModal].img}/>
                        </div>
                        
                    </div>
                    
                    <div className='items-center'>
                        <div className='text-center text-3xl pb-3'>
                            work
                        </div>

                        <div className='text-center text-xl rounded-xl p-1 mb-4' style={{backgroundColor: colors[openModal].light, color:colors[openModal].text}}>
                            search by any key terms
                        </div>

                        <div className='text-center'>
                            {colors[openModal].info.map((item, idx) =>
                            
                            <div key={idx}>
                                {item.title}
                            </div>
                            
                        )

                            }
                        </div>
                    </div>

                </div>
                
                <div className='justify-end'>
                    <span onClick={() => setOpenModal("")} className='text-xl cursor-pointer hover:font-extrabold flex text-center'> ← back </span>
                </div>
            </div>

            }
            {openModal == "yellow" &&
            <div className='flex w-[90%] h-[80%] m-8 mx-16 p-[2vw] rounded-[5vw] flex-col justify-between' style={{backgroundColor:colors[openModal].base }}
            >
                <div className='grid grid-cols-3 items-start justify-start'>

                    <div className=''>
                        <div className='text-center'>
                            <img src={colors[openModal].img}/>
                        </div>
                        
                    </div>
                    
                    <div>
                        <div className='text-center text-3xl'>
                            awards
                        </div>

                          <div className='text-center text-xl rounded-xl p-1 mb-4' style={{backgroundColor: colors[openModal].light, color:colors[openModal].text}}>
                            search by any key terms
                        </div>

                     
                    </div>

                </div>
                
                <div className='justify-end'>
                    <span onClick={() => setOpenModal("")} className='text-xl cursor-pointer hover:font-extrabold flex text-center'> ← back </span>
                </div>
            </div>

            }
            {openModal == "red" &&
            <div className='flex w-[90%] h-[80%] m-8 mx-16 p-[2vw] rounded-[5vw] flex-col justify-between' style={{backgroundColor:colors[openModal].base }}
            >
                <div className='grid grid-cols-3 items-start justify-start'>

                    <div className=''>
                        <div className='text-center'>
                            <img src={colors[openModal].img}/>
                        </div>
                        
                    </div>
                    
                    <div>
                        <div className='text-center text-3xl'>
                            play
                        </div>
                          <div className='text-center text-xl rounded-xl p-1 mb-4' style={{backgroundColor: colors[openModal].light, color:colors[openModal].text}}>
                            search by any key terms
                        </div>
                    </div>

                </div>
                
                <div className='justify-end'>
                    <span onClick={() => setOpenModal("")} className='text-xl cursor-pointer hover:font-extrabold flex text-center'> ← back </span>
                </div>
            </div>

            }
          </>
    );

}

export default StuffDone;
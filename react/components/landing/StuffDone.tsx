import StarBox from '@/components/landing/StarBox';
import { useState } from 'react';
import colors from "@/utils/colors";
import { StarProps } from '@/components/landing/Star';
import TinyCard from '@/components/landing/TinyCard';

const StuffDone = () => {

    const [openModal, setOpenModal] = useState<StarProps["color"] | "">("");
    const [chosen, setChosen] = useState(-1);

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
              <div className='w-[90%] h-[90%] rounded-[3vw] flex flex-col justify-between overflow-hidden'
                   style={{backgroundColor:colors[openModal].base }}>
                <div className='mt-[2%] ml-[5%] flex-row gap-4 flex'>
                    <span onClick={() => setOpenModal("")} className='text-xl cursor-pointer hover:font-extrabold flex text-center'> X </span>
                    <span onClick={() => setChosen(-1)} className='text-xl cursor-pointer hover:font-extrabold flex text-center'> ← back </span>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-[3%] items-start justify-center h-full p-[1%] overflow-hidden'>

                    {chosen == -1 && <div className='hidden md:block'>
                        <div className='text-center'>
                            <img src={colors[openModal].img} className='w-[80%] max-w-[20vw] aspect-square mx-auto'/>
                        </div>
                    </div>}
                    
                    <div className={`flex flex-col h-full ${chosen !== -1 ? 'md:col-span-3' : 'w-full'}`}>
                        <div className='text-center text-3xl pb-[3%] flex items-center justify-center'>
                            <img src={colors[openModal].img} className='w-[15%] aspect-square md:hidden mr-[3%]'/>
                            <span>work</span>
                        </div>

                        {chosen == -1 && <div className='text-center text-xl rounded-xl p-[2%] mb-[3%]' 
                             style={{backgroundColor: colors[openModal].light, color:colors[openModal].text}}>
                            search by any key terms
                        </div>}

                        {chosen==-1 ? <div className='text-center overflow-y-auto w-full h-[50vh] md:h-[60vh] hide-scrollbar'>
                                {colors[openModal].info && colors[openModal].info.map((item, idx) =>
                                
                                <div key={idx} className="mb-[3%] hover:shadow-xl cursor-pointer" onClick={() => {setChosen(idx)}}>
                                    <TinyCard company={item.company || ""} role={item.title} pictures={item.pictures} icon={item.icon} text={item.text} color={openModal} />
                                </div>
                                
                            )}
                            </div> :
                            <div className='w-full h-auto grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <div className='md:col-span-3 p-4 rounded-xl' style={{backgroundColor: colors[openModal].dark}}>
                                    {colors[openModal].info && 
                                        <div className='flex flex-col md:flex-row'>
                                            <div className='md:w-1/3 p-4 flex flex-col items-center justify-center'>
                                                <h2 className='text-white text-2xl font-bold mb-2'>{colors[openModal].info[chosen].title}</h2>
                                                <p className='text-white/80 text-2xl mb-2'>{colors[openModal].info[chosen].company}</p>
                                                {colors[openModal].info[chosen].icon && 
                                                    <img src={colors[openModal].info[chosen].icon} alt="Company logo" className='w-16 h-16 rounded-md mb-4' />
                                                }
                                            </div>
                                            <div className='md:w-2/3 p-4'>
                                                <div className='bg-opacity-80 rounded-xl p-4 overflow-y-auto max-h-[60vh] hide-scrollbar' style={{backgroundColor: colors[openModal].base}}>
                                                    {colors[openModal].info[chosen].text.map((paragraph, idx) => (
                                                    paragraph.map((lines, i) => (
                                                        <>
                                                            {idx === 0 && i === 0 && <div className='text-white font-bold mb-1'>situation: 
                                                                {colors[openModal].info[chosen].pictures && colors[openModal].info[chosen].pictures[0] && 
                                                                <img src={colors[openModal].info[chosen].pictures[0]} className="my-2 rounded-md max-w-full" />} </div>}
                                                            {idx === 1 && i === 0 && <div className='text-white font-bold mb-1'>goal:
                                                                {colors[openModal].info[chosen].pictures && colors[openModal].info[chosen].pictures[1] && 
                                                                <img src={colors[openModal].info[chosen].pictures[1]} className="my-2 rounded-md max-w-full" />}</div>}
                                                            {idx === 2 && i === 0 && <div className='text-white font-bold mb-1'>challenge:
                                                                {colors[openModal].info[chosen].pictures && colors[openModal].info[chosen].pictures[2] && 
                                                                <img src={colors[openModal].info[chosen].pictures[2]} className="my-2 rounded-md max-w-full" />}</div>}
                                                            {idx === 3 && i === 0 && <div className='text-white font-bold mb-1'>solution:
                                                                {colors[openModal].info[chosen].pictures && colors[openModal].info[chosen].pictures[3] && 
                                                                <img src={colors[openModal].info[chosen].pictures[3]} className="my-2 rounded-md max-w-full" />}</div>}
                                                            <p key={`${idx}-${i}`} className='text-white/90 mb-3'>{lines}</p>
                                                        </>
                                                    ))))}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>}
                   
                    </div>

                </div>
                
               
            </div>
            }
            
            {openModal == "yellow" &&
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-[5%]'>
              <div className='w-[90%] h-[90%] rounded-[3vw] flex flex-col justify-between overflow-hidden'
                   style={{backgroundColor:colors[openModal].base }}>

                <div className='mt-[2%] ml-[5%] flex-row gap-4 flex'>
                    <span onClick={() => setOpenModal("")} className='text-xl cursor-pointer hover:font-extrabold flex text-center'> X </span>
                    <span onClick={() => setChosen(-1)} className='text-xl cursor-pointer hover:font-extrabold flex text-center'> ← back </span>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-[3%] items-start justify-center h-full p-[1%] overflow-hidden'>

                    <div className='hidden md:block'>
                        <div className='text-center'>
                            <img src={colors[openModal].img} className='w-[80%] max-w-[20vw] aspect-square mx-auto'/>
                        </div>
                    </div>
                    
                    <div className={`flex flex-col h-full ${chosen !== -1 ? 'md:col-span-3' : 'w-full'}`}>
                        <div className='text-center text-3xl pb-[3%] flex items-center justify-center'>
                            <img src={colors[openModal].img} className='w-[15%] aspect-square md:hidden mr-[3%]'/>
                            <span>awards</span>
                        </div>

                        <div className='text-center text-xl rounded-xl p-[2%] mb-[3%]' 
                             style={{backgroundColor: colors[openModal].light, color:colors[openModal].text}}>
                            search by any key terms
                        </div>                            {chosen==-1 ? <div className='text-center overflow-y-auto w-full h-[50vh] md:h-[60vh] hide-scrollbar'>
                                {colors[openModal].info && colors[openModal].info.map((item, idx) =>
                                
                                <div key={idx} className="mb-[3%] hover:shadow-xl cursor-pointer" onClick={() => {setChosen(idx)}}>
                                    <TinyCard company={item.company || ""} role={item.title} pictures={item.pictures} icon={item.icon} text={item.text} color={openModal} />
                                </div>
                                
                            )}
                            </div> :
                            <div className='w-full h-auto grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <div className='md:col-span-3 p-4 rounded-xl' style={{backgroundColor: colors[openModal].dark}}>
                                    {colors[openModal].info && 
                                        <div className='flex flex-col md:flex-row'>
                                            <div className='md:w-1/3 p-4'>
                                                <h2 className='text-white text-2xl font-bold mb-2'>{colors[openModal].info[chosen].title}</h2>
                                                <p className='text-white/80 mb-2'>{colors[openModal].info[chosen].company}</p>
                                                {colors[openModal].info[chosen].icon && 
                                                    <img src={colors[openModal].info[chosen].icon} alt="Company logo" className='w-16 h-16 rounded-md mb-4' />
                                                }
                                            </div>
                                            <div className='md:w-2/3 p-4'>
                                                <div className='bg-opacity-80 rounded-xl p-4 overflow-y-auto max-h-[60vh] hide-scrollbar' style={{backgroundColor: colors[openModal].base}}>
                                                    {colors[openModal].info[chosen].text.map((paragraph, idx) => (
                                                        <>
                                                            {idx === 0 && <div className='text-white font-bold mb-1'>situation:
                                                                {colors[openModal].info[chosen].pictures && colors[openModal].info[chosen].pictures[0] && 
                                                                <img src={colors[openModal].info[chosen].pictures[0]} className="my-2 rounded-md max-w-full" />}
                                                            </div>}
                                                            {idx === 1 && <div className='text-white font-bold mb-1'>goal:
                                                                {colors[openModal].info[chosen].pictures && colors[openModal].info[chosen].pictures[1] && 
                                                                <img src={colors[openModal].info[chosen].pictures[1]} className="my-2 rounded-md max-w-full" />}
                                                            </div>}
                                                            {idx === 2 && <div className='text-white font-bold mb-1'>challenge:
                                                                {colors[openModal].info[chosen].pictures && colors[openModal].info[chosen].pictures[2] && 
                                                                <img src={colors[openModal].info[chosen].pictures[2]} className="my-2 rounded-md max-w-full" />}
                                                            </div>}
                                                            {idx === 3 && <div className='text-white font-bold mb-1'>solution:
                                                                {colors[openModal].info[chosen].pictures && colors[openModal].info[chosen].pictures[3] && 
                                                                <img src={colors[openModal].info[chosen].pictures[3]} className="my-2 rounded-md max-w-full" />}
                                                            </div>}
                                                            <p key={idx} className='text-white/90 mb-3'>{paragraph}</p>
                                                        </>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>}
                    </div>

                </div>
            </div>
            </div>
            }
            
            {openModal == "red" &&
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-[5%]'>
                <div className='w-[90%] h-[90%] rounded-[3vw] flex flex-col justify-between overflow-hidden'
                   style={{backgroundColor:colors[openModal].base }}>

                <div className='mt-[2%] ml-[5%] flex-row gap-4 flex'>
                    <span onClick={() => setOpenModal("")} className='text-xl cursor-pointer hover:font-extrabold flex text-center'> X </span>
                    <span onClick={() => setChosen(-1)} className='text-xl cursor-pointer hover:font-extrabold flex text-center'> ← back </span>
                </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-[3%] items-start justify-center h-full p-[1%] overflow-hidden'>

                        <div className='hidden md:block'>
                            <div className='text-center'>
                                <img src={colors[openModal].img} className='w-[80%] max-w-[20vw] aspect-square mx-auto'/>
                            </div>
                        </div>
                    
                        <div className={`flex flex-col h-full ${chosen !== -1 ? 'md:col-span-3' : 'w-full'}`}>
                            <div className='text-center text-3xl pb-[3%] flex items-center justify-center'>
                                <img src={colors[openModal].img} className='w-[15%] aspect-square md:hidden mr-[3%]'/>
                                <span>play</span>
                            </div>

                            <div className='text-center text-xl rounded-xl p-[2%] mb-[3%]' 
                                style={{backgroundColor: colors[openModal].light, color:colors[openModal].text}}>
                                search by any key terms
                            </div>

                            {chosen==-1 ? <div className='text-center overflow-y-auto w-full h-[50vh] md:h-[60vh] hide-scrollbar'>
                                {colors[openModal].info && colors[openModal].info.map((item, idx) =>
                                
                                <div key={idx} className="mb-[3%] hover:shadow-xl cursor-pointer" onClick={() => {setChosen(idx)}}>
                                    <TinyCard company={item.company || ""} role={item.title} pictures={item.pictures} icon={item.icon} text={item.text} color={openModal} />
                                </div>
                                
                            )}
                            </div> :
                            <div className='w-full h-auto grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <div className='md:col-span-3 p-4 rounded-xl' style={{backgroundColor: colors[openModal].dark}}>
                                    {colors[openModal].info && 
                                        <div className='flex flex-col md:flex-row'>
                                            <div className='md:w-1/3 p-4'>
                                                <h2 className='text-white text-2xl font-bold mb-2'>{colors[openModal].info[chosen].title}</h2>
                                                <p className='text-white/80 mb-2'>{colors[openModal].info[chosen].company}</p>
                                                {colors[openModal].info[chosen].icon && 
                                                    <img src={colors[openModal].info[chosen].icon} alt="Company logo" className='w-16 h-16 rounded-md mb-4' />
                                                }
                                            </div>
                                            <div className='md:w-2/3 p-4'>
                                                <div className='bg-opacity-80 rounded-xl p-4 overflow-y-auto max-h-[60vh] hide-scrollbar' style={{backgroundColor: colors[openModal].base}}>
                                                    {colors[openModal].info[chosen].text.map((paragraph, idx) => (
                                                        <>
                                                            {idx === 0 && <div className='text-white font-bold mb-1'>situation:
                                                                {colors[openModal].info[chosen].pictures && colors[openModal].info[chosen].pictures[0] && 
                                                                <img src={colors[openModal].info[chosen].pictures[0]} className="my-2 rounded-md max-w-full" />}
                                                            </div>}
                                                            {idx === 1 && <div className='text-white font-bold mb-1'>goal:
                                                                {colors[openModal].info[chosen].pictures && colors[openModal].info[chosen].pictures[1] && 
                                                                <img src={colors[openModal].info[chosen].pictures[1]} className="my-2 rounded-md max-w-full" />}
                                                            </div>}
                                                            {idx === 2 && <div className='text-white font-bold mb-1'>challenge:
                                                                {colors[openModal].info[chosen].pictures && colors[openModal].info[chosen].pictures[2] && 
                                                                <img src={colors[openModal].info[chosen].pictures[2]} className="my-2 rounded-md max-w-full" />}
                                                            </div>}
                                                            {idx === 3 && <div className='text-white font-bold mb-1'>solution:
                                                                {colors[openModal].info[chosen].pictures && colors[openModal].info[chosen].pictures[3] && 
                                                                <img src={colors[openModal].info[chosen].pictures[3]} className="my-2 rounded-md max-w-full" />}
                                                            </div>}
                                                            <p key={idx} className='text-white/90 mb-3'>{paragraph}</p>
                                                        </>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>}
                        </div>

                    </div>
                
                </div>
            </div>
            }
          </>
    );

}

export default StuffDone;
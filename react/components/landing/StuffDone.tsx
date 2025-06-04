import StarBox from '@/components/landing/StarBox';
import { useState, useEffect } from 'react';
import colors from "@/utils/colors";
import { StarProps } from '@/components/landing/Star';
import Modal from '@/components/landing/Modal';
import { itemProp } from '@/utils/itemInfo';

const StuffDone = () => {

    const [openModal, setOpenModal] = useState<StarProps["color"] | "">("");
    const [chosen, setChosen] = useState(-1);
    const [filtered, setFiltered] = useState<itemProp[]>([]);

    const handleSearch = (value: string) => {
        if (value === "") {
            setFiltered([]);
            return;
        }

        if (openModal && colors[openModal].info) {
            const results = colors[openModal].info.filter(item => {

                const hasMatch = item.text.some(paragraphs => {
                    if (Array.isArray(paragraphs)) {
                        return paragraphs.some(line => 
                            line.toLowerCase().includes(value.toLowerCase())
                        );
                    }
                    return false;
                });
                
       
                const titleMatch = item.title.toLowerCase().includes(value.toLowerCase());
                const companyMatch = item.company ? item.company.toLowerCase().includes(value.toLowerCase()) : false;
                
                return hasMatch || titleMatch || companyMatch;
            });
            
            setFiltered(results);
        }
    };


    useEffect(() => {
        setFiltered([]);
        setChosen(-1);
    }, [openModal]);

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

        {/* Use Modal for all three modals */}
        <Modal
            isOpen={openModal === "green"}
            color="green"
            colors={colors}
            chosen={chosen}
            filtered={filtered}
            onClose={() => setOpenModal("")}
            onBack={() => setChosen(-1)}
            onSearch={handleSearch}
            onItemSelect={(idx) => setChosen(idx)}
            modalTitle="work"
        />
        <Modal
            isOpen={openModal === "yellow"}
            color="yellow"
            colors={colors}
            chosen={chosen}
            filtered={filtered}
            onClose={() => setOpenModal("")}
            onBack={() => setChosen(-1)}
            onSearch={handleSearch}
            onItemSelect={(idx) => setChosen(idx)}
            modalTitle="awards"
        />
        <Modal
            isOpen={openModal === "red"}
            color="red"
            colors={colors}
            chosen={chosen}
            filtered={filtered}
            onClose={() => setOpenModal("")}
            onBack={() => setChosen(-1)}
            onSearch={handleSearch}
            onItemSelect={(idx) => setChosen(idx)}
            modalTitle="play"
        />
        </>
    );

}

export default StuffDone;
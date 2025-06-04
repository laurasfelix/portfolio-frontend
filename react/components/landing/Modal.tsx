import React from 'react';
import TinyCard from './TinyCard';
import { itemProp } from '@/utils/itemInfo';
import { CardProps } from '@/utils/card';

interface ModalProps {
    isOpen: boolean;
    color: 'green' | 'red' | 'yellow';
    colors: any;
    chosen: number;
    filtered: itemProp[];
    onClose: () => void;
    onBack: () => void;
    onSearch: (value: string) => void;
    onItemSelect: (index: number) => void;
    modalTitle: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    color,
    colors,
    chosen,
    filtered,
    onClose,
    onBack,
    onSearch,
    onItemSelect,
    modalTitle
}) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-[5%]'>
            <div className='w-[90%] h-[90%] rounded-[3vw] flex flex-col justify-between overflow-hidden'
                 style={{backgroundColor: colors[color].base}}>

                <div className='mt-[2%] ml-[5%] flex-row gap-4 flex'>
                    <span onClick={onClose} className='text-xl cursor-pointer hover:font-extrabold flex text-center'> X </span>
                    {chosen != -1 && <span onClick={onBack} className='text-xl cursor-pointer hover:font-extrabold flex text-center'> ← back </span>}
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-3 gap-[3%] items-start justify-center h-full p-[1%] overflow-hidden'>

                    {chosen === -1 && (
                        <div className='hidden md:block'>
                            <div className='text-center'>
                                <img src={colors[color].img} className='w-[80%] max-w-[20vw] aspect-square mx-auto'/>
                            </div>
                        </div>
                    )}
                    
                    <div className={`flex flex-col h-full ${chosen !== -1 ? 'md:col-span-3' : 'w-full'}`}>
                        <div className='text-center text-3xl pb-[3%] flex items-center justify-center'>
                            <img src={colors[color].img} className='w-[15%] aspect-square md:hidden mr-[3%]'/>
                            <span>{modalTitle}</span>
                        </div>

                        {chosen === -1 && (
                            <div className='text-center text-xl rounded-xl p-[2%] mb-[3%]' 
                                 style={{backgroundColor: colors[color].light}}>
                                <input
                                    className="peer block w-full rounded-md py-[9px] pl-10 text-sm placeholder:text-gray-500 focus:outline-0"
                                    style={{color: colors[color].text}}
                                    placeholder={"search by any key terms..."}
                                    onChange={(e) => onSearch(e.target.value)}
                                />
                            </div>
                        )}

                        {chosen === -1 ? (
                            <div className='text-center overflow-y-auto w-full h-[50vh] md:h-[60vh] hide-scrollbar'>
                                {colors[color].info && (filtered.length > 0 ? filtered : colors[color].info).map((item: itemProp, idx: number) => (
                                    <div key={idx} className="mb-[3%] hover:shadow-xl cursor-pointer" 
                                         onClick={() => onItemSelect(filtered.length > 0 ? colors[color].info.findIndex((i: itemProp) => i.title === item.title) : idx)}>
                                        <TinyCard 
                                            company={item.company || ""} 
                                            role={item.title} 
                                            pictures={item.pictures} 
                                            icon={item.icon} 
                                            text={item.text} 
                                            color={color as CardProps['color']} 
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='w-full h-auto grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <div className='md:col-span-3 p-4 rounded-xl' style={{backgroundColor: colors[color].dark}}>
                                    {colors[color].info && (
                                        <div className='flex flex-col md:flex-row'>
                                            <div className='md:w-1/3 p-4 flex flex-col items-center justify-center'>
                                                <h2 className='text-white text-2xl font-bold mb-2'>{colors[color].info[chosen].title}</h2>
                                                <p className='text-white/80 text-2xl mb-2'>{colors[color].info[chosen].company}</p>
                                                {colors[color].info[chosen].icon && (
                                                    <img src={colors[color].info[chosen].icon} alt="Company logo" className='w-16 h-16 rounded-md mb-4' />
                                                )}
                                            </div>
                                            <div className='md:w-2/3 p-4'>
                                                <div className='bg-opacity-80 rounded-xl p-4 overflow-y-auto max-h-[60vh] hide-scrollbar' style={{backgroundColor: colors[color].base}}>
                                                    {colors[color].info[chosen].text.map((paragraph: string[], idx: number) => (
                                                        paragraph.map((lines: string, i: number) => (
                                                            <React.Fragment key={`${idx}-${i}`}>
                                                                {idx === 0 && i === 0 && (
                                                                    <div className='text-white font-bold mb-1'>
                                                                        situation: 
                                                                        {colors[color].info[chosen].pictures && colors[color].info[chosen].pictures[0] && (
                                                                            <img src={colors[color].info[chosen].pictures[0]} className="my-2 rounded-md max-w-full" />
                                                                        )}
                                                                    </div>
                                                                )}
                                                                {idx === 1 && i === 0 && (
                                                                    <div className='text-white font-bold mb-1'>
                                                                        goal:
                                                                        {colors[color].info[chosen].pictures && colors[color].info[chosen].pictures[1] && (
                                                                            <img src={colors[color].info[chosen].pictures[1]} className="my-2 rounded-md max-w-full" />
                                                                        )}
                                                                    </div>
                                                                )}
                                                                {idx === 2 && i === 0 && (
                                                                    <div className='text-white font-bold mb-1'>
                                                                        challenge:
                                                                        {colors[color].info[chosen].pictures && colors[color].info[chosen].pictures[2] && (
                                                                            <img src={colors[color].info[chosen].pictures[2]} className="my-2 rounded-md max-w-full" />
                                                                        )}
                                                                    </div>
                                                                )}
                                                                {idx === 3 && i === 0 && (
                                                                    <div className='text-white font-bold mb-1'>
                                                                        solution:
                                                                        {colors[color].info[chosen].pictures && colors[color].info[chosen].pictures[3] && (
                                                                            <img src={colors[color].info[chosen].pictures[3]} className="my-2 rounded-md max-w-full" />
                                                                        )}
                                                                    </div>
                                                                )}
                                                                <p className='text-white/90 mb-3'>{lines}</p>
                                                            </React.Fragment>
                                                        ))
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

import StarBox from '@/components/landing/StarBox';

const StuffDone = () => {

    return (
        <div className='flex md:flex-row flex-col'>
            {/* work */}
            <div className='md:-translate-y-1/8 md:translate-x-1/8 -translate-x-1/4 flex md:flex-col flex-row'> 
              <StarBox color={"green"} />
              <div className='flex flex-row items-center justify-center text-center text-3xl md:mt-2 ml-2'>
                i work
              </div>
            </div>
            {/* awards */}
            <div className='md:translate-y-1/4 md:translate-x-[5%] flex md:flex-col flex-row'> 
              <div className='flex flex-row items-center justify-center text-center text-3xl md:mb-2 mr-2'>
                i win
              </div>
              <StarBox color={"yellow"} />
            </div>

            {/* play */}
            <div className='md:-translate-y-1/4 md:translate-x-0 translate-x-1/4 flex md:flex-col flex-row-reverse'>
              <StarBox color={"red"} />
              <div className='flex flex-row items-center justify-center text-center text-3xl md:mt-2 mr-2 grow'>
                i play
              </div>
            </div>
          </div>
    );

}

export default StuffDone;
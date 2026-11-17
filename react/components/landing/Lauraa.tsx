interface LauraaProps {

    length: number;

};
const Lauraa = ({length}: LauraaProps) => {
    
    const imgSrc = '/images/logo.svg';
    const name = "laura saraiva feeélix";

    return (
        <div className="flex flex-col gap-8 md:gap-12 px-4">
            <div className="flex-1 flex items-end justify-center">
              <h1 className="text-3xl sm:text-4xl text-white mt-2 flex flex-row flex-wrap justify-center gap-x-2 gap-y-1"> 
                {name.split(' ').map((word, idx) => 
                <div key={idx} className="flex flex-row group">

                    {word.split('').map((letter, lidx) =>
                    <div key={lidx} className={`transition-transform duration-300 ease-in-out ${
                          lidx % 2 === 0 
                            ? "group-hover:scale-y-130" 
                            : "group-hover:scale-y-60"
                        }`}>

                        {letter}

                    </div>)}

                </div>)}
              </h1>
            </div>
          
            <div className="flex justify-center items-center">
            
                <img 
                src={imgSrc} 
                alt="logo" 
                className="object-contain"
                style={{ width: `min(${length}vh, 70vw)`, height: `min(${length}vh, 70vw)` }}
                />

            </div>
        </div> 
    );

}

export default Lauraa;
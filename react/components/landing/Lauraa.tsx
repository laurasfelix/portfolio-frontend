interface LauraaProps {

    length: number;

};
const Lauraa = ({length}: LauraaProps) => {
    
    const imgSrc = '/images/logo.svg';

    return (
        <div className="flex flex-col gap-12">
            <div className="flex-1 flex items-end justify-center">
              <h1 className="text-4xl text-white mt-2"> 
                laura saraiva feeeélix
              </h1>
            </div>
          
            <div className="flex justify-center items-center">
            
                <img 
                src={imgSrc} 
                alt="logo" 
                className={`w-[${length}vh] h-[${length}vh] object-contain`}
                />

            </div>
        </div> 
    );

}

export default Lauraa;
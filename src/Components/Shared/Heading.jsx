import { Link } from "react-router-dom";
import headingImage from "../../assets/heading56.jpg"
import { FaArrowRight } from "react-icons/fa6";

const Heading = ({level}) => {
    return (
        <div style={{backgroundImage: `url(${headingImage})`}} className=" bg-cover bg-no-repeat h-[348px] relative">
            <div className="absolute inset-0  bg-black opacity-70 ">

</div>
                <div className="relative z-10 flex flex-col items-center justify-center h-[280px] text-center  px-4">
                    <h1 className="text-5xl text-white font-bold my-6">{level} </h1>
                    <div className="text-white flex items-center gap-2"><Link to="/">Home</Link> <FaArrowRight />
                    
                     <p className="text-gray-300" >{level}</p>
                    </div>
                </div>
            </div>
    );
};

export default Heading;
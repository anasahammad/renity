import ludo from "../../assets/ludo.jpg"
import profile from "../../assets/john.png"
import videoGames from "../../assets/videoGames.jpg"
import { GoFileDirectory } from "react-icons/go";
import { FiMessageSquare } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const ArticleSection = () => {

    const articles  = [
        {
            image: ludo, date: "22 May", author: 
                {
                    name: "John Doe", profilePhoto: profile, 
                }
            , title: "Quis purus elementum", content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est accusamus iusto, vitae sed ullam ex nihil consequatur, officiis eos hic alias distinctio, debitis sint nobis explicabo quam ea blanditiis suscipit laboriosam ipsa. Vel delectus enim distinctio aliquam ad neque accusantium at nam quo! Deleniti laudantium totam rem, dolore animi numquam?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est accusamus iusto, vitae sed ullam ex nihil consequatur, officiis eos hic alias distinctio, debitis sint nobis explicabo quam ea blanditiis suscipit laboriosam ipsa. Vel delectus enim distinctio aliquam ad neque accusantium at nam quo! Deleniti laudantium totam rem, dolore animi numquam?"
        },
        {
            image: videoGames, date: "25 May", author: {
                
                    name: "Daren Smith", profilePhoto: profile, 
                
        }, title: "Quis purus elementum", content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est accusamus iusto, vitae sed ullam ex nihil consequatur, officiis eos hic alias distinctio, debitis sint nobis explicabo quam ea blanditiis suscipit laboriosam ipsa. Vel delectus enim distinctio aliquam ad neque accusantium at nam quo! Deleniti laudantium totam rem, dolore animi numquam?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est accusamus iusto, vitae sed ullam ex nihil consequatur, officiis eos hic alias distinctio, debitis sint nobis explicabo quam ea blanditiis suscipit laboriosam ipsa. Vel delectus enim distinctio aliquam ad neque accusantium at nam quo! Deleniti laudantium totam rem, dolore animi numquam?"
        },


    ]

    return (
        <div className="px-7">
             <div className="text-center mb-12">
                <h4 className="text-xs sm:text-sm text-gray-500 font-semibold uppercase">
                Tips, Tricks & Deals - Easy Rental Services
                </h4>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mt-2">
                Read 
                    <span className="text-[#F8748C] underline mt-6"> New & Articles </span>
                </h2>
            </div>


            <div className="flex flex-col md:flex-row gap-4">
                {/* Blog 1 */}

                {articles.map((article, index)=><div key={index} className="">
                    <div  className="relative">
                        <img src={article.image} alt="" />

                        <div className="absolute -bottom-5 left-12 bg-[#F9C247] text-white w-16 h-16 text-xl font-semibold text-center ">
                            {article.date}
                        </div>
                    </div>

                    <div className="grid gap-2 grid-cols-1 md:grid-cols-3 mt-16">
                        <div className="flex items-center gap-2">
                        <img alt="" className="w-12 h-12 border rounded-full  " src={article.author.profilePhoto} />
                        <h3 className="font-medium text-gray-500  text-sm">By {article.author.name}</h3>
                        </div>

                        <div className="flex items-center gap-2">
                        <GoFileDirectory size={24} className="text-yellow-300"/>

                        <h4 className="font-medium text-gray-500 text-sm">Lazers & Lighting Effects</h4>
                        </div>
                        
                        <div className="flex items-center gap-2">
                        <FiMessageSquare size={24} className="text-yellow-300"/>

                        <h4 className="font-medium text-gray-500 text-sm">Comments</h4>
                        </div>

                        <div>

                        </div>
                    </div>

                    <div className="text-3xl font-bold my-8">{article.title}</div>

                    <div className="text-gray-500 my-6">{article.content.slice(0, 400)}...</div>


                    <button className="relative group border  border-[#f8748c]  py-4 font-semibold w-52 overflow-hidden ">
                        <Link to="/"  className="w-full text-black group-hover:text-white z-50 px-14 transition-all duration-300 ">Read More</Link>

                        <div className="w-20 group-hover:w-full absolute top-0 bottom-0  text-white bg-[#f8748c] h-full pl-4 py-4 group-hover:pl-36 border clip-right-arrow group-hover:clip-none  z-10 transition-all duration-300"><FaArrowRight /></div>
                    </button>
                </div>)}
                


            </div>
        </div>
    );
};

export default ArticleSection;
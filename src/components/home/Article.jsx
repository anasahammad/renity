import { FaArrowRight } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';
import { GoFileDirectory } from 'react-icons/go';
import { Link } from 'react-router-dom';
import profile from '../../assets/john.png';
import ludo from '../../assets/ludo.jpg';
import videoGames from '../../assets/videoGames.jpg';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const ArticleSection = () => {
  // const articles = [
  //   {
  //     image: ludo,
  //     date: '22 May',
  //     author: {
  //       name: 'John Doe',
  //       profilePhoto: profile,
  //     },
  //     title: 'Quis purus elementum',
  //     content:
  //       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est accusamus iusto, vitae sed ullam ex nihil consequatur, officiis eos hic alias distinctio, debitis sint nobis explicabo quam ea blanditiis suscipit laboriosam ipsa. Vel delectus enim distinctio aliquam ad neque accusantium at nam quo! Deleniti laudantium totam rem, dolore animi numquam?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est accusamus iusto, vitae sed ullam ex nihil consequatur, officiis eos hic alias distinctio, debitis sint nobis explicabo quam ea blanditiis suscipit laboriosam ipsa. Vel delectus enim distinctio aliquam ad neque accusantium at nam quo! Deleniti laudantium totam rem, dolore animi numquam?',
  //   },
  //   {
  //     image: videoGames,
  //     date: '25 May',
  //     author: {
  //       name: 'Daren Smith',
  //       profilePhoto: profile,
  //     },
  //     title: 'Quis purus elementum',
  //     content:
  //       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est accusamus iusto, vitae sed ullam ex nihil consequatur, officiis eos hic alias distinctio, debitis sint nobis explicabo quam ea blanditiis suscipit laboriosam ipsa. Vel delectus enim distinctio aliquam ad neque accusantium at nam quo! Deleniti laudantium totam rem, dolore animi numquam?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est accusamus iusto, vitae sed ullam ex nihil consequatur, officiis eos hic alias distinctio, debitis sint nobis explicabo quam ea blanditiis suscipit laboriosam ipsa. Vel delectus enim distinctio aliquam ad neque accusantium at nam quo! Deleniti laudantium totam rem, dolore animi numquam?',
  //   },
  // ];

  const { data: articles = [] } = useQuery({
    queryKey: 'articles',
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blog`);
      return response.data.data.rows
    }
  })
  return (
    <div className='px-7'>
      <div className='text-center mb-12'>
        <h4 className='text-xs sm:text-sm text-gray-500 font-semibold uppercase'>Tips, Tricks & Deals - Easy Rental Services</h4>
        <h2 className='text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mt-2'>
          Read
          <span className='text-[#F8748C] underline mt-6'> New & Articles </span>
        </h2>
      </div>

      <div className='flex flex-col md:flex-row gap-4'>
        {/* Blog 1 */}

        {articles.slice(0, 2).map((article, index) => (
          <div key={index} className=''>
            <div className='relative'>
              <img src={article.images[0]} alt='' />

              <div className='absolute -bottom-5 left-12 bg-[#F9C247] text-white w-16 h-16 text-xl font-semibold text-center flex  items-center justify-center '>
                {new Date(article.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit', 
                  month: 'short',
                  
                })}
              </div>
            </div>

            {/* <div className='grid gap-2 grid-cols-1 md:grid-cols-3 mt-16'>
              <div className='flex items-center gap-2'>
                <img alt='' className='w-12 h-12 border rounded-full  ' src={article.author.profilePhoto} />
                <h3 className='group relative font-medium text-gray-500  text-sm cursor-pointer hover:text-[#F8748C]'>
                  By {article.author.name}
                  <span className='absolute left-0 bottom-0 h-[2px] w-0 bg-[#F8748C] transition-all duration-300 group-hover:w-full'></span>
                </h3>
              </div>

              <div className='flex items-center gap-2'>
                <GoFileDirectory size={24} className='text-yellow-300' />

                <h4 className='font-medium text-gray-500 text-sm hover:text-[#F8748C] cursor-pointer'>Lazers & Lighting Effects</h4>
              </div>

              <div className='flex items-center gap-2'>
                <FiMessageSquare size={24} className='text-yellow-300' />

                <h4 className='font-medium text-gray-500 text-sm hover:text-[#F8748C] cursor-pointer'>Comments</h4>
              </div>

              <div></div>
            </div> */}

            <div className='text-3xl font-bold my-8'>{article.title}</div>

            <div className='text-gray-500 my-6'>{article.description.slice(0, 400)}...</div>

            <Link to={`/blog_details/${article._id}`} className='relative group border border-[#f8748c] font-semibold w-52 overflow-hidden flex items-center justify-center'>
  {/* Text content */}
  <div className='w-full text-black group-hover:text-white z-10 text-center transition-all duration-300 py-4'>
    Read More
  </div>
  
  {/* Animated background */}
  <div className='absolute inset-y-0 left-0 w-12 group-hover:w-full bg-[#f8748c] transition-all duration-300 ease-in-out z-0'>
    {/* Arrow icon positioned on the left side */}
    <div className='h-full flex items-center justify-center pl-3 group-hover:pl-0 group-hover:justify-end group-hover:pr-4 transition-all duration-300'>
      <FaArrowRight className='text-white' />
    </div>
  </div>
</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleSection;

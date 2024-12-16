const ContactUsForm = () => {
  return (
    <div className='bg-[#FFFAE9] py-16'>
      <div className='text-center space-y-4'>
        <p className='font-medium'>Need Help Renting Equipment?</p>
        <h1 className='text-5xl font-bold'>
          Send Us A <span className='text-[#F8748C] underline'>Message</span>
        </h1>
      </div>

      <div className='max-w-4xl mx-auto  p-8  rounded-md'>
        <form className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <input
                type='text'
                placeholder='Your Name'
                className='w-full border border-gray-300  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              />
            </div>
            <div className='relative'>
              <input
                type='email'
                placeholder='Your email'
                className='w-full border border-gray-300  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              />
              <div className='absolute inset-y-0 right-4 flex items-center'></div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <input
                type='tel'
                placeholder='Phone #'
                className='w-full border border-gray-300  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              />
            </div>
            <div>
              <input
                type='text'
                placeholder='Subject'
                className='w-full border border-gray-300  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400'
              />
            </div>
          </div>

          <div>
            <textarea
              placeholder='Your Message'
              rows='8'
              className='w-full border border-gray-300  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400'
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              className='w-full bg-yellow-400 text-white font-semibold py-3  focus:outline-none focus:ring-2 focus:ring-yellow-600'
            >
              SEND MESSAGE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;

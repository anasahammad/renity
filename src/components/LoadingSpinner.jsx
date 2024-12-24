import { Bars } from "react-loader-spinner";


const LoadingSpinner = () => {
  return (
    <div className='fixed inset-0 flex justify-center items-center'>
      <Bars height='80' width='80' color='#ff4d30' ariaLabel='bars-loading' wrapperStyle={{}} wrapperClass='' visible={true} />
    </div>
  );
};

export default LoadingSpinner;

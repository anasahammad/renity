

const ProductCard = ({product, viewMode}) => {
    return (
        <div className={`bg-white  shadow-sm border p-6 ${viewMode === 'grid' ? 'flex flex-col' : 'flex gap-12'}`}>
        <div className={viewMode === 'grid' ? 'w-full h-52 mb-4' : 'w-72 h-72'}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">{product.title}</h2>
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-3' : 'grid-cols-3 md:grid-cols-1 lg:grid-cols-3'} gap-4 mb-4`}>
            <div>
              <div className="text-sm text-gray-500">Rent Per Day</div>
              <div className="text-pink-500">${product.prices.day}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Rent Per Week</div>
              <div className="text-pink-500">${product.prices.week}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Rent Per Month</div>
              <div className="text-pink-500">${product.prices.month}</div>
            </div>

          </div>

          <hr />
          <div className={` my-4`}>
            {product.specs.map((spec, index) => (
              <ul key={index} className="text-sm text-gray-600 font-medium list-disc ml-4"><li>{spec}</li></ul>
            ))}
          </div>
        </div>
        <div className={`${viewMode === 'grid' ? 'mt-4' : 'hidden'} flex flex-col items-center justify-center ${viewMode === 'list' ? 'border-l pl-6' : ''}`}>
          <div className="text-center mb-4">
            <div className="text-sm text-gray-500">Total Rental Price</div>
            <div className="text-gray-400 text-xs">{product.tax}</div>
            <div className="text-xl font-semibold text-pink-500">${product.rentalPrice}/Day</div>
          </div>
          <button className="bg-[#f8748c] text-white px-6 py-4 text-xl font-semibold  ">
            Reserve Item
          </button>
        </div>
      </div>
    );
};

export default ProductCard;
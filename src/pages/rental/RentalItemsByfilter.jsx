




import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ProductFilterPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([
    'Bagerhat',
    'Bandarban',
    'Barguna',
    'Barisal',
    'Bhola',
    'Bogra',
    'Brahmanbaria',
    'Chandpur',
    'Chapai Nawabganj',
    'Chattogram',
    'Chuadanga',
    "Cox's Bazar",
    'Cumilla',
    'Dhaka',
    'Dinajpur',
    'Faridpur',
    'Feni',
    'Gaibandha',
    'Gazipur',
    'Gopalganj',
    'Habiganj',
    'Jamalpur',
    'Jashore',
    'Jhalokati',
    'Jhenaidah',
    'Joypurhat',
    'Khagrachari',
    'Khulna',
    'Kishoreganj',
    'Kurigram',
    'Kushtia',
    'Lakshmipur',
    'Lalmonirhat',
    'Madaripur',
    'Magura',
    'Manikganj',
    'Meherpur',
    'Moulvibazar',
    'Munshiganj',
    'Mymensingh',
    'Naogaon',
    'Narail',
    'Narayanganj',
    'Narsingdi',
    'Natore',
    'Netrokona',
    'Nilphamari',
    'Noakhali',
    'Pabna',
    'Panchagarh',
    'Patuakhali',
    'Pirojpur',
    'Rajbari',
    'Rajshahi',
    'Rangamati',
    'Rangpur',
    'Satkhira',
    'Shariatpur',
    'Sherpur',
    'Sirajganj',
    'Sunamganj',
    'Sylhet',
    'Tangail',
    'Thakurgaon',
  ]);
  const [priceRange, setPriceRange] = useState([0, 5000]); // Default Min: 0, Max: 5000
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get category & subcategory from URL params
  const categoryFromParams = searchParams.get('category') || '';
  const subcategoryFromParams = searchParams.get('subcategory') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryFromParams);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/category`);
        const data = await response.json();
        setCategories(data?.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory) queryParams.append('category', selectedCategory);
        if (subcategoryFromParams) queryParams.append('subcategory', subcategoryFromParams);
        if (selectedLocation) queryParams.append('location', selectedLocation);
        queryParams.append('minPrice', priceRange[0]);
        queryParams.append('maxPrice', priceRange[1]);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/rental?${queryParams}`);
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, subcategoryFromParams, selectedLocation, priceRange]);

  return (
    <div className='max-w-5xl mx-auto p-4'>
      <h1 className='text-2xl font-bold text-center mb-4'>Filter Products</h1>

      {/* Filter Options */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        {/* Category Dropdown */}
        <select
          className='border p-2 rounded'
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSearchParams({ category: e.target.value, subcategory: subcategoryFromParams }); // Update URL
          }}
        >
          <option value=''>All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Subcategory - Direct from URL params */}
        {/* <input
          type='text'
          className='border p-2 rounded bg-gray-100'
          value={subcategoryFromParams}
          readOnly
          placeholder='No Subcategory Selected'
        /> */}

        {/* Location Dropdown */}
        <select className='border p-2 rounded' value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
          <option value=''>All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Slider */}
      <div className='mb-6'>
        <label className='block font-semibold'>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
        <input
          type='range'
          min='0'
          max='5000'
          value={priceRange[0]}
          onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
          className='w-full'
        />
        <input
          type='range'
          min='0'
          max='5000'
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className='w-full'
        />
      </div>

      {/* Product List */}
      {loading ? (
        <p className='text-center text-gray-600'>Loading products...</p>
      ) : products.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {products.map((product) => (
            <div key={product._id} className='border rounded-lg p-3 shadow-md hover:shadow-lg transition'>
              <img src={product.images?.[0] || '/placeholder.jpg'} alt={product.name} className='w-full h-40 object-cover rounded' />
              <h2 className='text-lg font-semibold mt-2'>{product.name}</h2>
              <p className='text-sm text-gray-500'>Category: {product.subCategory}</p>
              <p className='text-sm text-gray-500'>Location: {product.location}</p>
              <p className='text-sm font-bold mt-1'>
                Price: <span className='text-green-600'>${product.price}</span> {product.discount > 0 && <span className='line-through text-red-500'>${product.price + product.discount}</span>}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-600'>No products found.</p>
      )}
    </div>
  );
};

export default ProductFilterPage;


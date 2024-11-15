import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config';

const Cars = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();
    const [filteredCars, setFilteredCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get(`${BACKEND_URL}/cars/totalcars`)
            .then(response => {
                setCars(response.data.cars);
                setFilteredCars(response.data.cars);
            })
            .catch(error => {
                console.error('Error fetching cars:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchTerm(query);

        const filtered = cars.filter(car => {
            const titleMatch = car.title.toLowerCase().startsWith(query);
            const companyMatch = car.company.toLowerCase().startsWith(query);
            const tagMatch = car.tags.some(tag => tag.toLowerCase().includes(query));
            const priceMatch = car.price.toString().includes(query);

            return titleMatch || companyMatch || tagMatch || priceMatch;
        });

        setFilteredCars(filtered);
    };


  return (
    <div className='w-[65%] m-auto mt-10'>

        <div className='mb-8'>
            <input
                type="text"
                placeholder="Search by title, company, or tags..."
                value={searchTerm}
                onChange={handleInputChange}  // Filter cars on input change
                className="w-full px-4 py-2 border rounded-md"
            />
        </div>

        {filteredCars.length === 0 ? (
            <p>No cars found matching your search criteria.</p>
        ) : (
            filteredCars.map((car, idx) => (
                <CarCard
                    key={idx}
                    car={car}
                    title={car.title}
                    description={car.description}
                    company={car.company}
                    price={car.price}
                    image={car.images[0]}
                    tags={car.tags}
                    navigate={navigate}
                />
            ))
        )}
        {/* {cars.map((car, idx) => <CarCard key={idx} car={car} title={car.title} description={car.description} company={car.company} price={car.price} image={car.images[0]} tags={car.tags} navigate={navigate} />)} */}
    </div>
  )
}

function CarCard({title, description, company, price, image, tags, navigate, car}){
    return <div className='flex rounded-lg shadow-xl border p-4 h-48 mt-8'>
        {/* image */}
        <div className='w-[25%] mr-5'>
            <img src={image} alt={title} draggable="false" className='object-cover h-full w-full' />
        </div>

        {/* details */}
        <div className='w-[75%] flex flex-col justify-between'>
            <div className='flex flex-col gap-2'>
                <h3 className='text-xl font-semibold'>{title} | {company}</h3>
                <p className='text-lg'>{description}</p>
                <p className='text-xl font-medium'>₹{price}</p>
            </div>
            <div className='flex justify-between items-end'>
                <div className='flex'>
                    {tags.map((tag, idx) => <p className='text-sm text-gray-600 italic mr-1'>
                        {tag}
                    </p>)}
                </div>
                <div>
                    <button onClick={() => {
                        navigate(`/cars/${car._id}`)
                    }} type='button' className='text-white bg-gray-800 hover:bg-gray-900 rounded px-4 py-1'>View</button>
                </div>
            </div>
        </div>
    </div>
}

export default Cars
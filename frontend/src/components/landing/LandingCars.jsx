import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config';

const LandingCars = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/cars/totalcars`)
            .then(response => {
                setCars(response.data.cars)
            })
            .catch(error => {
                console.error('Error fetching cars:', error);
            });
    }, []);

    // const cars = [
    //     {
    //         title: "Tesla Model S",
    //         description: "Electric luxury sedan",
    //         car_type: "sedan",
    //         company: "Tesla",
    //         dealer: "Tesla Motors",
    //         price: 73000000,
    //         images: [
    //             "https://example.com/image5.jpg",
    //             "https://example.com/image6.jpg"
    //         ],
    //         tags: ["electric", "luxury"]
    //     },
    //     {
    //         title: "Audi A6 2024",
    //         description: "luxury sedan",
    //         car_type: "sedan",
    //         company: "Audi",
    //         dealer: "Audi Luxury Motors",
    //         price: 64000000,
    //         images: [
    //             "https://example.com/image3.jpg",
    //             "https://example.com/image4.jpg"
    //         ],
    //         tags: ["sedan", "luxury"]
    //     }
    // ]

  return (
    <div className='w-[65%] m-auto mt-10'>
        {cars.map((car, idx) => <CarCard key={idx} title={car.title} description={car.description} company={car.company} price={car.price} image={car.images[0]} tags={car.tags} navigate={navigate} />)}
    </div>
  )
}

function CarCard({title, description, company, price, image, tags, navigate}){
    return <div className='flex rounded-lg shadow-xl border p-4 h-48 mt-8'>
        {/* image */}
        <div className='w-[25%] mr-5'>
            <img src={image} alt={title} className='h-full w-full object-cover' />
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
                        navigate('/signin')
                    }} type='button' className='text-white bg-gray-800 hover:bg-gray-900 rounded px-4 py-1'>View</button>
                </div>
            </div>
        </div>
    </div>
}

export default LandingCars
import React, { useEffect, useState } from 'react'
import Appbar from '../Appbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

const MyCars = () => {
  return (
    <div>
        <Appbar />

        <div>
            <UserCars />
        </div>
    </div>
  )
}

function UserCars(){
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    const fetchCars = () => {
        axios.get(`${BACKEND_URL}/cars/cars`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then(response => {
            setCars(response.data.cars)
        })
        .catch(error => {
            console.error('Error fetching cars:', error);
        });
    }
    useEffect(() => {
        fetchCars();
    }, []);

  return (
    <div className='w-[65%] m-auto mt-10'>
        {cars.map((car, idx) => <CarCard key={idx} car={car} title={car.title} description={car.description} company={car.company} price={car.price} image={car.images[0]} tags={car.tags} navigate={navigate} fetchCars={fetchCars} />)}
    </div>
  )
}

function CarCard({title, description, company, price, image, tags, navigate, car, fetchCars}){
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
                <div className='flex gap-2'>
                    <button onClick={() => {
                        navigate(`/editdetails/${car._id}`)
                    }} type='button' className='text-white bg-blue-700 hover:bg-blue-800 rounded px-4 py-1'>Edit</button>
                    <button onClick={async () => {
                        await axios.delete(`${BACKEND_URL}/cars/cars/${car._id}`, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })

                        fetchCars();
                        console.log(car._id);
                    }} type='button' className='text-white bg-red-600 hover:bg-red-700 rounded px-4 py-1'>Delete</button>
                    <button onClick={() => {
                        navigate(`/cars/${car._id}`)
                    }} type='button' className='text-white bg-gray-800 hover:bg-gray-900 rounded px-4 py-1'>View</button>
                </div>
            </div>
        </div>
    </div>
}

export default MyCars
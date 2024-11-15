import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Appbar from '../Appbar';
import {jwtDecode} from 'jwt-decode';
import { BACKEND_URL } from '../../config';

const Car = () => {
    const { id } = useParams();
    console.log(id)
    const [car, setCar] = useState({}); 
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();

    const getLoggedInUserId = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                return decodedToken.userId;
            } catch (error) {
                console.error('Error decoding token:', error);
                return null;
            }
        }
        return null;
    };
    
    const loggedInUserId = getLoggedInUserId();
    console.log(loggedInUserId)

    const fetchCar = async () =>{
        await axios.get(`${BACKEND_URL}/cars/cars/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        .then(response => {
            setCar(response.data.car);
            setLoading(false);
            // console.log(response.data.car.user);
            // console.log(response.data.car);

            if (response.data.car.user && response.data.car.user === loggedInUserId) {
                setIsOwner(true); 
            }
        })
        .catch(error => {
            console.error('Error fetching car:', error);
            setLoading(false);
        });
    }
    useEffect(() => {
        fetchCar();
    }, []);

    // State for controlling the current image index in the slider
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to move to the next image
    const nextImage = () => {
        if (car?.images && currentImageIndex < car.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        } else {
            setCurrentImageIndex(0); // Loop back to the first image
        }
    };

    // Function to move to the previous image
    const prevImage = () => {
        if (car?.images && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        } else {
            setCurrentImageIndex(car?.images.length - 1); // Loop back to the last image
        }
    };

    // If data is loading, show a loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Appbar />
            <div className="w-[80%] m-auto mt-10 flex">
                {/* Left Side: Image Slider */}
                <div className="w-[50%] mr-10">
                    <div className="relative">
                        <img
                            src={car?.images[currentImageIndex]}
                            alt={car.title}
                            className="w-full h-[400px] object-cover rounded-lg"
                            draggable="false"
                        />
                        <div className="absolute top-[50%] left-2 transform -translate-y-1/2 text-white cursor-pointer bg-gray-300 px-1 rounded-full" onClick={prevImage}>
                        <i class='bx bx-chevron-left text-4xl text-black'></i>
                        </div>
                        <div className="absolute top-[50%] right-2 transform -translate-y-1/2 text-white cursor-pointer bg-gray-300 px-1 rounded-full flex justify-center" onClick={nextImage}>
                        <i class='bx bx-chevron-right text-4xl text-black'></i>
                        </div>
                    </div>
                    {/* Image Thumbnails (optional) */}
                    <div className="flex mt-4 space-x-2">
                        {car?.images?.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`thumbnail ${index}`}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${index === currentImageIndex ? 'border-4 border-blue-500' : ''}`}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Side: Car Details */}
                <div className="w-[50%]">
                    <h1 className="text-3xl font-semibold">{car.title}</h1>
                    <p className="text-lg text-gray-600 mt-2">{car.description}</p>

                    <div className="mt-4">
                        <div className="flex justify-between">
                            <span className="font-medium text-lg">Company:</span>
                            <span className='text-xl'>{car.company}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="font-medium text-lg">Dealer:</span>
                            <span>{car.dealer}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="font-medium text-lg">Price:</span>
                            <span className="text-xl font-semibold">₹{car.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="font-medium text-lg">Car Type:</span>
                            <span>{car.car_type}</span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Tags:</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {car.tags?.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {isOwner && (
                        <div className='mt-4 flex gap-4'>
                        <button onClick={() => {
                                navigate(`/editdetails/${car._id}`);
                            }} type='button' className='text-white bg-blue-700 hover:bg-blue-800 rounded px-4 py-1'>
                            Edit
                        </button>
                        <button onClick={async () => {
                            await axios.delete(`${BACKEND_URL}/cars/cars/${id}`, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            })

                            fetchCar();
                            console.log(car._id);
                        }} type='button' className='text-white bg-red-600 hover:bg-red-700 rounded px-4 py-1'>Delete</button>
                    </div>
                    )}
                    
                </div>
            </div>
        </div>
    );
};

export default Car;

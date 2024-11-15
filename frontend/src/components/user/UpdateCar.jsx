import React, { useEffect, useState } from 'react'
import Appbar from '../Appbar'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

const UpdateCar = () => {
    const {id} = useParams();
    const [carDetails, setCarDetails] = useState({});
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const fetchCarDetails = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/cars/cars/${id}`, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          });
          setCarDetails(response.data.car);
          setImages(response.data.car.images)
          console.log(response.data.car);
          console.log(response.data.car.images)
        } catch (err) {
            console.error('Error fetching car:', err);
        }
      };
    
    useEffect(() => {
        fetchCarDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
    };

    const handleTagChange = (e) => {
        const value = e.target.value;
        setCarDetails((prevDetails) => ({
          ...prevDetails,
          tags: value.split(',').map((tag) => tag.trim()).filter((tag) => tag).join(', '),
        }));
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`${BACKEND_URL}/cars/cars/${id}`,{
              ...carDetails,
              images
            },
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              }
            }
          );
          navigate('/mycars');
        } catch (err) {
          console.error('Error updating car details', err);
        }
    };
  return (
    <div>
        <Appbar />
        <h2 className="text-center text-2xl font-semibold mt-8">Edit Car Details</h2>
        <div className="w-[60%] m-auto mt-4">
            <CarInputs
            carDetails={carDetails}
            setCarDetails={setCarDetails}
            handleInputChange={handleInputChange}
            handleTagChange={handleTagChange}
            handleImageChange={handleImageChange}
            images={images}
            handleRemoveImage={handleRemoveImage}
            handleSave={handleSave}
            navigate={navigate}
            />
        </div>
    </div>
  )
}

function CarInputs({ carDetails, setCarDetails, handleInputChange, handleTagChange, handleImageChange, images, handleRemoveImage, handleSave, navigate }){
    return (
      <div className="border p-4">
        <div>
          <UpdateInput label={"Title"} name="title" value={carDetails.title} onChange={handleInputChange} />
        </div>
        <div>
          <UpdateInput label={"Description"} name="description" value={carDetails.description} onChange={handleInputChange} />
        </div>
        <div className="flex gap-4">
          <div className="w-[33%]">
            <UpdateInput label={"Company"} name="company" value={carDetails.company} onChange={handleInputChange} />
          </div>
          <div className="w-[33%]">
            <UpdateInput label={"Car Type"} name="carType" value={carDetails.car_type} onChange={handleInputChange} />
          </div>
          <div className="w-[33%]">
            <UpdateInput label={"Price"} name="price" value={carDetails.price} onChange={handleInputChange} />
          </div>
        </div>
  
        <div className="flex gap-4">
          <div className="w-[50%]">
            <UpdateInput label={"Dealer"} name="dealer" value={carDetails.dealer} onChange={handleInputChange} />
          </div>
          <div className="w-[50%]">
            <UpdateInput label={"Tags"} name="tags" value={carDetails.tags} onChange={handleTagChange} />
          </div>
        </div>
  
        <div className="mt-4">
          <label className="block mb-2 font-semibold">Upload Images (up to 10)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="p-2 border border-gray-300"
          />
        </div>
  
        <div className="mt-4">
          <h4 className="font-semibold">Current Images</h4>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt="Car"
                  className="w-full h-[120px] object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-1 hover:bg-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM10 16a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
  
        <div className="mt-4 flex justify-between items-end">
          <button
            onClick={handleSave}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 rounded px-4 py-1"
          >Save</button>
        </div>
      </div>
    );
};

function UpdateInput({label, placeholder, onChange, value}){
    return (
        <div>
            <div className='font-medium text-sm text-left py-2'>
                {label}
            </div>
            <input value={value || ""} onChange={onChange} type="text" placeholder={placeholder} className='w-full border rounded border-slate-200 px-2 py-1'/>
        </div>
      )
}
  
export default UpdateCar
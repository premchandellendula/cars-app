import React, { useState } from 'react'
import Appbar from '../Appbar'
import InputBox from '../InputBox'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../../config'

const AddCar = () => {
  return (
    <div>
        <Appbar />
        <h2 className='w-[60%] m-auto mt-8 text-2xl font-semibold'>Add Car</h2>
        <div className='w-[60%] m-auto mt-4'>
            <CarInputs />
        </div>
    </div>
  )
}

function CarInputs(){
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [carType, setCarType] = useState('');
    const [dealer, setDealer] = useState('');
    const [price, setPrice] = useState(0);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    // const handleImageChange = (e) => {
    //     const files = e.target.files;
    //     const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    //     setImages(prevImages => [...prevImages, ...newImages]); // store image file URLs or you can store file objects
    // };

    const handleImageChange = (e) => {
        const selectedFiles = e.target.files;
        const fileArray = Array.from(selectedFiles);
    
        if (fileArray.length + images.length > 10) {
          alert('You can only upload up to 10 images.');
          return;
        }
    
        const newImages = fileArray.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...newImages]);
        setFiles(prevFiles => [...prevFiles, ...fileArray]);
      };

    const handleTagChange = (e) => {
        const value = e.target.value;
        const tagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag); // split by comma and clean up
        setTags(tagsArray); // store tags as an array
        // console.log(tagsArray);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (files.length === 0) {
            alert("Please select at least one image.");
            return;
        }

        const imageUrls = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append("file", files[i]);
                formData.append("upload_preset", "car-app");
    
                // Upload the image to Cloudinary
                const response = await axios.post("https://api.cloudinary.com/v1_1/premcel9/image/upload", formData);
                
                // Get the URL of the uploaded image
                imageUrls.push(response.data.secure_url);
            }

            const response = await axios.post(`${BACKEND_URL}/cars/car`, {
                title,
                description,
                car_type: carType,
                company,
                dealer,
                price,
                images: imageUrls,
                tags
            }, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
              },
            });
      
            console.log("Car added successfully", response.data);
            // Optionally redirect or clear the form
            navigate('/mycars')
        }catch (error) {
          console.error("Error adding car", error);
        }

    }

    return <div className='border p-4'>

        <div>
            <InputBox onChange={(e) => {
                setTitle(e.target.value);
            }} label={"Title"} placeholder={"Enter the title"} />
        </div>
        <div>
            <InputBox onChange={(e) => {
                setDescription(e.target.value);
            }} label={"Description"} placeholder={"Enter the Description"} />
        </div>
        <div className='flex gap-4'>
            <div className='w-[33%]'>
            <InputBox onChange={(e) => {
                setCompany(e.target.value);
            }} label={"Company"} placeholder={"Audi"} />

            </div>
            <div className='w-[33%]'>

            <InputBox onChange={(e) => {
                setCarType(e.target.value);
            }} label={"Car Type"} placeholder={"Sedan, SUV, etc.,"} />
            </div>
            <div className='w-[33%]'>
            <InputBox onChange={(e) => {
                setPrice(e.target.value);
            }} label={"Price"} placeholder={6400000} />

            </div>
        </div>

        <div className='flex gap-4'>
            <div className='w-[50%]'>

            <InputBox onChange={(e) => {
                setDealer(e.target.value);
            }} label={"Dealer"} placeholder={"Enter your dealer"} />
            </div>
            <div className='w-[50%]'>

            <InputBox label={"Tags"} placeholder={"luxury, electric, sedan, etc.,"} onChange={handleTagChange} />
            </div>
        </div>

        <div className="mt-4 flex justify-between items-end">
            <div>
                <label className="block mb-2 font-semibold">Upload Images (up to 10)</label>
                <input 
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="p-2 border border-gray-300"
                />
            </div>
                <button onClick={handleSubmit} type='button' className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none h-10 rounded-lg font-medium text-md w-20 text-center items-end'>Add</button>
        </div>
            <div className="mt-4">
                {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                        {images.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={`preview ${index}`} className="w-20 h-20 object-cover" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

        <div className='flex justify-end items-end'>

        </div>
    </div>
}

export default AddCar;
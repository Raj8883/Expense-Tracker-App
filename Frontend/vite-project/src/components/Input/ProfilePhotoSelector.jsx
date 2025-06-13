import React, { useRef, useState } from 'react'
import Input from './Input';

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const handleImageChnage = (event) => {

        const file = event.target.files[0];
        if (file) {
            setImage(file);

            const preview = URl.createObjectURl(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemove = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.Click();
    }

    return (
        <div className='flex justify-center mb-6'>
            <input 
            type= 'file'
            accept='image/*'
            ref={handleImageChnage}
            className='hidden'
            />

            {!image ? (
                <div className='w-28  h-2 flex items-center justify-center bg-purple-100 rounded-full relative'>
                    <LuUser className="text-4xl text-purple-400"/>
                    <button
                    type="button"
                    className='w-8 h-8 flex items-center justify-center bg-purple-400 text-white rounded-full absolute -bottom-1 -right-1'
                    onClick={onChooseFile}>

                    <LuUpload />
                    </button>
                </div>
            ):(
                <div>
                    <img src={previewUrl} alt="Profile photo" className='' />
                    <button type="button" className=''onClick={handleRemove}></button>
                </div>
            )}

        </div>
    )
}

export default ProfilePhotoSelector

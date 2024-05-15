import React, { useState } from "react";
import "./create.css";
import { IoIosAddCircleOutline } from "react-icons/io";

export const Create = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
          <div className='img'>
            {imagePreview ? (
              <img src={imagePreview} alt='Preview' className='image-preview' />
            ) : (
              <div className='image-placeholder'>
                <IoIosAddCircleOutline />
                <span>Upload Image</span>
              </div>
            )}
          </div>
          <form>
            <div className='inputfile flexCenter'>
              <input
                type='file'
                accept='image/*'
                alt='img'
                onChange={handleImageChange}
              />
            </div>
            <input type='text' placeholder='Title' />

            <textarea name='' id='' cols='30' rows='10'></textarea>

            <button className='button'>Create Post</button>
          </form>
        </div>
      </section>
    </>
  );
};

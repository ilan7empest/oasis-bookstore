import React, { useRef, useState, useEffect } from 'react';

import classes from './ImagePicker.module.css';

const ImagePicker = ({ onChange }) => {
  const [file, setFile] = useState();
  const [previewURL, setPreviewURL] = useState();

  const InputEl = useRef();

  useEffect(() => {
    if (!file) {
      return;
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewURL(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const handleOnClick = () => {
    InputEl.current.click();
  };

  const handleOnChange = (e) => {
    let pickedFile;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      onChange(pickedFile);
    }
  };

  return (
    <>
      <div className={`ui right labeled input w-100 ${classes.imagePicker}`}>
        <label htmlFor='chooseFile' className='ui label'>
          Choose File
        </label>
        <input
          type='text'
          placeholder={file ? file.name : 'No file chosen'}
          id='chooseFile'
          onClick={handleOnClick}
        />
        <label className={`ui tag label ${classes.tag}`}>Upload</label>
        <input
          ref={InputEl}
          type='file'
          id=''
          name=''
          accept='.jpg,.jpeg,.png,.gif'
          style={{ display: 'none' }}
          onChange={handleOnChange}
        />
      </div>
      {previewURL && (
        <div className='my-2'>
          <img
            src={previewURL}
            alt='Preview'
            className='ui medium rounded bordered image'
          />
        </div>
      )}
    </>
  );
};

export default ImagePicker;

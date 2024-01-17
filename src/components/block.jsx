import React, { useState } from 'react';
import TextButton from './button';

const Block = ({ type, onAddBlockAbove, onAddBlockBelow, onDeleteBlock }) => {
  // const [content, setContent] = useState('');

  // const handleContentChange = (e) => {
  //   setContent(e.target.value);
  // };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setContent(data.imageUrl);
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  };

  const [content, setContent] = useState('');
  const [style, setStyle] = useState({ fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none' });

  const toggleBold = () => {
    setStyle((prevStyle) => ({
      ...prevStyle,
      fontWeight: prevStyle.fontWeight === 'normal' ? 'bold' : 'normal',
    }));
  };

  const toggleItalic = () => {
    setStyle((prevStyle) => ({
      ...prevStyle,
      fontStyle: prevStyle.fontStyle === 'normal' ? 'italic' : 'normal',
    }));
  };

  const toggleUnderline = () => {
    setStyle((prevStyle) => ({
      ...prevStyle,
      textDecoration: prevStyle.textDecoration === 'none' ? 'underline' : 'none',
    }));
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const addBlockAbove = () => {
    onAddBlockAbove(type);
  };

  const addBlockBelow = () => {
    onAddBlockBelow(type);
  };

  

  return (
    <div className="border border-gray-300 p-4 mb-4 md:w-auto">
      {type === 'text' ? (
        <>
          <div className="flex mb-2 flex-col" >
          <div className='flex gap-2'>
        <button onClick={toggleBold} className='font-bold border-2 text-xl border-black'>BOLD</button>
        <button onClick={toggleItalic} className='italic border-2 text-xl border-black'>ITALIC</button>
        <button onClick={toggleUnderline} className='underline border-2 text-xl border-black'>UNDERLINE</button>
      </div>
      <div
        style={{
          fontWeight: style.fontWeight,
          fontStyle: style.fontStyle,
          textDecoration: style.textDecoration,
          minHeight: '100px',
          padding: '10px',
          border: '1px solid #ccc',
        }}
        className='font-times-new-roman text-base'
      >
        {content}
      </div>
      <textarea
        className="w-full h-24 p-2 border border-gray-300 rounded font-times-new-roman text-base"
        placeholder="Enter text (max 250 words)"
        value={content}
        onChange={handleContentChange}
      />
      </div>
          <div className="flex justify-between mt-2">
            <TextButton onClick={addBlockAbove} label="Add Block Above" color='black' />
            <TextButton onClick={addBlockBelow} label="Add Block Below" color='black' />
          </div>
        </>
      ) : (
        <>
          <img src={content} alt="Uploaded" className="max-w-full max-h-64 mb-2" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-2"
          />
          <div className="flex justify-between mt-2">
            <TextButton onClick={addBlockAbove} label="Add Block Above" color='black' />
            <TextButton onClick={addBlockBelow} label="Add Block Below" color='black' />
          </div>
        </>
      )}
      <div className="flex justify-end mt-2">
        <TextButton onClick={onDeleteBlock} label="Delete Block" color="black" />
      </div>
      
    </div>
    
  );
};

export default Block;

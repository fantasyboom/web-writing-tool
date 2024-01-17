import React, { useState } from 'react';
import TextButton from './components/button';
import Block from './components/block';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [textBlockCount, setTextBlockCount] = useState(0);
  const [picBlockCount, setPicBlockCount] = useState(0);
  const [addBlockClick, setAddBlockClick] = useState(false);
  const [blocks, setBlocks] = useState([]);

  const addBlock = (type) => {
    const newBlock = { id: uuidv4(), type };
    setBlocks([...blocks, newBlock]);
  };

  const deleteBlock = (id) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const addBlockAbove = (id, type) => {
    const index = blocks.findIndex((block) => block.id === id);
    if (index !== -1) {
      const newBlock = { id: uuidv4(), type };
      setBlocks((prevBlocks) => [
        ...prevBlocks.slice(0, index),
        newBlock,
        ...prevBlocks.slice(index),
      ]);
    }
  };

  const addBlockBelow = (id, type) => {
    const index = blocks.findIndex((block) => block.id === id);
    if (index !== -1) {
      const newBlock = { id: uuidv4(), type };
      setBlocks((prevBlocks) => [
        ...prevBlocks.slice(0, index + 1),
        newBlock,
        ...prevBlocks.slice(index + 1),
      ]);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center flex-col '>
      <div>
        <TextButton color='black'
          onClick={() => setAddBlockClick(true)}
          label="Add block"
          style="m-2"
        />
      </div>
      <div>
        {addBlockClick ? (
          <div className='flex'>
            <TextButton color='black'
              onClick={() => {
                setTextBlockCount((prev) => prev + 1);
                addBlock('text');
                setAddBlockClick(false);
              }}
              label="Text Block"
            />
            <TextButton color='black'
              onClick={() => {
                setPicBlockCount((prev) => prev + 1);
                addBlock('img');
                setAddBlockClick(false);
              }}
              label="Image Block"
            />
          </div>
        ) : null}
      </div>
      <ul>
        {blocks.map((block) => (
          <Block
            key={block.id}
            type={block.type}
            onAddBlockAbove={(type) => addBlockAbove(block.id, type)}
            onAddBlockBelow={(type) => addBlockBelow(block.id, type)}
            onDeleteBlock={() => deleteBlock(block.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;

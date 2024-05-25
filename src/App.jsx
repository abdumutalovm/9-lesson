import React, { useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import add from './assets/add-square.svg';
import Column from './components/Column';

function App() {
  const [columns, setColumns] = useState([]);
  const refs = useRef({});

  const handleAdd = () => {
    const id = columns.length + 1;
    setColumns([...columns, { id, content: `Ustun ${id}` }]);
    refs.current[id] = { name: React.createRef(), key: React.createRef() };
  };

  const moveColumn = (fromIndex, toIndex) => {
    const updatedColumns = Array.from(columns);
    const [movedColumn] = updatedColumns.splice(fromIndex, 1);
    updatedColumns.splice(toIndex, 0, movedColumn);
    setColumns(updatedColumns);
  };

  const handleSave = () => {
    Object.keys(refs.current).forEach((id) => {
      const nameValue = refs.current[id].name.current.value;
      const keyValue = refs.current[id].key.current.value;
      console.log(`Column ${id}:`, { name: nameValue, key: keyValue });
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='max-w-screen-2xl w-[1360px] p-4 container mx-auto flex items-center flex-col gap-3'>
        <div className='w-full rounded-xl border bg-[#F8F8F8] p-6'>
          <h1 className='font-semibold text-2xl mb-6'>Loyiha ketma-ketligi</h1>
          {columns.map((column, index) => (
            <Column
              nameRef={refs.current[column.id]?.name}
              keyRef={refs.current[column.id]?.key}
              key={column.id}
              id={column.id}
              index={index}
              moveColumn={moveColumn}
            />
          ))}
          <div className='flex items-center justify-between'>
            <button onClick={handleAdd} className='transition flex items-center gap-2 cursor-pointer hover:opacity-70'>
              <img src={add} alt="column add icon" />
              <h1 className='text-[#0062FF] font-medium'>Ustun qo’shish</h1>
            </button>

            <button onClick={handleSave} className='transition bg-[#0062FF] text-white px-6 rounded py-1 hover:opacity-70'>Saqlash</button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;

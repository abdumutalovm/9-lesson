import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import menu from '../assets/menu.svg';

const ItemType = 'COLUMN';

const Column = ({ id, index, moveColumn, nameRef, keyRef }) => {
    const [, ref] = useDrag({
        type: ItemType,
        item: { id, index },
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveColumn(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <div ref={(node) => ref(drop(node))} className='flex items-center gap-4 mb-6'>
            <div className='flex items-center gap-4'>
                <img src={menu} alt="menu icon" className='cursor-pointer' />
                <div className='flex flex-col'>
                    <label htmlFor={`name_col_${id}`} className='text-base font-semibold mb-3'>Ustun nomi</label>
                    <input
                        type="text"
                        id={`name_col_${id}`}
                        placeholder='Ustun nomi'
                        ref={nameRef}
                        className='px-4 py-3.5 w-[610px] outline-none border rounded'
                    />
                </div>
            </div>
            <div className='flex flex-col'>
                <label htmlFor={`key_${id}`} className='text-base font-semibold mb-3'>Key</label>
                <input
                    type="text"
                    id={`key_${id}`}
                    placeholder='Key'
                    ref={keyRef}
                    className='px-4 py-3.5 w-[610px] outline-none border rounded'
                />
            </div>
        </div>
    );
};

export default Column;

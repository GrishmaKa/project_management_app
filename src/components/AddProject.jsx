import { useRef, useState, forwardedRef, useImperativeHandle } from 'react';
import Input from './Input.jsx';
import Modal from './Modal.jsx';

export default function AddProject({ onAdd, onCancel }) {
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();
    const modal = useRef();


    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;
        if (enteredTitle.trim() === '' || enteredDescription === '' || enteredDueDate.trim() === '') {
            modal.current.open(); return;
        }
        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
        });
    }
    return (
        <>
            <Modal ref={modal} buttonCaption="Close">
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">Oops... You missed out on some fields.</p>
                <p className="text-stone-600 mb-4">Please make sure to fill out all fields before saving.</p>
            </Modal>
            <div className='w-[35rem] mt-16'>
                <menu className='flex items-center justify-end gap-4 my-4 '>
                    <li><button className='text-stone-800 hover:text-stone-950' onClick={onCancel}>Cancel</button></li>
                    <li><button className='bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md' onClick={handleSave}>Submit</button></li>
                </menu>
                <div>
                    <Input ref={title} label="Title" type="text" id="title" />
                    <Input ref={description} label="Description" id="description" textArea />
                    <Input ref={dueDate} label="Due Date" type="date" id="duedate" />
                </div>
            </div>
        </>
    );
}
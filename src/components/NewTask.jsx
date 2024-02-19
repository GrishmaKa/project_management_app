import { useState } from 'react';

export default function NewTask({ onAdd }) {
    const [newTask, setNewTask] = useState('');

    function handleChange(e) {
        setNewTask(e.target.value);
    }

    function handleClick() {
        if (newTask.trim() === '') {
            return;
        }
        onAdd(newTask);
        setNewTask('');
    }

    return (
        <div className="flex item-center gap-4">
            <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" onChange={handleChange} value={newTask} />
            <button className="text-stone-700 hover:text-stone-950" onClick={handleClick}>Add Task</button>
        </div>
    );
}
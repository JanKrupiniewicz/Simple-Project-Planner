import { useState, useRef } from "react";
import Modal from "../Modal";

export default function NewTask({ onAdd }) {
    const modal = useRef();
    const [enteredTask, setEnteredTask] = useState('');

    function handleChange(event) {
        setEnteredTask(event.target.value);
    }

    function handleClick() {
        if(enteredTask.trimEnd() === '') {
            modal.current.open();
            return;
        }
        onAdd(enteredTask);
        setEnteredTask('');
    }

    return (
        <>
            <Modal buttonCaption="Close" ref={modal}>
                <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Input</h2>
                <p className='text-stone-600 mb-4'>Don't forget to add the value.</p>
            </Modal>
            <div className="flex items-center gap-4">
                <input 
                    onChange={handleChange}
                    value={enteredTask}
                    type="text" 
                    className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                    />
                <button onClick={handleClick} className="text-stone-700 hover:text-stone-950">Add Task</button>
            </div>
        </>
    );
}

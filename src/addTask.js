import './App.css';
import './addTask.css';
import { useNavigate,Link } from 'react-router-dom';
import { useState } from 'react';
import {DatePicker} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
  
const AddTask = ({addTask}) => {
    const[taskName,setTaskName] = useState("");
    const[des,setDes] = useState("");
    const [date,setDate] = useState(new Date());
    const navigate = useNavigate();

    const handleSubmit = (event) => { 
        event.preventDefault(); {/*it stops the page from reloading and lets the website use the data to print new task*/}
        
        const day = date.getDate();
        const month = date.toLocaleString('default',{month:'short'});
        {/*const year = date.getFullYear();*/}
        const dayName = date.toLocaleString('default',{weekday:'short'});
        //const format = `${dayName} , ${day}-${month}`;
        const dateForm = date.toISOString();

        addTask(taskName,des,dateForm);
        setTaskName("");
        setDes("");
        setDate(new Date());
        navigate('/');
    };

    return(
        <div className = "newTask">
            <div className='navigate'>
                <Link to="/" style={{color:"white", textDecoration:"none"}}>Back to Home</Link>
                <Link to="/focus" style={{color:"white", textDecoration:"none"}}>Focus Timer</Link>
            </div>
            <div className="form">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="taskName" >Task Name : </label>
                        <input
                        type="text"
                        id="taskName"
                        value={taskName}
                        onChange = {(e) => setTaskName(e.target.value)}
                        placeholder="Enter task name"
                        required
                        />

                        <label htmlFor="taskDescription">Description : </label>
                        <textarea
                        id="taskDescription"
                        value={des}
                        onChange = {(e) => setDes(e.target.value)}
                        placeholder="Enter Description of the task"
                        rows="6"
                        />

                        <label htmlFor="dueDate">Date : </label>
                        <DatePicker
                            selected={date}
                            onChange={(selectedDate)=>setDate(selectedDate)}
                            dateFormat={"dd/MM/yyyy"}
                            minDate={new Date()}
                        />

                        <button type="submit">Create Task</button>
                        <button type="button" onClick={()=>{
                            navigate('/');
                        }}>Cancel</button>
                    </form>
            </div>
        </div>
    );
}

export default AddTask;
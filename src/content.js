import {FaAngleDown ,FaAngleUp, FaTrashAlt } from 'react-icons/fa';
import './App.css'
import { Link } from 'react-router-dom';
import emptyListImage from './emptyList.png';
import { useState} from 'react';


const ToDoList = ({List,deleteTask,fetchError,isLoading,handleComplete}) => {
    const [showDesc,setShowDesc] = useState(null);
    const showDescription = (id) => {
       setShowDesc(preState => (preState === id ? null : id)); {/*pre state is used to update state by checking if it is matching id*/}
   
    };

    const displayDate = (rawDate)=>{
        const dateObj = rawDate.toDate?rawDate.toDate():new Date(rawDate);
        return dateObj.toLocaleString('en-IN',{
            weekday:'short',
            day:'numeric',
            month:'short',
            timeZone:'Asia/Kolkata'
        });
    };

 return (
    <>
    <div className="navigate">
       <Link to="/add" style={{color:"white", textDecoration:"none"}}>
                Create Task
      </Link > 
      <Link to = "/focus" style={{color:"white" , textDecoration:"none"}}>
                Focus Timer
      </Link> 
    </div>
      
      <Content
            List={List}
            deleteTask={deleteTask}
            showDesc={showDesc}
            showDescription={showDescription}
            displayDate={displayDate}
            fetchError={fetchError}
            isLoading={isLoading}
            handleComplete={handleComplete}
        />
    </>
    );
}


function Content({List,deleteTask,showDesc,showDescription,fetchError,isLoading,handleComplete,displayDate}){

    const sortedList = [...List].sort((a, b) => {
        // Handle if date is a Firebase Timestamp or a Date object/string
        const dA = new Date(a.Date).getTime();
        const dB = new Date(b.Date).getTime();
        return dA - dB; // Sorts earliest date to latest date
    });

    return (
    <div className = "content">
     <div className = "list">
        {fetchError && <p align="center">{'Error : '+fetchError}</p>}
        {sortedList.length ? (
            <ul>
                {!fetchError && sortedList.map((t) => (  
                <li className="listItem" key={t.id}>
                    <div className='task-main'>
                        <div className='heading'>
                          <input type="checkbox" checked={t.Completed} onChange={()=>handleComplete(t.id,t.Completed)} className='checkbox'/>  
                          <div className={`taskName ${t.Completed ? 'completed' : ''}`} style={{display:'flex', flexDirection:'row',gap:'30px'}}>
                            <p >{t.Task}</p>
                            <p className='dueDate'>{displayDate(t.Date)}</p>
                          </div>
            
                            {showDesc === t.id ? 
                        <FaAngleUp className='showDes' onClick={() => showDescription(t.id)}></FaAngleUp>  :
                        <FaAngleDown className='showDes' onClick={() => showDescription(t.id)}></FaAngleDown>  
                        }
                    </div>
                        {showDesc === t.id && (
                                <p>{t.Description}</p>
                            )}
                    </div>
                    <FaTrashAlt role="button" className = "DeleteButton" onClick={() => deleteTask(t.id)}></FaTrashAlt>
                </li>
            ))}
            </ul>  
        ) : (<div className="status-container">
            {isLoading ? (
                <div className="loading-screen">
                    <p style={{color:"white", textAlign:"center",fontSize:"20px",fontWeight:"bolder"}}>LOADING...</p>
                </div>
                ) : (
                <div className="empty-state">
                    <img src={emptyListImage} alt="Add tasks" className="empty-img" />
                </div>
             )}
    </div>
        ) }
      </div>
     </div> 
    );
}
export default ToDoList;

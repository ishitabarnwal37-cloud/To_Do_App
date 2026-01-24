import './App.css';
import Day from './bgDay.jpg';
import Night from './bgNight.jpg';
import AddTask from './addTask.js';
import ToDoList from './content.js';
import FocusTimer from './timer.js';
import { useState,useEffect} from 'react';
import {Routes,Route} from 'react-router-dom';
import { db } from './firebase';
import { ref, onValue, push, set, remove,update } from "firebase/database";

function App() {
    const [List,updateList] = useState(() => {return []});  {/*condition in asynchronous function to return a savedList or to show a empty array in List*/}
    const [fetchError,setFetchError] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [currentTime,setCurrentTime] = useState(new Date())

    useEffect(()=>{
        const taskRef = ref(db,'task/');
        const unsubscribe = onValue(taskRef,(snapshot)=>{
            try{
                const data = snapshot.val();
                console.log("1. Raw Data from Firebase:", data);
                if(data){
                    const listA = Object.keys(data).map(key=>({
                        id:key,
                        ...data[key]
                    }));
                    console.log("2. Formatted Array:", listA);
                    updateList(listA);
                }
                else{
                    console.log("3. Database is empty or path 'tasks/' is wrong");
                    updateList([]);
                }
                setFetchError(null);
            }
            catch(err){
                setFetchError("Firebase error : "+err.message);
            }
            finally{
                setIsLoading(false);
            }
        });
        return ()=>unsubscribe();
    },[]);

    useEffect(()=>{
        const timer = setInterval(()=>{
            setCurrentTime(new Date());
        },6000);
        return ()=>clearInterval(timer);
    },[]);

    const currentHour  = currentTime.getHours();
    console.log(currentHour);
    const isNight = (currentHour>=18 || currentHour<5);
    const bgStyle={
            backgroundImage: `url(${isNight ? Night : Day})`, 
            backgroundSize:'cover', // 
            backgroundRepeat: 'no-repeat', 
            minHeight: '100vh', 
            width: '100%',
            backgroundAttachment:'fixed',
            transition:'background-image 0.5s ease-in-out'
        }; 

    const addTask = async(name,description,date)=>{
        try{
            const taskRef = ref(db,'task/');
            const newTaskRef = push(taskRef);
            await set(newTaskRef,{
                Task:name,
                Description:description,
                Date:date,
                Completed:false
            });
        }
        catch(err){
            setFetchError("failed to add new task, try again :(");
        }
    };

    const handleComplete = async(id,complete)=>{
        try{
            const taskRef = ref(db,`task/${id}`)
            await update(taskRef,{
                Completed:!complete
            });
        }
        catch (err) {
        setFetchError("Failed to update task status.");
    }
    };

    const deleteTask = async(idToDelete)=>{
        try{
            const taskRef = ref(db,`task/${idToDelete}`);
            await remove(taskRef);
        }
        catch(err){
            setFetchError("Failed to delete task. Sorry :(");
        }
    };

  return (
    <div className="App" style={bgStyle}>
      <header className = "header">
        Hello there!
       </header>
       <Routes>
        <Route path = "/" element = {<ToDoList
                                          List={List}
                                          deleteTask={deleteTask}
                                          fetchError = {fetchError}
                                          isLoading = {isLoading}
                                          handleComplete={handleComplete}/>}
                                          />
        <Route path = "/add" element = {<AddTask addTask={addTask}/>}/>
        <Route path = "/focus" element = {<FocusTimer/>}/>
       </Routes>
       <footer className="footer">Ishita Barnwal</footer>
    </div>
  );
}

export default App;

import React from 'react'
import { Link } from 'react-router-dom'
import TopNavigation from './TopNavigation'
import { useDispatch } from 'react-redux'

function TasksGiven() {

  let dispatch=useDispatch()
  return (
    <div className="App">
        <TopNavigation></TopNavigation>
        <h1>Welcome To Tasks</h1>
        <button type="button" onClick={()=>{
          dispatch({type:"addTask",data:1})
        }}>AddTask</button>

        <button type="button" onClick={()=>{
          dispatch({type:"submitTask",data:2})
        }}>Submit Task</button>

        <button type="button" onClick={()=>{
          dispatch({type:"deleteTask",data:3})
        }}>Delete Task</button>

        <Link to="/tasks"></Link>
    </div>
  )
}

export default TasksGiven
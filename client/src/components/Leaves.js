import React from 'react'
import TopNavigation from './TopNavigation'
import { useDispatch } from 'react-redux'

function Leaves() {
  let dispatch=useDispatch();
  return (
    <div className="App">
        <TopNavigation></TopNavigation>
        <h1>Welcome to Leaves</h1>
        <button type="button" onClick={()=>{
          dispatch({type:"applyLeave",data:1})
        }}>Apply Leave</button>

        <button type="button" onClick={()=>{
          dispatch({type:"postponeLeave",data:2})
        }}>Pospone Leave</button>

        <button type="button" onClick={()=>{
          dispatch({type:"cancelLeave",data:3})
        }}>Cancel Leave</button>
    </div>
  )
}

export default Leaves
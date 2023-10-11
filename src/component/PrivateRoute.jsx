import React,{useEffect} from 'react'
import {  useNavigate } from 'react-router-dom'

function PrivateRoute(props) {
    const {Component} = props 
    const navigate = useNavigate()

    useEffect(()=>{
        let data = localStorage.getItem("login")
       
        if(!data){
            navigate('/login')
        }
    })
  return (
    <div>
          <Component/>
    </div>
  )
}

export default PrivateRoute
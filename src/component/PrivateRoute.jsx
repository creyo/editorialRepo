import React,{useEffect} from 'react'
import {  useNavigate } from 'react-router-dom'

function PrivateRoute(props) {
    const {Component} = props 
    const navigate = useNavigate()

    useEffect(()=>{
       let data1 = localStorage.getItem("sb-narivuecshkbtcueblcl-auth-token")
       if(!data1){
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
import React from 'react'
import SideBar from './SideBar'
import {Route, Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux'


const Protected = (props) => {
  const token = useSelector(state => state.user.token)
    return (
      <Route
        render={props => {
          if (token|| localStorage.getItem("token")) {
            return(
              <SideBar {...props} />
            )
            
          }
          return(
            <Redirect to={
              {
                  pathname:'/login',
                  state:props.location
              }
          } />
          )
        }}
      />
    );
  };
export default  Protected
import React from 'react'
import SideBar from './SideBar'
import {Route, Redirect} from 'react-router-dom'


const Protected = (props) => {
    return (
      <Route
        render={props => {
          if (2===2) {
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
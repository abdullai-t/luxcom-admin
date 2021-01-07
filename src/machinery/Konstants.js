
import Home from './../pages/home/Home';
import Profile from './../pages/auth/Profile';
import Rooms from './../pages/rooms/Rooms';
import Services from './../pages/services/Services';
import Staff from './../pages/staff/Staff';
import Reservations from './../pages/reservation/Reservations';
import Messaging from './../pages/Messaging/Messaging';
import News from '../pages/news/News';
import Finances from '../pages/finances/Finances';


// ======= pure constants================
export const SAVE_USER_DATA_TO_STATE = "SAVE_USER_DATA_TO_STATE"
export const SAVE_DASHBOARD_DATA_TO_STATE = "SAVE_DASHBOARD_DATA_TO_STATE"

const DOMAIN = "https://luxcom-web-api.herokuapp.com"

export const LOGIN_URL = DOMAIN+"/api/auth/admin-login/"
export const REGISTER_URL = DOMAIN+"/api/auth/manager/"
export const CREATE_STAFF_URL = DOMAIN+"/api/auth/create-staff/"
export const CHANGE_PASSWORD_URL = DOMAIN+"/api/auth/password/change/"
export const DASHBOARD_FULL_DATA_URL = DOMAIN+"/api/reservation/dashboard/"
export const GET_USER_PROFILE_URL = DOMAIN+"/api/auth/profile/"
export const SAVE_ROOM_TO_BACKEND_URL = DOMAIN+"/api/reservation/create/room/"
export const SAVE_SERVICE_TO_BACKEND_URL = DOMAIN+"/api/reservation/create/service/"
export const DELETE_SERVICE_FROM_BACKEND_URL = DOMAIN+"/api/reservation/delete/service/"
export const SAVE_SERVICE_EDIT_TO_BACKEND_URL = DOMAIN+"/api/reservation/update/service/"
export const DELETE_ROOM_FROM_BACKEND_URL = DOMAIN+"/api/reservation/delete/room/"
export const SAVE_ROOM_EDIT_TO_BACKEND_URL = DOMAIN+"/api/reservation/update/room/"
export const DELETE_RESERVATION_URL = DOMAIN+"/api/reservation/delete/reservation/"
export const GENERIC_MESSAGING_URL = DOMAIN+"/api/reservation/send/message/"
export const DELETE_ONE_QUERY_URL = DOMAIN+"/api/reservation/delete/query/"
export const DELETE_WHOLE_TABLE_URL = DOMAIN+"/api/reservation/delete/table/"
export const DELETE_STAFF_URL= DOMAIN+"/api/auth/delete/staff/"
export const DELETE_USER_URL= DOMAIN+"/api/auth/delete/user/"
export const ADD_NEWS_URL = DOMAIN+"/api/news/add/"
export const DELETE_A_NEWS_URL = DOMAIN+"/api/news/delete/"
export const UPDATE_NEWS_URL= DOMAIN+"/api/news/update/"










export const Routes = [
    {
      sidebarName: 'Dashboard',
      component: <Home />
    },
    {
      sidebarName: 'Rooms',
      component: <Rooms/>,
    },
    {
      sidebarName: 'Services',
      component: <Services/>,
    },
    {
      sidebarName: 'Reservations',
      component: <Reservations/>,
    },
    {
      sidebarName: 'Messaging',
      component: <Messaging/>,
    },
    {
      sidebarName: 'News',
      component: <News/>,
    },
    {
      sidebarName: 'Personnel',
      component: <Staff/>,
    },
    {
      sidebarName: 'Settings',
      component: <Profile/>,
    },
  ];

  export const AccountantRoutes = [
    {
      sidebarName: 'Dashboard',
      component: <Home />
    },

    {
      sidebarName: 'Finance',
      component: <Finances/>,
    },
    {
      sidebarName: 'Settings',
      component: <Profile/>,
    },
  ];
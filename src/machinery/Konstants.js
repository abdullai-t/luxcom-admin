
import Home from './../pages/home/Home';
import Profile from './../pages/auth/Profile';
import Rooms from './../pages/rooms/Rooms';
import Services from './../pages/services/Services';
import Staff from './../pages/staff/Staff';
import Reservations from './../pages/reservation/Reservations';
import Messaging from './../pages/Messaging/Messaging';


// ======= pure constants================
export const SAVE_USER_DATA_TO_STATE = "SAVE_USER_DATA_TO_STATE"
export const SAVE_DASHBOARD_DATA_TO_STATE = "SAVE_DASHBOARD_DATA_TO_STATE"

// ========== Url constants ==========
export const LOGIN_URL = "http://127.0.0.1:8000/api/auth/admin-login/"
export const REGISTER_URL = "http://127.0.0.1:8000/api/auth/staff/"
export const CHANGE_PASSWORD_URL = "http://127.0.0.1:8000/api/auth/password/change/"
export const DASHBOARD_FULL_DATA_URL = "http://127.0.0.1:8000/api/reservation/dashboard/"
export const GET_USER_PROFILE_URL = "http://127.0.0.1:8000/api/auth/profile/"
export const SAVE_ROOM_TO_BACKEND_URL = "http://127.0.0.1:8000/api/reservation/create/room/"
export const SAVE_SERVICE_TO_BACKEND_URL = "http://127.0.0.1:8000/api/reservation/create/service/"
export const DELETE_SERVICE_FROM_BACKEND_URL = "http://127.0.0.1:8000/api/reservation/delete/service/"
export const SAVE_SERVICE_EDIT_TO_BACKEND_URL = "http://127.0.0.1:8000/api/reservation/update/service/"
export const DELETE_ROOM_FROM_BACKEND_URL = "http://127.0.0.1:8000/api/reservation/delete/room/"
export const SAVE_ROOM_EDIT_TO_BACKEND_URL = "http://127.0.0.1:8000/api/reservation/update/room/"
export const DELETE_RESERVATION_URL = "http://127.0.0.1:8000/api/reservation/delete/reservation/"









const Routes = [
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
      sidebarName: 'Staff',
      component: <Staff/>,
    },
    {
      sidebarName: 'Settings',
      component: <Profile/>,
    },
  ];
  export default Routes;
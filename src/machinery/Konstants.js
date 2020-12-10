
import Home from './../pages/home/Home';
import Profile from './../pages/auth/Profile';
import Rooms from './../pages/rooms/Rooms';
import Services from './../pages/services/Services';
import Staff from './../pages/staff/Staff';

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
      sidebarName: 'Staff',
      component: <Staff/>,
    },
    {
      sidebarName: 'Settings',
      component: <Profile/>,
    },
  ];
  export default Routes;
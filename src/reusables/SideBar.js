import React from "react";
import img from "../logo.svg";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  Toolbar,
  Typography,
  makeStyles,
  useTheme,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/DashboardSharp";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import SettingsIcon from "@material-ui/icons/SettingsRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MeetingRoomTwoToneIcon from "@material-ui/icons/MeetingRoomTwoTone";
import RoomServiceTwoToneIcon from "@material-ui/icons/RoomServiceTwoTone";
import DirectionsRunTwoToneIcon from "@material-ui/icons/DirectionsRunTwoTone";
import EventSeatTwoToneIcon from "@material-ui/icons/EventSeatTwoTone";
import MessageIcon from '@material-ui/icons/Message';
import Routes from "./../machinery/Konstants";
import { useDispatch } from "react-redux";
import { saveUserInfoInStateAction } from "../machinery/actions";


const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `100%`,
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    // backgroundColor:' #121212 ',
    // color:"white"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  grow: {
    flexGrow: 1,
  },
  left: {
    marginRight: 10,
  },

  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  listItem: {
    marginTop: "6%",
  },
}));

function SideBar({ component: Component, ...rest }) {
  const { window } = { ...rest };
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [, setAnchorEl] = React.useState(null);
  const [, setMobileMoreAnchorEl] = React.useState(null);
  const [index, setIndex] = React.useState(0);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch();

  const menuId = "primary-search-account-menu";
  const icons = [
    <DashboardIcon />,
    <MeetingRoomTwoToneIcon />,
    <RoomServiceTwoToneIcon />,
    <EventSeatTwoToneIcon />,
    <MessageIcon />,
    <DirectionsRunTwoToneIcon />,
    <SettingsIcon />,
  ];


  const logout = () => {
    localStorage.removeItem("token");
    dispatch(
      saveUserInfoInStateAction({
        user: {},
        token: "",
      })
    )
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {Routes.map((route, index) => {
          return (
            <ListItem
              button
              onClick={() => setIndex(index)}
              className={classes.listItem}
            >
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={route.sidebarName} />
            </ListItem>
          );
        })}

        <ListItem button className={classes.listItem} onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ background: "#2E3B55" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Luxcom Hotel Admin Area
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar alt="avatar" src={img} className={classes.left} />
              <Typography variant="h6" noWrap>
                Tachyon
              </Typography>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              // aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {Routes[index].component}
      </main>
    </div>
  );
}

export default SideBar;


import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material'
import {  AccessTime, AccountBox, Article, DarkMode, Groups, Handshake, Home, Logout, Settings,  Storefront } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const LeftBar = (props) => {

  const [userData, setUserData] = useState([])
  const navigate = useNavigate()
  const getUserData = async () => {
    let res = await axios.get(`http://localhost:3001/eea/user/${props.user.id}`)
    console.log(res)
    setUserData(res.data)
  }

  useEffect(()=>{
    getUserData()
  },[])
  return (
    
    <Box flex={1} p={2} sx={{ display: {xs: "none", sm: "block"}}}>
          <Box position="fixed">
          <List>
    <ListItem disablePadding>
      <ListItemButton onClick={()=> navigate(`/user/${props.user.id}`)}>
        <ListItemIcon >
          <Avatar src={userData[0] ? userData[0].avatar : null}/>
        </ListItemIcon>
        <ListItemText primary={userData[0] ? userData[0].userName : null} />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
      <ListItemButton onClick={()=> navigate('/partner')} >
        <ListItemIcon>
          <Handshake/>
        </ListItemIcon>
        <ListItemText primary="Partner Program" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
      <ListItemButton onClick={() => navigate('/clockin')}>
        <ListItemIcon>
          <AccessTime/>
        </ListItemIcon>
        <ListItemText primary="Clock In" />
      </ListItemButton>
    </ListItem>

    <ListItem disablePadding>
      <ListItemButton onClick={()=> props.handleLogOut()}>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
      <ListItemButton >
        <ListItemIcon>
          < DarkMode/>
        </ListItemIcon>
        <Switch />
      </ListItemButton>
    </ListItem>
    </List>
    </Box>
    </Box>
  )
}
export default LeftBar
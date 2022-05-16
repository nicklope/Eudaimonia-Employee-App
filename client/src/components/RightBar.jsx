import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import {useState, useEffect} from 'react'
import axios from "axios";

const RightBar = (props) => {
  const [clockedIn, setClockedIn] = useState(false)
  const [userData, setUserData] = useState(false)
  const getUserData = async () => {
    let res = await axios.get(`http://localhost:3001/eea/user/${props.user.id}`)
    
    setUserData(res.data)
  }
  const getClockedInData = async () => {
    let res = await axios.get(`http://localhost:3001/eea/clockedin`)
   
    setClockedIn(res.data)
  }
  useEffect(() => {
  
    getUserData()
    getClockedInData()
  
    const timer = setInterval(() => {
      getUserData()
      getClockedInData()
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!userData || !clockedIn) {
    return (
      <div>
        <LinearProgress />
      </div>
    )
  } else
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>

      <Box position="fixed" width={300}>

        <Typography variant="h6" fontWeight={100}>
          Clocked In
        </Typography>
    
        <AvatarGroup max={8} >
        {clockedIn.map((user) => (
         <Avatar src={user.avatar}/>
         ))}
        </AvatarGroup>
        

        <Typography variant="h6" fontWeight={100} mt={2}>
          Latest Conversations
        </Typography>

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

          <ListItem alignItems="flex-start">

            <ListItemAvatar>
              <Avatar/>
            </ListItemAvatar>

          <ListItemText
                primary="Word on the street.."
                secondary={ <React.Fragment>
                              <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                              >
                                Solaire
                              </Typography>
                              {" — I heard you liked secrets..."}
                            </React.Fragment>}/>

          </ListItem>

      <Divider variant="inset" component="li" />
      
          <ListItem alignItems="flex-start">

            <ListItemAvatar>
              <Avatar/>
            </ListItemAvatar>

          <ListItemText
                primary="Hmmm... hmmm..."
                secondary={ <React.Fragment>
                              <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                              >
                                Siegland
                              </Typography>
                              {" — How nice it is to see people so patie..."}
                            </React.Fragment>}/>

          </ListItem>

      <Divider variant="inset" component="li" />

        <ListItem alignItems="flex-start">

          <ListItemAvatar>
            <Avatar/>
          </ListItemAvatar>

          <ListItemText
              primary="Full moon?"
              secondary={ <React.Fragment>
                            <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            >
                              Eileen
                            </Typography>
                            {" — Leave the hoontin of hoonters to..."}
                          </React.Fragment>}/>

          </ListItem>
            </List>
      </Box>
    </Box>
  );
};

export default RightBar;
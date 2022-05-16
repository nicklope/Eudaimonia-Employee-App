import { Check, Close, ExpandMore, Visibility, VisibilityOff } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Badge, Button, CircularProgress, IconButton, List, ListItem, Modal, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import axios from "axios"

const ClockedIcon = (props) => {
  const [userData, setUserData] = useState(false)
  const [notification, setNotification] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false)

  const getUserData = async () => {
    let res = await axios.get(`http://localhost:3001/eea/user/${props.user.id}`)
    console.log(res)
    setUserData(res.data)
  }
  const getNotificationData = async () => {
    let res = await axios.get(`http://localhost:3001/eea/notifications/${props.user.id}`)
    console.log(res)
    setUserData(res.data)
    console.log(res.data)
  }
  const acceptFriendRequest = async (friendId) => {
    let res = await axios.post(`http://localhost:3001/eea/add/${props.user.id}/${friendId}`)
    setRefresh(true)
    console.log(res)
  }
  const declineFriendRequest = async (friendId) => {
    let res = await axios.put(`http://localhost:3001/eea/request/decline/${props.user.id}/${friendId}`)
    setRefresh(true)
    console.log(res)
  }
  const openModal = () => {
    setModalOpen(true)
    
  }
  
  const handleModalClose = () => setModalOpen(false);
  useEffect(() => {

    getNotificationData()
    setRefresh(false)
  }, [refresh])
  if (!userData[0]) {
    return <CircularProgress sx={{position: "sticky",  bottom:{xs: "0", sm :"30px"}, left:{xs: "10px", sm :"90px", xl: "320px"},  width: "20%"}} />
  } 
  else  if (userData[0].clockedIn){ 
    return (
      <Box sx={{position: "sticky",  bottom:{xs: "0", sm :"30px"}, left:{xs: "10px", sm :"90px", xl: "320px"},  width: "20%"}}>
        <Badge badgeContent={userData[0].receivedFriendRequests[0] ? "!" : 0} color="error" >
        <Visibility sx={{fontSize: "50px", color: "green", '&:hover': {cursor: "pointer"}}} onClick={()=> openModal()}/>
        </Badge>
        <Modal           
          open={modalOpen}
          onClose={() => handleModalClose()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
        <Box sx={{  
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'white',
          
          boxShadow: 24,}}>
            <h1>Friend Requests</h1>
              {userData[0].receivedFriendRequests.map((user)=>(
              <List >
                
                <ListItem 
                  sx={{display: "flex", justifyContent:"space-between"}}>
                    <Avatar src={user.avatar} sx={{margin: "15px"}}/>{user.userName} wants to be friends! 
                    <IconButton><Check onClick={() => acceptFriendRequest(user._id)}/> </IconButton>
                    <IconButton><Close onClick={() => declineFriendRequest(user._id)}/></IconButton>
                </ListItem>
              </List>
              ))}
          </Box>
        </Modal>
      </Box>
      
    )}  
  else  if (!userData[0].clockedIn)
    return (
      <Box sx={{position: "sticky",  bottom:{xs: "0", sm :"30px"}, left:{xs: "10px", sm :"90px", xl: "320px"},  width: "20%"}} >
        <Badge badgeContent={userData[0].receivedFriendRequests[0] ? "!" : 0} color="error">
        <VisibilityOff sx={{fontSize: "50px", color: "grey", '&:hover': {cursor: "pointer"}}}  onClick={()=> openModal()} />
        </Badge>
        <Modal          
          open={modalOpen}
          onClose={() => handleModalClose()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
         
          <Box sx={{  
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'white',
            
            boxShadow: 24,}}>
              {userData[0].receivedFriendRequests.map((user)=>(
              <List >
                <ListItem 
                  sx={{display: "flex", justifyContent:"space-between"}}>
                    <Avatar src={user.avatar} sx={{margin: "15px"}}/>{user.userName} wants to be friends! 
                    <IconButton onClick={() => acceptFriendRequest(user._id)}><Check /> </IconButton>
                    <IconButton onClick={() => declineFriendRequest(user._id)}><Close /></IconButton>
                </ListItem>
              </List>
              ))}
            </Box>
        </Modal>
      </Box>
    )}

export default ClockedIcon
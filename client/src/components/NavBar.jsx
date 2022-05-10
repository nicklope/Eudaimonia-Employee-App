import { AppBar, Toolbar, styled, Typography, Box,  Badge, Avatar, Menu, MenuItem, IconButton, LinearProgress } from '@mui/material'
import { GroupWork, Login, Logout }from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const FlexToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent:"space-between",
  backgroundColor: "black"
})
const EudaimoniaIcon = styled(GroupWork)({
  fontSize: 60
  
})
const LoginIcon = styled(Login)({
  fontSize: 60,
})
const LogoutIcon = styled(Logout)({
  fontSize: 60,
})
const IconBox = styled(Box) (({theme})=>({
  display: "flex",
  gap: "10px",
  alignItems:"center",
 }))
 


const NavBar = (props) => {

  const [loginColor, setLoginColor] = useState("inherit")
  const [logoutColor, setLogoutColor] = useState("inherit")
  const [homeColor, setHomeColor] = useState("inherit")
  const [userData, setUserData] = useState(false)
  const [refresh, setRefresh] = useState(false)
  
  const getUserData = async () => {
    let res = await axios.get(`http://localhost:3001/eea/user/${props.user.id}`)
    console.log(res)
    setUserData(res.data)
    setRefresh(true)
  }
  const navigate = useNavigate()
  useEffect(()=>{
    getUserData()
    setRefresh(false)
  },[refresh])
  return(
    <AppBar position="sticky">
      <FlexToolbar>
        <Typography variant='h5' sx={{display:{xs:"none", sm:"block"}}}>Eudaimonia Employee App</Typography>
        
        <IconBox>
          <IconButton color={loginColor} onMouseOver={()=> setLoginColor("success")} onMouseLeave={() => setLoginColor("inherit")} onClick={() => navigate('/login')}>
          <Avatar src={userData[0] ? userData[0].avatar : ""} sx={{ width: 56, height: 56 }}/>
          </IconButton>
          <IconButton color={logoutColor} onMouseOver={()=> setLogoutColor("success")} onMouseLeave={() => setLogoutColor("inherit")} onClick={props.handleLogOut}>
            <LogoutIcon />
          </IconButton>
          <IconButton color={homeColor} onMouseOver={()=> setHomeColor("success")} onMouseLeave={() => setHomeColor("inherit")} onClick={() => navigate('/')}>
          <EudaimoniaIcon />
          </IconButton>
        </IconBox>
      </FlexToolbar>
    </AppBar>
  )
}

export default NavBar
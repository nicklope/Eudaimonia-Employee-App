import { AppBar, Toolbar, styled, Typography, Box,  Badge, Avatar, Menu, MenuItem, IconButton, LinearProgress } from '@mui/material'
import { GroupWork, Login, Logout }from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EudaiMoniaLogo from '../images/EudaimoniaLogo.png'
import axios from 'axios'


const FlexToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent:"space-around",
  backgroundColor: "#424242"
})
const EudaimoniaIcon = styled(GroupWork)({
  fontSize: 60
  
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
        <Box component='img' src={EudaiMoniaLogo} sx={{display:{xs:"none", sm:"block"}, height: "100px", zIndex: "100", '&:hover': {cursor: 'pointer', opacity: ".5",}}} onClick={()=> navigate('/home')}/>
        
        <IconBox sx={{display:{xs:"block", sm:"none"}}}>
          <IconButton color={homeColor} onMouseOver={()=> setHomeColor("primary")} onMouseLeave={() => setHomeColor("inherit")} onClick={() => navigate('/home')}>
          <EudaimoniaIcon />
          </IconButton>
        </IconBox>
      </FlexToolbar>
    </AppBar>
  )
}

export default NavBar
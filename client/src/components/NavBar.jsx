import { AppBar, Toolbar, styled, Typography, Box,  Badge, Avatar, Menu, MenuItem, IconButton } from '@mui/material'
import { GroupWork, Login, Logout }from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const FlexToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent:"space-around",
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
  const navigate = useNavigate()
  return(
    <AppBar position="sticky">
      <FlexToolbar>
        <Typography variant='h5' sx={{display:{xs:"none", sm:"block"}}}>Eudaimonia Employee App</Typography>
        <IconBox>
          <IconButton color={loginColor} onMouseOver={()=> setLoginColor("success")} onMouseLeave={() => setLoginColor("inherit")} onClick={() => navigate('/login')}>
            <LoginIcon />
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
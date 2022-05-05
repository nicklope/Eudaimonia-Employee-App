import { AppBar, Toolbar, styled, Typography, Box,  Badge, Avatar, Menu, MenuItem } from '@mui/material'
import { GroupWork }from '@mui/icons-material'

const FlexToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent:"space-between",
  backgroundColor: "black"
})
const EudaimoniaIcon = styled(GroupWork)({
  fontSize: 60
  
})
const NavBar = () => {
  return(
    <AppBar position="sticky">
      <FlexToolbar>
        <Typography variant='h5' sx={{display:{xs:"none", sm:"block"}}}>Eudaimonia Employee App</Typography>
        <EudaimoniaIcon />
      </FlexToolbar>
    </AppBar>
  )
}
export default NavBar
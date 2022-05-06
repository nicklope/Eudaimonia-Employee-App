
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material'
import {  AccountBox, Article, DarkMode, Groups, Home, Settings,  Storefront } from '@mui/icons-material';


const LeftBar = () => {
  return (
    
    <Box flex={1} p={2} sx={{ display: {xs: "none", sm: "block"}}}>
          <Box position="fixed">
          <List>
    <ListItem disablePadding>
      <ListItemButton >
        <ListItemIcon>
          <Home/>
        </ListItemIcon>
        <ListItemText primary="Home Page" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
      <ListItemButton >
        <ListItemIcon>
          <Article/>
        </ListItemIcon>
        <ListItemText primary="Pages" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
      <ListItemButton >
        <ListItemIcon>
          <Groups/>
        </ListItemIcon>
        <ListItemText primary="Groups" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
      <ListItemButton >
        <ListItemIcon>
          <Storefront/>
        </ListItemIcon>
        <ListItemText primary="Marketplace" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
      <ListItemButton >
        <ListItemIcon>
          <AccountBox/>
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
      <ListItemButton >
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Settings" />
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
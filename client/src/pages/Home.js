import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import LeftBar from '../components/LeftBar'
import PostFeed from '../components/PostFeed'
import ChatBox from '../components/ChatBox'
import { Box, Fab, Stack, Tooltip } from '@mui/material'
import RightBar from '../components/RightBar'
import { Add } from '@mui/icons-material'
import Login from './Login'
import ClockedIcon from '../components/ClockedIcon'

const Home = (props) => {
  return props.user && props.authenticated ? (
    <div className="App">
      <Box>
        <NavBar handleLogOut={props.handleLogOut} user={props.user} />
        <Stack
          spacing={1}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
            margin: {
              xs: '0',
              sm: ' 0 0px 0 50px',
              xl: ' 0 50px 0 280px'
            }
          }}
        >
          <LeftBar user={props.user} handleLogOut={props.handleLogOut} />
          <PostFeed user={props.user} />
          <RightBar />
          <ChatBox />
        </Stack>
      </Box>
      <ChatBox />
      <ClockedIcon />
    </div>
  ) : (
    <div>pls login</div>
  )
}

export default Home

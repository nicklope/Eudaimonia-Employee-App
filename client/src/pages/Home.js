import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import LeftBar from '../components/LeftBar'
import PostFeed from '../components/PostFeed'

import { Box, Fab, Stack, Tooltip } from '@mui/material'
import RightBar from '../components/RightBar'
import { Add } from '@mui/icons-material'
import Login from './Login'

const Home = (props) => {
  return props.user && props.authenticated ? (
    <div className="App">
      <Box>
        <NavBar handleLogOut={props.handleLogOut} user={props.user} />
        <Stack
          direction="row"
          spacing={2}
          jusiftyContent="spacebetween"
          sx={{
            margin: {
              xs: '0',
              sm: ' 0 50px 0 50px',
              xl: ' 0 300px 0 300px'
            }
          }}
        >
          <LeftBar />
          <PostFeed user={props.user} />
          <RightBar />
        </Stack>
      </Box>
    </div>
  ) : (
    <div>pls login</div>
  )
}

export default Home

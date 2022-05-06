import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import LeftBar from '../components/LeftBar'
import PostFeed from '../components/PostFeed'

import { Box, Stack } from '@mui/material'
import RightBar from '../components/RightBar'

const Home = (props) => {
  return props.user && props.authenticated ? (
    <div className="App">
      <Box>
        <NavBar />
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
          <PostFeed />
          <RightBar />
        </Stack>
      </Box>
    </div>
  ) : (
    <div>Uh oh plz login</div>
  )
}

export default Home
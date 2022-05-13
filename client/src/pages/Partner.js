import { Box } from '@mui/system'
import NavBar from '../components/NavBar'
import { Handshake } from '@mui/icons-material'
import { Button, Icon, LinearProgress, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
const Partner = (props) => {
  const [userData, setUserData] = useState(false)
  const [token, setToken] = useState('')
  const getUserData = async () => {
    let res = await axios.get(`http://localhost:3001/eea/user/${props.user.id}`)
    console.log(res)
    setUserData(res.data)
  }
  const generateToken = async () => {
    let res = await axios.post(
      `http://localhost:3001/eea/token/${props.user.id}`
    )
    setToken(res.data.token)
  }
  useEffect(() => {
    getUserData()
  }, [])
  if (!userData[0]) {
    return <LinearProgress></LinearProgress>
  } else
    return (
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <NavBar />
        <Handshake sx={{ fontSize: '600px', width: '100%' }} />
        <Typography>{token ? token : ''}</Typography>
        <Button sx={{ width: '10%' }} onClick={generateToken}>
          Generate Token
        </Button>
      </Box>
    )
}
export default Partner

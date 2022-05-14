import { Box } from '@mui/system'
import NavBar from '../components/NavBar'
import { Handshake, Lock } from '@mui/icons-material'
import {
  Button,
  Icon,
  IconButton,
  LinearProgress,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import RandomQuestion from '../components/RandomQuestion'
const Partner = (props) => {
  const { id } = useParams()
  const [userData, setUserData] = useState(false)
  const [token, setToken] = useState('')
  const [pageState, setPageState] = useState(0)
  const [question, setQuestion] = useState('')
  const [binary, setBinary] = useState('')
  const [switches, setSwitches] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false
  })
  const [userBinary, setUserBinary] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  })
  const [finalBinary, setFinalBinary] = useState('')
  const [refresh, setRefresh] = useState(false)
  const getUserData = async () => {
    setRefresh(true)
    let res = await axios.get(`http://localhost:3001/eea/user/${id}`)

    setUserData(res.data)
  }
  const generateToken = async () => {
    let res = await axios.post(`http://localhost:3001/eea/token/${id}`)
    setToken(res.data.token)
  }
  const randomDigit = () => {
    return Math.floor(Math.random() * Math.floor(2))
  }
  const generateUserBinary = () => {
    let binary = ''
    for (let i = 0; i < 6; i++) {
      binary += userBinary[i]
    }
    setFinalBinary(binary)
  }
  const generateRandomBinary = (binaryLength) => {
    let binary = ''
    for (let i = 0; i < binaryLength; ++i) {
      binary += randomDigit()
    }
    console.log(binary)
    setBinary(binary)
  }

  useEffect(() => {
    getUserData()
    generateUserBinary()
    const timer = setInterval(() => {
      getUserData()
    }, 1000)
  }, [])
  if (!userData[0]) {
    return <LinearProgress></LinearProgress>
  } else
    switch (pageState) {
      case 1:
        return <RandomQuestion />
      case 0:
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <NavBar />
            <Handshake
              sx={{
                fontSize: '500px',

                '&:hover': {
                  cursor: 'pointer',

                  transform: 'translateY(20px)'
                }
              }}
              onClick={() => generateRandomBinary(6)}
            />

            <Typography variant="h3">{binary ? binary : ''}</Typography>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                margin: '20px'
              }}
            >
              <Switch
                checked={switches.one}
                onChange={() =>
                  setSwitches(
                    switches.one
                      ? { ...switches, one: false }
                      : { ...switches, one: true }
                  )
                }
                onClick={() =>
                  setUserBinary(
                    userBinary[0]
                      ? { ...userBinary, 0: 0 }
                      : { ...userBinary, 0: 1 }
                  )
                }
              />
              <Switch
                checked={switches.two}
                onChange={() =>
                  setSwitches(
                    switches.two
                      ? { ...switches, two: false }
                      : { ...switches, two: true }
                  )
                }
                onClick={() =>
                  setUserBinary(
                    userBinary[1]
                      ? { ...userBinary, 1: 0 }
                      : { ...userBinary, 1: 1 }
                  )
                }
              />
              <Switch
                checked={switches.three}
                onChange={() =>
                  setSwitches(
                    switches.three
                      ? { ...switches, three: false }
                      : { ...switches, three: true }
                  )
                }
                onClick={() =>
                  setUserBinary(
                    userBinary[2]
                      ? { ...userBinary, 2: 0 }
                      : { ...userBinary, 2: 1 }
                  )
                }
              />
              <Switch
                checked={switches.four}
                onChange={() =>
                  setSwitches(
                    switches.four
                      ? { ...switches, four: false }
                      : { ...switches, four: true }
                  )
                }
                onClick={() =>
                  setUserBinary(
                    userBinary[3]
                      ? { ...userBinary, 3: 0 }
                      : { ...userBinary, 3: 1 }
                  )
                }
              />
              <Switch
                checked={switches.five}
                onChange={() =>
                  setSwitches(
                    switches.five
                      ? { ...switches, five: false }
                      : { ...switches, five: true }
                  )
                }
                onClick={() =>
                  setUserBinary(
                    userBinary[4]
                      ? { ...userBinary, 4: 0 }
                      : { ...userBinary, 4: 1 }
                  )
                }
              />
              <Switch
                checked={switches.six}
                onChange={() =>
                  setSwitches(
                    switches.six
                      ? { ...switches, six: false }
                      : { ...switches, six: true }
                  )
                }
                onClick={() =>
                  setUserBinary(
                    userBinary[5]
                      ? { ...userBinary, 5: 0 }
                      : { ...userBinary, 5: 1 }
                  )
                }
              />
              <IconButton onClick={generateUserBinary}>
                <Lock />
              </IconButton>
            </Stack>
            <Typography variant="h3">
              {token ? 'Token: ' + token : ''}
            </Typography>
            <Stack sx={{ display: 'flex', direction: 'row', width: '10%' }}>
              <Button
                sx={{ width: '100%' }}
                onClick={generateToken}
                disabled={finalBinary === binary ? false : true}
              >
                Generate Token
              </Button>
            </Stack>
          </Box>
        )
    }
}
export default Partner

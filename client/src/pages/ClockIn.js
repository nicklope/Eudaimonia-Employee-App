import {
  CheckBox,
  GroupWork,
  Visibility,
  VisibilityOff
} from '@mui/icons-material'
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Icon,
  LinearProgress,
  Stack,
  TextField
} from '@mui/material'
import axios from 'axios'
import { useState, useEffect } from 'react'

import NavBar from '../components/NavBar'

const ClockIn = (props) => {
  const [keyValue, setKeyValue] = useState('')
  const [userData, setUserData] = useState(false)
  const getUserData = async () => {
    let res = await axios.get(`http://localhost:3001/eea/user/${props.user.id}`)
    console.log(res)
    setUserData(res.data)
  }
  const handleKeySubmit = async () => {
    if ((userData[0].partnerToken[0].token = parseInt(keyValue))) {
      await axios.put(`http://localhost:3001/eea/clockin/${props.user.id}`)
    }
  }
  const clockOut = async () => {
    await axios.put(`http://localhost:3001/eea/clockout/${props.user.id}`)
  }
  useEffect(() => {
    getUserData()
  }, [])
  if (!userData[0]) {
    return <LinearProgress />
  } else
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <NavBar />
        <Checkbox
          disabled="true"
          icon={
            userData[0].clockedIn ? (
              <Visibility color="success" />
            ) : (
              <VisibilityOff />
            )
          }
          sx={{ '& .MuiSvgIcon-root': { fontSize: 200 } }}
        />
        <Box
          sx={{
            margin: '10px',
            display: 'grid',
            gridTemplateRows: '100px 100px 100px 100px ',
            gridTemplateColumns: '100px 100px 100px '
          }}
        >
          <Button
            sx={{ border: '3px solid black' }}
            disabled={keyValue.length < 6 ? false : true}
            onClick={() => setKeyValue(keyValue + '1')}
          >
            1
          </Button>
          <Button
            sx={{ border: '3px solid black' }}
            disabled={keyValue.length < 6 ? false : true}
            onClick={() => setKeyValue(keyValue + '2')}
          >
            2
          </Button>
          <Button
            sx={{ border: '3px solid black' }}
            disabled={keyValue.length < 6 ? false : true}
            onClick={() => setKeyValue(keyValue + '3')}
          >
            3
          </Button>
          <Button
            sx={{ border: '3px solid black' }}
            disabled={keyValue.length < 6 ? false : true}
            onClick={() => setKeyValue(keyValue + '4')}
          >
            4
          </Button>
          <Button
            sx={{ border: '3px solid black' }}
            disabled={keyValue.length < 6 ? false : true}
            onClick={() => setKeyValue(keyValue + '5')}
          >
            5
          </Button>
          <Button
            sx={{ border: '3px solid black' }}
            disabled={keyValue.length < 6 ? false : true}
            onClick={() => setKeyValue(keyValue + '6')}
          >
            6
          </Button>
          <Button
            sx={{ border: '3px solid black' }}
            disabled={keyValue.length < 6 ? false : true}
            onClick={() => setKeyValue(keyValue + '7')}
          >
            7
          </Button>
          <Button
            sx={{ border: '3px solid black' }}
            disabled={keyValue.length < 6 ? false : true}
            onClick={() => setKeyValue(keyValue + '8')}
          >
            8
          </Button>
          <Button
            sx={{ border: '3px solid black' }}
            disabled={keyValue.length < 6 ? false : true}
            onClick={() => setKeyValue(keyValue + '9')}
          >
            9
          </Button>
          <Button
            sx={{ border: '3px solid black' }}
            onClick={() =>
              setKeyValue(keyValue.substring(0, keyValue.length - 1))
            }
          >
            -
          </Button>
          <Button
            sx={{ border: '3px solid black' }}
            disabled={keyValue.length < 6 ? false : true}
            onClick={() => setKeyValue(keyValue + '0')}
          >
            0
          </Button>
          <Button
            sx={{ border: '3px solid black' }}
            disabled={keyValue.length >= 6 ? false : true}
            onClick={() => handleKeySubmit()}
          >
            <GroupWork />
          </Button>
        </Box>
        <TextField disabled="true" value={keyValue} />
        <Button
          disabled={userData[0].clockedIn ? false : true}
          onClick={() => clockOut()}
        >
          Clock Out
        </Button>
      </Box>
    )
}
export default ClockIn

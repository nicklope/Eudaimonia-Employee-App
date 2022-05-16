import { GroupWork, Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField
} from '@mui/material'
import { useState } from 'react'
import NavBar from '../components/NavBar'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  let navigate = useNavigate()
  const [values, setValues] = useState({
    userName: '',
    password: '',
    showPassword: false
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(values)
    setValues({ email: '', password: '' })
    props.setUser(payload)
    props.toggleAuthenticated(true)
    navigate('/home')
  }
  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirections: 'column',
        alignItems: 'center'
      }}
    >
      <GroupWork sx={{ fontSize: '500px', width: '100%', margin: '10px' }} />
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ display: 'flex', flexDirection: 'column', margin: '5px' }}
      >
        <TextField
          id="outlined-basic"
          label="UserName"
          variant="outlined"
          value={values.userName}
          onChange={handleChange('userName')}
          sx={{ margin: '5px' }}
        />

        <FormControl variant="outlined" autoComplete="off">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            sx={{ margin: '5px' }}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />

          <Button
            variant="outlined"
            onClick={handleSubmit}
            sx={{ margin: '5px' }}
          >
            Submit
          </Button>
        </FormControl>

        <Button
          variant="outlined"
          onClick={() => navigate('/')}
          sx={{ margin: '5px' }}
        >
          Sign up
        </Button>
      </Box>
    </Stack>
  )
}
export default Login

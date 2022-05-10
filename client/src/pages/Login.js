import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
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
    navigate('/')
  }
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          m: 5,
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh'
        }}
      >
        <Box
          component="form"
          sx={{
            '& > :not(style)': {
              m: 1,
              width: '25ch',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="UserName"
            variant="outlined"
            value={values.userName}
            onChange={handleChange('userName')}
          />

          <FormControl
            sx={{ m: 1, width: '25ch' }}
            variant="outlined"
            autoComplete="off"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
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
            <Button variant="outlined" onClick={handleSubmit}>
              Submit
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Box>
  )
}
export default Login

import {
  Add,
  GroupWork,
  NavigateNextRounded,
  Update,
  Visibility,
  VisibilityOff
} from '@mui/icons-material'
import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select
} from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [bloodType, setBloodType] = useState('')
  const [location, setLocation] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [values, setValues] = useState({
    userName: '',
    password: '',
    email: '',
    avatar: '',
    location: '',
    aboutMe: '',
    bloodType: '',
    showPassword: false
  })
  const navigate = useNavigate()
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

  const handleSelectBloodChange = (event) => {
    setBloodType(event.target.value)
    setValues({ ...values, ['bloodType']: event.target.value })
  }
  const handleSelectLocationChange = (event) => {
    setLocation(event.target.value)
    setValues({ ...values, ['location']: event.target.value })
  }
  const handleModalOpen = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => setModalOpen(false)

  const submitRegister = () => {
    RegisterUser(values)
    navigate('/')
  }
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      component="form"
    >
      <GroupWork sx={{ fontSize: '500px', width: '100%' }} />
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="filled-textarea"
            label="Email"
            placeholder="Enter your email..."
            multiline
            variant="filled"
            value={values.email}
            onChange={handleChange('email')}
          />
          <TextField
            id="filled-textarea"
            label="Username"
            placeholder="Enter your desired username..."
            multiline
            variant="filled"
            value={values.userName}
            onChange={handleChange('userName')}
          />
          <TextField
            id="filled-multiline-static"
            label="About You"
            placeholder="Write a few sentences about yourself..."
            multiline
            rows={4}
            variant="filled"
            value={values.aboutMe}
            onChange={handleChange('aboutMe')}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type={values.showPassword ? 'text' : 'password'}
            placeholder="Enter your desired password..."
            variant="filled"
            value={values.password}
            onChange={handleChange('password')}
            InputProps={{
              endAdornment: (
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
              )
            }}
          />
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Location
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={values.location}
              onChange={handleSelectLocationChange}
            >
              <MenuItem value="">
                <em>Location?</em>
              </MenuItem>
              <MenuItem value={'United States'}>United States</MenuItem>
              <MenuItem value={'Europe'}>Europe</MenuItem>
              <MenuItem value={'Asia'}>Asia</MenuItem>
              <MenuItem value={'Australia'}>Australia</MenuItem>
              <MenuItem value={'Central America'}>Central America</MenuItem>
              <MenuItem value={'Africa'}>Africa</MenuItem>
              <MenuItem value={'Virgin Islands'}>Virgin Islands</MenuItem>
              <MenuItem value={'Nowhere'}>Nowhere</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Blood Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={values.bloodType}
              onChange={handleSelectBloodChange}
            >
              <MenuItem value="">
                <em>What's your blood type?</em>
              </MenuItem>
              <MenuItem value={"Don't know"}>Don't know</MenuItem>
              <MenuItem value={'O-'}>O-</MenuItem>
              <MenuItem value={'O+'}>O+</MenuItem>
              <MenuItem value={'A-'}>A-</MenuItem>
              <MenuItem value={'A+'}>A+</MenuItem>
              <MenuItem value={'B-'}>B-</MenuItem>
              <MenuItem value={'B+'}>B+</MenuItem>
              <MenuItem value={'AB-'}>AB-</MenuItem>
              <MenuItem value={'AB+'}>AB+</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Modal
            open={modalOpen}
            onClose={() => handleModalClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'white',

                boxShadow: 24,
                p: 4
              }}
            >
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  m: 1,
                  width: '100%',
                  justifyContent: 'space-around',
                  alignItems: 'center'
                }}
                noValidate
                autoComplete="off"
              >
                <Avatar />
                <TextField
                  id="outlined-basic"
                  label="Add an image url..."
                  variant="outlined"
                  sx={{ m: 1, width: '70%' }}
                  onChange={handleChange('avatar')}
                />
                <IconButton>
                  <Add sx={{ fontSize: '50px' }} />
                </IconButton>
              </Box>
            </Box>
          </Modal>
        </div>
      </Box>
      <Button
        onClick={() => handleModalOpen()}
        variant="contained"
        sx={{
          marginTop: '30px',
          backgroundColor: 'white'
        }}
      >
        <Avatar src={values.avatar ? values.avatar : ''} />
      </Button>
      <Button sx={{ marginTop: '20px' }} onClick={() => submitRegister()}>
        Register User
      </Button>
    </Box>
  )
}
export default Register

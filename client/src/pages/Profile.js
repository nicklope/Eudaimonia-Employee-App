import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { borderBottom, Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../components/NavBar'
import {
  Add,
  AudiotrackOutlined,
  Build,
  EditOutlined,
  SelfImprovement,
  Update,
  VisibilityOff,
  VisibilityOffOutlined,
  VisibilityOutlined
} from '@mui/icons-material'
import Post from '../components/Post'
import RightBar from '../components/RightBar'
const Profile = (props) => {
  const [userData, setUserData] = useState(false)
  const [posts, setPosts] = useState()
  const [values, setValues] = useState({
    content: ''
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [refresh, setRefresh] = useState(false)

  let { id } = useParams()

  const getUserData = async () => {
    let res = await axios.get(`http://localhost:3001/eea/user/${id}`)
    console.log(res)
    setUserData(res.data)
  }
  const getUserPosts = async () => {
    let res = await axios.get(`http://localhost:3001/eea/posts/${id}`)
    setPosts(res.data)
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(
      `http://localhost:3001/eea/newpost/${props.user.id}`,
      values
    )
    setValues({ content: '' })
    setRefresh(true)
  }

  const handleModalOpen = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => setModalOpen(false)
  useEffect(() => {
    console.log(id)
    getUserData()
    getUserPosts()
    setRefresh(false)
    const timer = setInterval(() => {
      getUserPosts()
    }, 1000)
    return () => clearInterval(timer)
  }, [refresh])
  if (!userData || !posts) {
    return (
      <div>
        <LinearProgress />
      </div>
    )
  }
  return (
    <Box display="flex" flexDirection="column" id="profile">
      <NavBar handleLogOut={props.handleLogOut} user={props.user} />
      <Stack
        direction="row"
        spacing={2}
        alignSelf="center"
        justifyContent="center"
        marginRight="500px"
        sx={{
          transform: { sm: 'translateX(-70px)' },
          margin: {
            xs: '0',
            sm: ' 0 70px 0 50px',
            xl: ' 0 200px 0 50px'
          }
        }}
      >
        <Box
          p={2}
          sx={{
            width: { xs: '500px', sm: '650px' },
            maxWidth: '1000px'
          }}
        >
          <Box>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${userData[0].coverPhoto})`,
                  backgroundSize: 'cover',
                  borderBottom: '1px solid grey'
                }}
              >
                <CardHeader
                  action={
                    <IconButton
                      id="profile-settings-button"
                      variant="outlined"
                      onClick={() => handleModalOpen()}
                      sx={{ marginBottom: '-30px', border: '2px solid gray' }}
                    >
                      <EditOutlined
                        sx={{
                          color: 'gray'
                        }}
                      />
                    </IconButton>
                  }
                />
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
                        label="Update Post"
                        variant="outlined"
                        sx={{ m: 1, width: '70%' }}
                        // onChange={handleUpdateFormChange()}
                        // value={formValue}
                      />
                      <IconButton>
                        <Update sx={{ fontSize: '50px' }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Modal>

                <Avatar
                  src={userData[0].avatar}
                  sx={{
                    height: '150px',
                    width: '150px',
                    margin: '40px 0px 0px 40px ',
                    transform: 'translateY(10px)'
                  }}
                  variant="square"
                />
              </Box>
              <CardHeader
                title={userData[0].userName}
                subheader={userData[0].aboutMe}
                sx={{
                  marginLeft: '30px',
                  marginBottom: '-30px',
                  justifySelf: 'center'
                }}
                subheaderTypographyProps={{ color: 'black', fontSize: '18px' }}
              />
              <CardHeader
                subheader={userData[0].location}
                subheaderTypographyProps={{
                  fontSize: '14px',
                  marginLeft: '30px'
                }}
              />
              <Chip
                icon={<VisibilityOff />}
                label="Clocked Out"
                sx={{
                  width: '20%',
                  position: 'relative',
                  left: '450px',
                  bottom: '75px',
                  marginBottom: '-30px'
                }}
              />
            </Card>
            <Card sx={{ margin: '10px' }}>
              <CardContent>
                <Typography variant="h5" color="text.secondary">
                  <SelfImprovement
                    sx={{ fontSize: '40px', transform: 'translateY(10px)' }}
                  />{' '}
                  Total Enlightenment: {userData[0].enlightenment}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {posts
            .slice(0)
            .reverse()
            .map((post) => (
              <Post
                key={post._id}
                posts={post}
                user={props.user}
                profileAvatar={userData[0].avatar}
                getPosts={getUserPosts}
                setPostRefresh={setRefresh}
                postRefresh={refresh}
                data={userData}
              />
            ))}
        </Box>
        <RightBar />
      </Stack>
    </Box>
  )
}

export default Profile
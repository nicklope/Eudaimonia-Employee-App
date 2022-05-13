import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Card, CardMedia, Divider, IconButton, LinearProgress, Modal, TextField, Typography } from "@mui/material"
import Post from "./Post"
import { useEffect, useState } from 'react'
import axios from "axios"
import { Add, ExpandMore, Photo } from "@mui/icons-material"



const PostFeed = (props) => {

  const [posts, setPosts] = useState()
  const [values, setValues] = useState({
    content: '',
    image: ''
  })
  const [userData, setUserData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);


  const getPosts = async () => {
    let res = await axios.get("http://localhost:3001/eea/posts")
    setPosts(res.data)
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`http://localhost:3001/eea/newpost/${props.user.id}`, values)
    setValues({ content: "", image: ""})
    setRefresh(true)

  }
  const getUserData = async () => {
    let res = await axios.get(`http://localhost:3001/eea/user/${props.user.id}`)
    console.log(res)
    setUserData(res.data)
  }
  const handleModalOpen = () =>   setModalOpen(true);
  
   const handleModalClose = () => setModalOpen(false);
  useEffect(()=>{
    getUserData()
    getPosts()
    setRefresh(false)
    const timer = setInterval(()=>
    {getPosts()}, 1000)
    return () => clearInterval(timer)

  },[refresh])

if (!posts){
  return (
    <Box flex={4} p={10} >
      
      <LinearProgress color="inherit" mt="20px"/>

    </Box>
  )
} else
  return (
    <Box flex={4} p={2} maxWidth="600px">
      <Card>
        <CardMedia component={values.image ? "img" : "div"} src={values.image}></CardMedia>
        <Box
          component="form"
          sx={{
              display: "flex",
              m: 2,
              width: "95%",
              justifyContent: "center",
              alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        > 
          <Avatar src={userData[0] ? userData[0].avatar : ""}/>
          <TextField
            id="outlined-basic"
            label="New Post"
            variant="outlined"
            sx={{m:1, width: "70%" }}
            onChange={handleChange('content')}
            value={values.content}
          />
          <IconButton onClick={handleSubmit}>
            <Add sx={{fontSize: '40px'}}/>
          </IconButton>
          <IconButton onClick={handleModalOpen}>
            <Photo sx={{fontSize: '40px'}}/>
          </IconButton>
          </Box>
          <Modal
          open={modalOpen}
          onClose={() => handleModalClose()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={{  
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'white',
          
          boxShadow: 24,
          p: 4,}}>
       <Box
          component="form"
          sx={{
              display: "flex",
              m: 1,
              width: '100%',
              justifyContent: "space-around",
              alignItems: "center",


          }}
          noValidate
          autoComplete="off"
        >
          
          <TextField
            id="outlined-basic"
            label="Add photo url..."
            variant="outlined"
            sx={{m:1, width: "70%" }}
            onChange={handleChange('image')}
            value={values.image}
          />
          {/* <IconButton onClick={() => updatePost()}>
            <Update sx={{fontSize: '50px'}}/>
          </IconButton> */}
          </Box>
        </Box>
      </Modal>

      </Card>
          <Divider sx={{margin: "30px"}}/>
      {posts.slice(0)
            .reverse()
            .map((post)=>
      
      <Post 
      key={post._id}
      posts={post}
      user={props.user}
      getPosts={getPosts}
      setPostRefresh={setRefresh}
      postRefresh={refresh}
      data={userData}
      />
      
      
      )}
      
    </Box>

  )
}
export default PostFeed
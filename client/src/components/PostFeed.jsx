import { Avatar, Box, IconButton, LinearProgress, TextField } from "@mui/material"
import Post from "./Post"
import { useEffect, useState } from 'react'
import axios from "axios"
import { Add } from "@mui/icons-material"



const PostFeed = (props) => {

  const [posts, setPosts] = useState()
  const [values, setValues] = useState({
    content: ''
  })
  const [userData, setUserData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const getPosts = async () => {
    let res = await axios.get("http://localhost:3001/eea/posts")
    console.log(res)
    setPosts(res.data)
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`http://localhost:3001/eea/newpost/${props.user.id}`, values)
    setValues({ content: ""})
    setRefresh(true)

  }
  const getUserData = async () => {
    let res = await axios.get(`http://localhost:3001/eea/user/${props.user.id}`)
    console.log(res)
    setUserData(res.data)
  }
  useEffect(()=>{
    getUserData()
    getPosts()
    setRefresh(false)
  },[refresh])

if (!posts){
  return (
    <Box flex={4} p={10} >
      
      <LinearProgress color="inherit" mt="20px"/>

    </Box>
  )
} else
  return (
    <Box flex={4} p={2}>
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
            <Add sx={{fontSize: '50px'}}/>
          </IconButton>
          </Box>
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
      />
      
      
      )}
      
    </Box>

  )
}
export default PostFeed
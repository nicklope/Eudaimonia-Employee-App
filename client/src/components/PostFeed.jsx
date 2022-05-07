import { Box, LinearProgress, styled } from "@mui/material"
import Post from "./Post"
import { useEffect, useState } from 'react'
import axios from "axios"



const PostFeed = (props) => {

  const [posts, setPosts] = useState()
  const getPosts = async () => {
    let res = await axios.get("http://localhost:3001/eea/posts")
    console.log(res)
    setPosts(res.data)
  }
  useEffect(()=>{
    getPosts()
  },[])

if (!posts){
  return (
    <Box flex={4} p={10} >
      
      <LinearProgress color="inherit" mt="20px"/>

    </Box>
  )
} else
  return (
    <Box flex={4} p={2}>
      {posts.map((post)=>
      
      <Post 
      key={post._id}
      posts={post}
      user={props.user}
      />
      
      
      )}
    </Box>

  )
}
export default PostFeed
import { ExpandMore, Favorite, FavoriteBorder, MoreVert, Share, Comment, ArrowCircleRight, Delete } from '@mui/icons-material'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, IconButton, LinearProgress, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Post = (props) => {
  const [comments, setComments] = useState([])
  const [expanded, setExpanded] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [values, setValues] = useState({
    content: ''
  })
  

  const getComments = async () => {
    let res = await axios.get(`http://localhost:3001/eea/comments/${props.posts._id}`)
    console.log(res)
    setComments(res.data)
  }
  const deleteComment = async (id, commenter) => {
    if(props.user.id === commenter){
    await axios.delete(`http://localhost:3001/eea/comment/${id}`)
    setRefresh(true)
  } else console.log("Thats not your comment!")
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`http://localhost:3001/eea/comment/${props.user.id}/${props.posts._id}`, values)
    setValues({ content: ""})
    setRefresh(true)

  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(()=>{
    getComments()
    setRefresh(false)
  },[refresh])

  if(!comments){
    return (
      <Box flex={4} p={10} >
        
        <LinearProgress color="inherit" mt="20px"/>
  
      </Box>
    )
  } else
  return(
    <div>

      <Card sx={{margin: "5px"}}>

        <CardHeader
          avatar={<Avatar  aria-label="recipe"></Avatar>}
          action={<IconButton aria-label="settings"><MoreVert/></IconButton>}
          title={props.posts.user[0].userName}
          subheader={props.posts.createdAt}
        />

      {/* <CardMedia
        component="img"
        height="40%"
        
        alt="Paella dish"
      /> */}

        <CardContent>
          <Typography variant="body4" color="text.secondary">
            {props.posts.content}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
          <IconButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Comment/>
          </IconButton>
        </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box
          component="form"
          sx={{
              display: "flex",
              m: 1,
              width: '100%',
              justifyContent: "space-around",
              alignItems: "center"

          }}
          noValidate
          autoComplete="off"
        >
          <Avatar/>
          <TextField
            id="outlined-basic"
            label="Comment"
            variant="outlined"
            sx={{m:1, width: "70%" }}
            onChange={handleChange('content')}
            value={values.content}
          />
          <IconButton onClick={handleSubmit}>
            <ArrowCircleRight sx={{fontSize: '50px'}}/>
          </IconButton>
          </Box>
        <CardContent>
         {comments[0] ? 
          
            comments.slice(0)
                    .reverse()
                    .map((comment)=>(
              <Box m={1} display="flex" justifyContent="space-around">
                <Avatar/>
              <Typography m={1} variant="h6">{comment.user[0].userName}</Typography>
              <Stack  direction="row" spacing={2} m={2} justifyContent="space-between" alignItems="center" backgroundColor="#f5f5f5" width="70%">
              <Typography variant="body2" color="text.secondary" m={1}>{comment.content}</Typography>
              <IconButton onClick={()=> deleteComment(comment._id, comment.user[0]._id)}>
                <Delete/>
              </IconButton>
              </Stack>
              </Box>
            ))
          
           : ""}
        </CardContent>
      </Collapse>
    </Card>

    </div>
  )
}
export default Post
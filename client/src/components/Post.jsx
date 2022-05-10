import { ExpandMore, Favorite, FavoriteBorder, MoreVert, Share, Comment, ArrowCircleRight, Delete, MoreHoriz, Build, Add, Update } from '@mui/icons-material'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, IconButton, LinearProgress, Menu, MenuItem, Modal, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Post = (props) => {

///////////////////////////////////////////
////////////////// STATE //////////////////
///////////////////////////////////////////
  const navigate = useNavigate()
  const [comments, setComments] = useState([])
  const [userData, setUserData] = useState([])
  const [expanded, setExpanded] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [values, setValues] = useState({
    content: ''
  })
  const [postAnchorEl, setPostAnchorEl] = useState(null);
  const [commentAnchorEl, setCommentAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    content: ""
  })


  const openComment = Boolean(commentAnchorEl);
  const openPost = Boolean(postAnchorEl);
  
///////////////////////////////////////////
///////////////// FUNCTIONS ///////////////
///////////////////////////////////////////

  const getComments = async () => {
    let res = await axios.get(`http://localhost:3001/eea/comments/${props.posts._id}`)
    setComments(res.data)
  }
  const getUserData = async () => {
    let res = await axios.get(`http://localhost:3001/eea/user/${props.user.id}`)
    console.log(res)
    setUserData(res.data)
  }
  const deleteComment = async (id, commenter) => {
    if(props.user.id === commenter){
    await axios.delete(`http://localhost:3001/eea/comment/${id}`)
    setCommentAnchorEl(null)
    setRefresh(true)
  } else console.log("Thats not your comment!")
  }
  const deletePost = async (id, poster) => {
    if(props.user.id === poster){
    await axios.delete(`http://localhost:3001/eea/post/${id}`)
    setPostAnchorEl(null)
    setRefresh(true)
    props.getPosts()
  } else console.log("Thats not your comment!")
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleUpdateFormChange = (prop) => (event) => {
    console.log(event.target.value)
    setFormValue( event.target.value )
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`http://localhost:3001/eea/comment/${props.user.id}/${props.posts._id}`, values)
    setValues({ content: ""})
    setRefresh(true)
  }
  const updatePost = async () => {
    axios.put(`http://localhost:3001/eea/updatepost/${props.posts._id}`,{"content" : formValue})
    setModalOpen(false)
    props.setPostRefresh(true)
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePostMenuClick = (event) => {
    setPostAnchorEl(event.currentTarget);
    
  };
  const handlePostMenuClose = () => {
    setPostAnchorEl(null)
  };
  const handleCommentMenuClick = (event) => {
    setCommentAnchorEl(event.currentTarget);
    
  };
  const handleCommentMenuClose = () => {
    setCommentAnchorEl(null)
  };
  const handleModalOpen = () => 
 {  setModalOpen(true)
    setFormValue(props.posts.content)}
  ;
  const handleModalClose = () => setModalOpen(false);
///////////////////////////////////////////
////////////// useEffect //////////////////
///////////////////////////////////////////

  useEffect(()=>{
    getComments()
    getUserData()
    setRefresh(false)
    console.log(props.user)
  },[refresh])

///////////////////////////////////////////
///////////////// Render //////////////////
///////////////////////////////////////////

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
          avatar={<Avatar  src={props.posts.user[0].avatar}></Avatar>}
          title={props.posts.user[0].userName}
          subheader={props.posts.createdAt}
          action={<IconButton 
                    id="post-settings-button"                    
                    aria-controls={openPost ? 'post-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openPost ? 'true' : undefined}
                    onClick={props.user.id === props.posts.user[0]._id ? handlePostMenuClick : null}
                    >
                    <MoreVert/>
                  </IconButton>}

        />
        <Menu
          id="post-menu"
              anchorEl={postAnchorEl}
              open={openPost}
              onClose={handlePostMenuClose}
              MenuListProps={{
                'aria-labelledby': 'setting',
              }}
            >
          <MenuItem onClick={()=> handleModalOpen()}><Build/></MenuItem>
          <MenuItem onClick={() => deletePost(props.posts._id, props.posts.user[0]._id)}><Delete/></MenuItem>
        </Menu>
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
          <Avatar src={props.posts.user[0].avatar}/>
          <TextField
            id="outlined-basic"
            label="Update Post"
            variant="outlined"
            sx={{m:1, width: "70%" }}
            onChange={handleUpdateFormChange()}
            value={formValue}
          />
          <IconButton onClick={() => updatePost()}>
            <Update sx={{fontSize: '50px'}}/>
          </IconButton>
          </Box>
        </Box>
      </Modal>
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
          <Avatar src={userData[0] ? userData[0].avatar : ""}/>
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
                <Avatar src={comment.user[0].avatar}/>
              <Typography m={1} variant="h6">{comment.user[0].userName}</Typography>
              <Stack  direction="row" spacing={2} m={2} justifyContent="space-between" alignItems="center" backgroundColor="#f5f5f5" width="70%">
              <Typography variant="body2" color="text.secondary" m={1}>{comment.content}</Typography>
              <IconButton 
                    id="comment-menu-button"
                    aria-controls={openComment ? 'comment-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openComment ? 'true' : undefined}
                    onClick={props.user.id === comment.user[0]._id ? handleCommentMenuClick : null}>
                <MoreHoriz/>
              </IconButton>
              <Menu
                id="comment-menu"
                    anchorEl={commentAnchorEl}
                    open={openComment}
                    onClose={handleCommentMenuClose}
                    MenuListProps={{
                      'aria-labelledby': 'comment-menu-button',
                    }}
                  >
                <MenuItem onClick={() => deleteComment(comment._id, comment.user[0]._id)}><Delete/></MenuItem>
              </Menu>
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

// ()=> deleteComment(comment._id, comment.user[0]._id)}
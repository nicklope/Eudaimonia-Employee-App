import { Favorite, FavoriteBorder, MoreVert, Share } from '@mui/icons-material'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography } from '@mui/material'

const Post = (props) => {
  return(
    <div>

      <Card sx={{margin: "5px"}}>

        <CardHeader
          avatar={<Avatar  aria-label="recipe">{props.iconLetter}</Avatar>}
          action={<IconButton aria-label="settings"><MoreVert/></IconButton>}
          title="User Name"
          subheader={Date()}
        />

      {/* <CardMedia
        component="img"
        height="40%"
        
        alt="Paella dish"
      /> */}

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            post description
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </CardActions>

    </Card>

    </div>
  )
}
export default Post
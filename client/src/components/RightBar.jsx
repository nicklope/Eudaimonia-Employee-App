import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const RightBar = () => {
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>

      <Box position="fixed" width={300}>

        <Typography variant="h6" fontWeight={100}>
          Clocked In
        </Typography>

        <AvatarGroup max={7}>
          <Avatar/>
          <Avatar/>
          <Avatar/>
          <Avatar/>
          <Avatar/>
          <Avatar/>
          <Avatar/>
          <Avatar/>
          <Avatar/>
        </AvatarGroup>

        <Typography variant="h6" fontWeight={100} mt={2}>
          Latest Conversations
        </Typography>

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

          <ListItem alignItems="flex-start">

            <ListItemAvatar>
              <Avatar/>
            </ListItemAvatar>

          <ListItemText
                primary="Brunch this weekend?"
                secondary={ <React.Fragment>
                              <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                              >
                                Ali Connors
                              </Typography>
                              {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>}/>

          </ListItem>

      <Divider variant="inset" component="li" />
      
          <ListItem alignItems="flex-start">

            <ListItemAvatar>
              <Avatar/>
            </ListItemAvatar>

          <ListItemText
                primary="Brunch this weekend?"
                secondary={ <React.Fragment>
                              <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                              >
                                Ali Connors
                              </Typography>
                              {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>}/>

          </ListItem>

      <Divider variant="inset" component="li" />

        <ListItem alignItems="flex-start">

          <ListItemAvatar>
            <Avatar/>
          </ListItemAvatar>

          <ListItemText
              primary="Brunch this weekend?"
              secondary={ <React.Fragment>
                            <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            >
                              Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                          </React.Fragment>}/>

          </ListItem>
            </List>
      </Box>
    </Box>
  );
};

export default RightBar;
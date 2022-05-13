import { ExpandMore } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, IconButton, Typography } from "@mui/material"
import { Box } from "@mui/system"

const ChatBox = () => {
return (
  <Box sx={{position: "fixed",  bottom: "0", right: "0", width: "20%"}}>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Chat</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="square" startIcon={<Avatar/>} sx={{width: "100%", display: "flex", justifyContent:"space-between"}}>
          
          UserName
          </Button>
        </AccordionDetails>
      </Accordion>
  </Box>
)
}
export default ChatBox
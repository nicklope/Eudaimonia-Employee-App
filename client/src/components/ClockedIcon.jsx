import { ExpandMore, Visibility } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, IconButton, Typography } from "@mui/material"
import { Box } from "@mui/system"

const ClockedIcon = () => {
return (
  <Box sx={{position: "sticky",  bottom: "30px", left: "75px", width: "20%"}}>
    <Visibility sx={{fontSize: "50px", color: "green"}}/>
  </Box>
)
}
export default ClockedIcon
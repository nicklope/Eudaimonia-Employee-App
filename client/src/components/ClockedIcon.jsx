import { ExpandMore, Visibility } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, IconButton, Typography } from "@mui/material"
import { Box } from "@mui/system"

const ClockedIcon = () => {
return (
  <Box sx={{position: "sticky",  bottom:{ sm :"30px"}, left:{sm :"90px", xl: "320px"}, width: "20%"}}>
    <Visibility sx={{fontSize: "50px", color: "green"}}/>
  </Box>
)
}
export default ClockedIcon
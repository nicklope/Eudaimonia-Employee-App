import { ExpandMore, Visibility, VisibilityOff } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, CircularProgress, IconButton, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import axios from "axios"

const ClockedIcon = (props) => {
  const [userData, setUserData] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const getUserData = async () => {
    let res = await axios.get(`http://localhost:3001/eea/user/${props.user.id}`)
    console.log(res)
    setUserData(res.data)
  }
  useEffect(() => {
    getUserData()
    setRefresh(false)
  }, [refresh])
  if (!userData[0]) {
    return <CircularProgress sx={{position: "sticky",  bottom:{xs: "0", sm :"30px"}, left:{xs: "10px", sm :"90px", xl: "320px"},  width: "20%"}} />
  } 
  else  if (userData[0].clockedIn){ 
    return (
      <Box sx={{position: "sticky",  bottom:{xs: "0", sm :"30px"}, left:{xs: "10px", sm :"90px", xl: "320px"},  width: "20%"}}>
        <Visibility sx={{fontSize: "50px", color: "green"}}/>
      </Box>
    )}  
  else  if (!userData[0].clockedIn)
    return (
      <Box sx={{position: "sticky",  bottom:{xs: "0", sm :"30px"}, left:{xs: "10px", sm :"90px", xl: "320px"},  width: "20%"}}>
        <VisibilityOff sx={{fontSize: "50px", color: "grey"}}/>
      </Box>
    )}
export default ClockedIcon
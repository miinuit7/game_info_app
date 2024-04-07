import { List, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'

const Sidebar = () => {
  return (
  <>
     <Typography sx={{
        bgcolor: "#0078FF",
        color: "white",
        padding: 1,
    }}>
        検索
     </Typography>

     <List component={"nav"}>
        <ListItemButton>
            <ListItemText primary="ゲーム名" />
        </ListItemButton>
        <ListItemButton>
            <ListItemText primary="ジャンル" />
        </ListItemButton>
        <ListItemButton>
            <ListItemText primary="ユーザー名" />
        </ListItemButton>
     </List>
  </>
  )
}

export default Sidebar
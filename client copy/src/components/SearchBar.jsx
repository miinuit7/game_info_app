import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'


const SearchBar = () => {

  const [query,setQuery] = useState("")
  const router = useRouter()

  const handleChange = (e) => {
      setQuery(e.target.value)
  }


   const handleSubmit = async (e) => {
     event.preventDefault()
     const result = await onSearch(query);
     setSearchResult(result)
  }

  const searchQuery = (e) => {
    e.preventDefault()
    if(!query.trim()) {
      return
    }
   // alert("test")
   router.push(`search?query=${encodeURIComponent(query)}`)
  }


  return (
    <Box component={"form"} onSubmit={searchQuery}
        sx={{
            width: "50%",
            margin: '3% auto',
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
        >
       <TextField 
            onChange={handleChange} 
            fullWidth variant="filled" 
            placeholder="ゲーム名・ジャンル・ユーザー名を検索" 
            sx={{ mr : 2 
            
        }}/>
       <Button type="submit" variant="outlined" sx={{ color: "white", border: "1px solid black", backgroundColor:"black"}}>
        <SearchIcon />
       </Button>
       
    </Box>
  )
}

export default SearchBar
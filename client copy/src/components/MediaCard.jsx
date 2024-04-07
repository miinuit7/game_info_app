import { CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const MediaCard = ({item}) => {
    return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
         <CardActionArea>
            <Link href={`/detail/${item.id}`}>
            <CardMedia 
             component={"img"}
             sx={{ aspectRatio: "2/3" }}
             image={item.cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover.image_id}.jpg` : `https://images.igdb.com/igdb/image/upload/t_cover_big/${item.cover}.jpg`}
             
             />
            <CardContent>
                  <Typography variant="h6" component={"div"} noWrap>{item.name}</Typography>
            </CardContent>
            </Link>
         </CardActionArea>
    </Grid>
  )
}

export default MediaCard
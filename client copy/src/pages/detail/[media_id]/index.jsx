import { useEffect, useState } from 'react';
import laravelAxios from '@/lib/laravelAxios';
import { Box, Button, ButtonGroup, Card ,CardContent, Container, Fab, Grid, Modal, Rating, TextareaAutosize, Tooltip, Typography } from '@mui/material';
import AppLayout from '@/components/Layouts/AppLayout';
import Head from 'next/head';
import { AirlineSeatLegroomExtraSharp, PeopleAlt } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import { useAuth } from '@/hooks/auth';


const Detail = ({detail,media_id}) => {
const[open,setOpen] = useState(false)
const[rating,setRating] = useState(1)
const[review,setReview] = useState("")
const[reviews,setReviews] = useState([])
const[averageRating, setAverageRating] = useState(null) 
const[editMode, setEditMode] = useState(null)
const[editedRating,setEditedRating] = useState(null)
const[editedContent,setEditedContent] = useState("")

const { user } = useAuth({middleware: 'auth'})
console.log(user)


const handleOpen = () => {
  setOpen(true)
}

const handleClose = () => {
  setOpen(false)
}

const handleReviewChange = (e) => {
  setReview(e.target.value)
}

const handleRatingChange = (e, newValue) => {
   setRating(newValue)
}

const isButtonDisabled = (rating, content) => {
  return !rating || !content.trim()
}

  const isReviewButtonDisabled = isButtonDisabled(rating,review)
  const isEditButtonDisabled = isButtonDisabled(editedRating,editedContent)


const handleReviewAdd = async() => {
  handleClose()
  try {
    const response = await laravelAxios.post(`api/reviews`,{
      content: review,
      rating: rating,
      media_id: media_id,
    })
    const newReview = response.data

    setReviews([...reviews, newReview])
    console.log(reviews)

    setReview("")
    setRating(0)
    const updatedReviews = [...reviews, newReview]
    updateAverageRating(updatedReviews)

  } catch(err) {
    console.log(err)
  }

}

const updateAverageRating = (updatedReviews) => {
  if(updatedReviews.length > 0) {
    const totalRating = updatedReviews.reduce((acc, review) => acc + review.rating, 0)
    console.log(totalRating)

   const average =  (totalRating / updatedReviews.length).toFixed(1)
   setAverageRating(average)
   
   console.log(average)
  } else {
    setAverageRating(null)
  }
}

const handleDelete = async (id) => {
   console.log(id)
   if(window.confirm('レビューを削除しますか？')) {
    try {
      const response = await laravelAxios.delete(`api/review/${id}`)
      console.log(response)
      const filteredReviews = reviews.filter((review) => review.id !== id)
      console.log(filteredReviews)
      setReviews(filteredReviews)
      updateAverageRating(filteredReviews)

    } catch(err) {
      console.log(err)
    }
   }

}

//編集ボタンを押した時の処理
const handleEdit = (review) => {
    setEditMode(review.id)
    setEditedRating(review.rating)
    setEditedContent(review.content)
}

//レビューを更新した時の処理
const handleConfirmEdit = async (reviewId) => {
      console.log(reviewId)

     try {
         const response = await laravelAxios.put(`api/review/${reviewId}`,{
          content: editedContent,
          rating: editedRating
         })

       //  console.log(response)
         const updatedReview = response.data
       //  console.log(updatedReview)

       const updatedReviews = reviews.map((review) => { 
         if(review.id === reviewId) {
            return {
              ...review, 
              content: updatedReview.content,
              rating: updatedReview.rating,
            }
         }
         return review
       })

         setReviews(updatedReviews)
         console.log(updatedReviews)
         setEditMode(null)
     } catch(err) {
         console.log(err)
     }
}

useEffect(() => {
  const fetchReviews = async () => {
    try {
      const response = await laravelAxios.get(`api/reviews/${media_id}`)
      console.log(response.data);
      const fetchReviews = response.data
      setReviews(fetchReviews)
      updateAverageRating(fetchReviews)

    } catch (err) {
      console.log(err)
    }
  }

  fetchReviews();
},[media_id])
      
        
        
 

  return (
    <AppLayout
    header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            {detail[0].name}
        </h2>
    }>
    <Head>
    <title>Laravel - Detail</title>
    </Head>

 {/* ゲーム詳細表示　*/}
   <Box
       sx={{
           height: { xs: "auto", md: "70vh" }, bgcolor: "red", position: "relative", display: "flex", alignItems: "center"
       }}
   >
        <Box 
            sx={{
                backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_cover_big/${detail[0].cover.image_id}.jpg)`,
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

                '&::before': {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                }
            }}
        />

        <Container sx={{zIndex: 1}}>
             <Grid sx={{ color: "white" }}container alignItems={"center"}> 
                <Grid item md={4} sx={{ display: "flex", justifyContent: "center"}}>
                  <img width={"70%"} src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${detail[0].cover.image_id}.jpg`} alt="ゲームカバー" />
                  
                </Grid>
                <Grid item md={8}>
                    <Typography variant="h4" paragraph>{detail[0].name}</Typography>
                    <Typography paragraph>{detail[0].summary}</Typography>

                    <Box gap={2}
                    sx={{ 
                      display: "flex",
                      alignItems: "center",
                      mb:2
                    }}
                    >
                         <Rating 
                            readOnly
                            precision={0.5}
                            value={parseFloat(averageRating)}
                            emptyIcon={<StarIcon style={{ color: "white"}}/>}

                         />

                         <Typography
                           sx={{
                            m1:1,
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                           }}
                         >{averageRating}</Typography>
                    </Box>
                    <Typography sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}> 
                    {detail[0].screenshots.slice(0, 6).map((screenshot, index) => (
                       <img key={index} width={"30%"} src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${screenshot.image_id}.jpg`} alt={`スクリーンショット ${index + 1}`} sx={{ width: 'calc(33.33% - 10px)', height: 'auto' }} />
                    ))}
                    </Typography>

                </Grid>
             </Grid>
        </Container>
   </Box>
  
 {/* レビュー表示　*/}
 <Container sx={{py: 4}}>
    <Typography sx={{background:'#e6e6e6',padding: '1rem 2rem'}}
      component={'h1'}
      variant='h5'
      align='left'
      gutterBottom
      ><PeopleAlt /> {detail[0].name}に投稿された感想・評価
    </Typography>
    
    <Grid container spacing={3}>
      {reviews.map((review) => (
        <Grid item xs={12} key={review.id}>
          <Card>
            <CardContent>
              {/* ユーザー名 */}
              <Typography
                   variant='h6'
                   component={'div'}
                   gutterBottom
               >
                   {review.user.name}
                 </Typography>
               {editMode === review.id ? (
                <>
                {/* 編集ボタンを押された時の挙動 */}
                <Rating value={editedRating} onChange={(e, newValue) => setEditedRating(newValue)}/>
                <TextareaAutosize minRows={3} style={{ width: "100%"}} value={editedContent}  
                 onChange={(e) => setEditedContent(e.target.value)}
                />
                </>
               ) : (
              <>
  
                {/* 評価 */}
                 <Rating 
                   value={review.rating}
                   readOnly
               />
                
                 {/* レビュー内容 */}
                 <Typography
                   variant='body2'
                   color='textSecondary'
                   paragraph
               >
                  {review.content}
                 </Typography>
               </>
               )}
               
               
               {user?.id === review.user.id &&(
                <Grid
                sx={{display: "flex", justifyContent: "flex-end"}}
                >
                  {editMode === review.id ? (
                      //編集中の表示
                  <Button onClick={() => handleConfirmEdit(review.id)} 
                  variant="outlined"  
                  disabled={isEditButtonDisabled}
                  >更新</Button>
                  ) : (
                 <ButtonGroup>
                   <Button onClick={() => handleEdit(review)}>編集</Button>
                   <Button  color="error" onClick={() => handleDelete(review.id)}>削除</Button>
                 </ButtonGroup>
                  )}
                 
                </Grid>
               )}
               
            </CardContent>
          </Card>
        </Grid>
      
      

      ))}
    </Grid>

 </Container>
{/* モーダル */}
 <Box sx={{
  position: "fixed",
  bottom: "16px",
  right: "16px",
  zIndex: 5,          
}}
  
 >

    <Tooltip title="レビュー追加">
      <Fab
        style={{background: "#1976d2", color: "white"}}
        onClick={handleOpen}
      >
      <AddIcon />
      </Fab>
    </Tooltip>
 </Box>

    <Modal open={open} onClose={handleClose} >
       <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                height: 500,
                bgcolor: "background.paper",
                border: "2px solid, #000",
                boxshadow: 24,
                p: 4, 
       }}
           
       >
           <Typography variant="h6" component="h2">
            レビュー
           </Typography>

           <Rating required  sx={{marginTop:"10px"}} 
            onChange={handleRatingChange}
            value={rating}
           />
             <TextareaAutosize 
               required
               minRows={8}
               placeholder="レビューを記入してください"
               style={{ width: "100%", marginTop: "10px"}}
               onChange={handleReviewChange}
               value={review}
             />
             <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
             <Button 
                variant="outlined" 
                disabled={isReviewButtonDisabled}
                onClick={handleReviewAdd}
                >
              投稿
             </Button>
             </Box>
             

       </Box>
       
    </Modal>

    </AppLayout>
  )
}

export async function getServerSideProps(context) {
  const { media_id } = context.params

  {/* ゲーム情報取得 */}
  try{
    const response = await axios({
      method: 'POST',
        url: 'https://api.igdb.com/v4/games/',
        headers: {
          'Client-ID': 'hw3lajinekzvdwnrflrhzz1n35kp8t',
          'Authorization': `Bearer ${process.env.IGDB_API_KEY}`,
          'Accept': 'application/json',
        },
        data: `fields 
        id, name, cover.image_id, 
        platforms, genres.name, rating, 
        storyline, summary, screenshots.image_id;
        limit 10; 
        where id = ${media_id};`
        
      })
    const fetchData = response.data;

    return {
       props:{detail: fetchData, media_id}
    }
  } catch {
       return { notFound: true }
  }
}
export default Detail
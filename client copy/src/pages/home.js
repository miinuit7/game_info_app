import AppLayout from '@/components/Layouts/AppLayout'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';

const Home = () => {
        const[games,setGames] = useState([]);
   
        useEffect(() => {
            const fetchGames = async() => {
                try {
                
                    const response = await axios.get('api/getGamesinfo');
                   
                    setGames(response.data);
                    console.log(games);

                } catch(err) {
                 console.log(err);
                }
            }
            fetchGames();

        }, [])
        

        return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                  Home
                </h2>
            }>
            <Head>
                <title>Laravel - Home</title>
            </Head>

            <SearchBar  />
            <Typography variant="h4" component="h1" gutterBottom>
            最近リリースされた人気のゲーム
            </Typography>
            <Swiper
                spaceBetween={30}
                slidesPerView={8}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                 {games.map((game) => (
                game.cover && (
               <SwiperSlide key={game.id}>
                   <Link href={`detail/${game.id}`} key={game.id}>
                   
                   <CardMedia 
                      component={"img"}
                      sx={{
                           aspectRatio: '3/4'
                      }}
                      image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                      alt={game.name}
                   />
                   </Link>
               <Typography>
                {/*  名前とレートを表示する */}
                   {game.name} 
               </Typography>
                
                </SwiperSlide> 
                 )))} 
                 
             </Swiper>


            
        </AppLayout>
    )
}

export default Home

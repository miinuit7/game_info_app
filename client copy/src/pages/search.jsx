import Layout from '@/components/Layout'
import AppLayout from '@/components/Layouts/AppLayout'
import MediaCard from '@/components/MediaCard'
import Sidebar from '@/components/Sidebar'
import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const search = () => {
    const [results,setResults] = useState([])
    const router = useRouter()
    const {query: searchQuery} = router.query
    const[loading,setLoading] = useState(true)
    console.log(searchQuery)

    useEffect(() => {
        if(!searchQuery) {
            return
        }
        const fetchMedia = async() => {
            try {
                const response = await axios.post(`api/searchGames?searchQuery=${searchQuery}`)
                setResults(response.data)
                console.log(response.data)
            } catch(err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchMedia()
        
    }, [searchQuery])
  return (
    <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Search
                </h2>
            }>
            <Head>
                <title>Laravel - Search</title>
            </Head>
  <Layout sidebar={<Sidebar />}>
  {loading ? (
    <Grid item textAlign={"center"} xs={12}>
      <Typography>検索中...</Typography>
    </Grid>
  ) : (
    results.length === 0 ? (
      <Grid item textAlign={"center"} xs={12}>
        <Typography>検索結果が見つかりませんでした</Typography>
      </Grid>
    ) : (
      <Grid container spacing={3}>
        {results.map((media) => (
          <MediaCard item={media} key={media.id}/>  
        ))}
      </Grid>
    )
  )}
</Layout>
    </AppLayout>
  )
}

export default search
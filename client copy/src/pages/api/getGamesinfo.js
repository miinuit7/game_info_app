import axios from "axios";

export default async function handler(req,res) {
  try {    
    const response = await axios({
    method: 'POST',
      url: 'https://api.igdb.com/v4/games',
      headers: {
        'Client-ID': 'hw3lajinekzvdwnrflrhzz1n35kp8t',
        'Authorization': `Bearer ${process.env.IGDB_API_KEY}`,
        'Accept': 'application/json',
      },
      data: `fields id, name, cover.image_id, platforms, genres.name, rating; where release_dates.date >= ${Math.floor(Date.now() / 1000)} & dlcs = null ; sort total_rating desc; limit 10;`
    
    })
      res.status(200).json(response.data);
      console.log('取得した結果は...', response.data);
    
    } catch (err) {
      console.log(err);
      res.status(500).json({message:'エラーが発生しました'});
    }
  }
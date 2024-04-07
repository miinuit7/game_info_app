import axios from "axios"

export default async(req,res) => {
    const {searchQuery} = req.query
    console.log(searchQuery)

    if(!searchQuery) {
        return res.status(400).json({message: '検索内容を入力してください'})
    }

    try {    
        const query = encodeURIComponent(searchQuery)
        const response = await axios({
        method: 'POST',
          url: `https://api.igdb.com/v4/games?search=${query}&fields=id,name,cover.image_id,platforms,genres.name,total_rating&sort=total_rating:desc&limit=100`,
          headers: {
            'Client-ID': 'hw3lajinekzvdwnrflrhzz1n35kp8t',
            'Authorization': `Bearer ${process.env.IGDB_API_KEY}`,
            'Accept': 'application/json',
          },
          data: `field sort total_rating desc;`
        
        })
           return res.status(200).json(response.data)
        
           } catch (err) {
          console.log(err);
          res.status(500).json({message:'エラーが発生しました'});
        }
 }
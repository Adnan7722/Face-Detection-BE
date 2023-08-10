// import Clarifai from 'clarifai';
const func=(imageURL)=>
{
const PAT = '51681d8c08b447dfaea234ca220e5e9d';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'addy7722';       
const APP_ID = 'myappid';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const IMAGE_URL = imageURL;

const raw = JSON.stringify({
  "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
  },
  "inputs": [
      {
          "data": {
              "image": {
                  "url": IMAGE_URL
              }
          }
      }
  ]
});



const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
  },
  body: raw
};

return requestOptions;

}

const handleApiCall =(req,res)=>
{
fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", func(req.body.input))
        .then(response => response.json())
        .then(data => {
            res.json(data); // Send the JSON response
        }).catch(err=>res.status(400).json('unable to get API '))
}

const handleImage=(req,res,db)=>
{
    const {id}=req.body; 

    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=> 
        {
            res.json(entries[0].entries);
        })
        .catch(err=>{
            res.status(404).json('Unable to get the entries');
        })    
}

export  { handleImage, handleApiCall};
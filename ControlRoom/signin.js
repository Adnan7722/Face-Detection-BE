const handleSignin=(req,res,db, bcrypt)=>
{
    
    const {email,password}=req.body;
    if(!email || !password)
    {
       return res.status(400).json('incorrect form submission');
    }
    db.select('email', 'hash').from('login').where('email', '=', email)
    .then(data=>
        {
            
          const matched =  bcrypt.compareSync(password, data[0].hash);
          if(matched)
          {
           return db.select('*').from('users').where('email', '=', email)
            .then(user =>{

                res.json(user[0])
            })
            .catch(err=>res.status(400).json('Unable to get user'))
          }
          else{
            return res.status(404).json('Wrong Credentials');
          }
        })
        .catch(err=>{res.status(400).json('Wrong credentials')})
}

export default handleSignin;
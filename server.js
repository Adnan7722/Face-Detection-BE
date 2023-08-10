import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';  //For Encrypting/Hashing the Password of the user.
import cors from 'cors';  //CROSS ORIGIN RESOURCE SHARING --> Connecting Frontend to Backend.
import knex from 'knex';  //Connecting Backend to Database.
import handleRegister from './ControlRoom/register.js';
import handleSignin from './ControlRoom/signin.js';
import handleProfile from './ControlRoom/profile.js';
import {handleImage, handleApiCall} from './ControlRoom/image.js';


//Connecting to Database (Postgres)
 const db= knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'test',
      database : 'Smart-Brain'
    }
  });


  //Using Express
const app=express();
app.use(express.json());
app.use(cors());



//Root Route
app.get ('/', (req,res)=>
{
    res.json('Working!');
})



//Sign-in Route
app.post('/signin', (req,res)=>
{
    handleSignin(req,res,db, bcrypt); // // Dependency Injection --> passing all the dependencies required
}) 




//Register Route
app.post('/register', (req,res)=>
{
    handleRegister(req,res,db,bcrypt);  // Dependency Injection --> passing all the dependencies required
})



 
 
// Profile Route
app.get('/profile/:id', (req,res)=>
{
    handleProfile(req,res,db);
})



// Image Route
app.put('/image',(req,res)=>{
    handleImage(req,res,db);
})

//Imagurl Route
app.post('/imageurl',(req,res)=>{
    handleApiCall(req,res);
})


const PORT=process.env.PORT;
app.listen(PORT, ()=>
{
    console.log(`Running on port ${PORT}`);
})


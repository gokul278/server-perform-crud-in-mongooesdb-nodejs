const express = require('express');

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://gokulm:Fox22558@cluster0.v3l6f2v.mongodb.net/?retryWrites=true&w=majority",
    function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Connected to mongodb");
        }
});

const server = express();


server.use(express.json());

const MovieSchema = new mongoose.Schema({
    name : String,
    year : Number,
    rating : Number
})

const Movie = mongoose.model('Movie',MovieSchema);

server.post('/',async function(req,res){

    const movie = await Movie.create({
        name : req.body.name,
        year : req.body.year,
        rating : req.body.rating
    });

    res.json({
        message : 'Movie created successfully',
        data : movie 
    })
})

server.get('/',async function(req,res){
    console.log(req.query);
    const movies = await Movie.find(req.query);
    res.json({
        message : 'All Movies',
        data : movies
    });
})

server.patch('/',async function(req,res){
    const id = req.query.id;

    const movie = await Movie.findByIdAndUpdate(id,req.body);

    res.json({
        message : 'movie updated successfully',
        data : movie
    })
});
  

server.delete('/',async function(req,res){
    await Movie.findOneAndDelete({name : req.body.name});
    res.json({
        message : 'Movie deleted successfully', 
    });
});


server.listen(3000,function(){
    console.log("Server is running on port 3000...");
});
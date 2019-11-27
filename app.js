const exp = require('express');
const app = exp();
const cors = require('cors');

app.use(cors());

const {Pool} = require('pg');

const connection=new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '280701',
    port:'5432'
});

app.get("/getSomeData",
    (request,response)=>{

     connection.query("select * from movie", 
     (err,res)=>{
        if(err){
            response.json({message:"error"});
        }else{
            response.json(res.rows);
        }
     });
 });

 app.get("/delete/:movie_id",(request,response)=>{

    connection.query(
        "delete from movie where movie_id=$1",
        [request.params.movie_id],
        (err,res)=>{
            if(err){
                console.log(err);
                response.json(err);
            }else{
                response.json({message:"successfully deleted"})
            }
        }
    )
 }
 );

 app.get("/create/:description", (request, response) => {

    connection.query(
        "insert into actor(actor_name) values($1)",
        [
            request.params.description
        ],
        (err, res) => {
            if (err) {
                response.json(err);
            } else {
                response.json({ message: "successfully created" });
            }
        }
    );

});

 app.listen(8080,
 ()=>{
     console.log("successfully running");
 });

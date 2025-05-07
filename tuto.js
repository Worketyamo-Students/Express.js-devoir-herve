import bodyParser from "bodyParser";
import express from "express";



const app = express();
// Then here to set up our server here am going to create an app varriable  which will permit us to call the they express function and this permit us to permit us to run our app

app.listen(2000);

//to do request
app.get("/") , (req,res) =>{
    console.log("hey wassup there we go again");
    res.Status(500);
    res.send("<h1>hi</h1>");
};
 

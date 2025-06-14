

/******************************************************************************** 
*  WEB322 – Assignment 03
*  
*  I declare that this assignment is my own work in accordance with Seneca's 
*  Academic Integrity Policy: 
*  
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html 
*  
*  Name: _____Elshad Humbatli_________________ Student ID: _107143240_____________ Date: _30/05/2025_____________ 
* 
********************************************************************************/ 
const projectData=require("./modules/projects");
const express=require('express');
const app=express();
projectData.initialize();

app.set('views', __dirname + '/views');
app.get("/",(req,res)=>{
res.sendFile(__dirname+"/views/home.html");
});
app.get("/about",(req,res)=>{
    res.sendFile(__dirname+"/views/about.html");
})
app.get("/solutions/projects",(req,res)=>{
    //here i am querying the sector 
    const sector=req.query.sector;
    //if it exists
 try{
    if(sector)
 {
    res.json(projectData.getProjectsBySector(sector));
 }
 else
 {
    res.json(projectData.getAllProjects());
 }}catch(error)
 {
    console.error(error);
    res.status(404).send("It  did not fetch");
 }
});
app.get("/solutions/projects/:id",(req,res)=>
{
const id= req.query.id;

    if(id)
    {
        res.json(projectData.getProjectById(id));
    }
    else{
        res.status(404).send("it did not fetch");
    }
});


app.use((req,res)=>{
res.status(404).sendFile(__dirname+"/views/404.html");
});
const port=8080;
app.use(express.static(__dirname + '/public'));

app.listen(port,()=>
{
    console.log(`app is running in the port ${port}`);
});
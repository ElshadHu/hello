

/******************************************************************************** 
*  WEB322 – Assignment 04
*  
*  I declare that this assignment is my own work in accordance with Seneca's 
*  Academic Integrity Policy: 
*  
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html 
*  
*  Name: _____Elshad Humbatli_________________ Student ID: _107143240_____________ Date: 06/07/2025_____________
//i  only did not  know about https://drawdown.org/solutions/<%=encodeURIComponent(project.title)%>  which i learned from the internet
* 
********************************************************************************/ 

const projectData=require("./modules/projects");
const express=require('express');
const app=express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.get("/",(req,res)=>{
return res.render("home");
});
app.get("/about",(req,res)=>{
 return  res.render("about");
})
app.get("/solutions/projects",async(req,res)=>{
    //here i am querying the sector 
    const sector=req.query.sector||'';
    //if it exists
 try{
    if(sector)
 {
  const filtered= await  projectData.getProjectsBySector(sector);
res.render("projects",{projects:filtered,page:"solutions/projects",sector:sector});
 }
 else
 {
 const all= await projectData.getAllProjects();
res.render("projects",{projects:all,page:"solutions/projects",sector:sector});
 }}catch(error)
 {
    console.error(error);
 res.status(404).render("404", { message: "Project sector not found.", page:"" });
    // res.status(404).send("It  did not fetch");
 }
});
app.get("/solutions/projects/:id",async (req,res)=>
{
try{
const id= req.params.id;  
    const foundID=await  projectData.getProjectById(id);
if(foundID)
    res.render("project",{project:foundID});
else {
      res.status(404).render("404", { message: "Project not found", page: ""});
    }
}catch(err)
    {
        console.log(err);
 res.status(404).render("404", { message: "Project id not found." , page: ""});
    }
});


app.use((req,res)=>{
res.status(404).render("404",{message:"there is not info about it",page:""});
});
const port=8080;
projectData.initialize();
app.listen(port,()=>
{
    console.log(`app is running in the port ${port}`);
})



// const projectData=require("./modules/projects");
// const express=require('express');
// const app=express();

// app.set('view engine', 'ejs');

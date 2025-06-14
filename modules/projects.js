const projectData=require('../data/projectData.json');
const sectorData=require('../data/sectorData.json');
let projects=[];
function initialize()
{
    
    projectData.forEach(element=>
    {
    const foundItems=sectorData.find(element2=>element.sector_id===element2.id);
        if(foundItems)
        {
            element.sector=foundItems.sector_name;
    projects.push(element);
        }

    }
    )
   return projects;
}
function getAllProjects()
{
    return projects;
}
function getProjectById(projectId)
{
   return projects.find(element=>element.id===projectId);
}

function getProjectsBySector(sector)
{
   let theCorrectOne=sector.toLowerCase().trim();
   return projects.filter(project=>project.sector.toLowerCase().includes(theCorrectOne));
  
}
module.exports={initialize,getAllProjects,getProjectById,getProjectsBySector};//the main purpose here is to use them in another file

// console.log(initialize());
// console.log(getProjectById(9));

// console.log(getProjectsBySector('electricity'));
// console.log(getAllProjects())


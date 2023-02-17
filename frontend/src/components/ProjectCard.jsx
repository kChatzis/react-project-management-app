import { Link,Outlet,useLocation } from "react-router-dom"
import "../css/ProjectCard.css"

function ProjectCard() {

    const location = useLocation() //passing the object project from ProjectDetails here on projectData 
    const {projectData} = location.state //passing the object project from ProjectDetails here on projectData 
    return ( 
    <div className="project-card">
        <div className="project-nav">
            <Link className="path" to={'/project/'+ projectData.name+"/sprint"} state={{projectData: projectData}}><span>Sprint</span></Link>
            <Link className="path" to={'/project/'+ projectData.name+"/board"} state={{projectData: projectData}}><span>Board</span></Link>

        </div>
        <div className="outlet-content">
            <Outlet></Outlet>
        </div>
    </div>
    )
}
export default ProjectCard
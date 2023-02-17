import "../css/Home.css"
import { useProjectsContext } from "../hooks/useProjectsContext"
import { useEffect } from "react"
import ProjectDetails from "../components/ProjectDetails"
import ProjectForm from "../components/ProjectForm"
import { useAuthContext } from "../hooks/useAuthContext"

const Home = ()=> {
	const {projects,dispatch} = useProjectsContext()
    const {user} = useAuthContext()
   
    useEffect(() => {
        const fetchProjects = async() => {
            const res = await fetch("/api/project",{
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const data = await res.json()
            if(res.ok) {
                dispatch({type: "SET_PROJECTS", payload: data})
            }
        }
        if(user) {
            fetchProjects()
        }
   
    },[dispatch,user])


    return (
        
        <div className="home">
            <div className="projects">
                <h3>Projects</h3>
                {projects && projects.map(project => (
                    <ProjectDetails
                        key={project._id}
                        project={project}
                    ></ProjectDetails>
                ))}
            </div>
            <ProjectForm></ProjectForm>
        </div>
    )
}

export default Home;
import "../css/ProjectDetails.css"
import { useProjectsContext } from "../hooks/useProjectsContext"
import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const ProjectDetails = ({project}) => {
    const {dispatch} = useProjectsContext()
	const {user} = useAuthContext()
	const handleClick = async() => {
		const res = await fetch("/api/project/"+ project._id,{
			method:"DELETE",
			headers:{
				"Authorization": `Bearer ${user.token}`
			}
		})
		const data = await res.json()

		if(res.ok) {
			dispatch({type: "DELETE_PROJECT",payload: data})
		}
	}

    return ( 
            <div className="card" >
                <h4>{project.name}</h4>
                <p>{project.description}</p>
				{/* without addSuffix it will say 2 days but with suffix it says 2 days ago */}
				<p className="date">{formatDistanceToNow(new Date (project.createdAt), {addSuffix:true})}</p> 
				<span onClick={handleClick} className="material-symbols-outlined">delete</span>
                <Link className="link" to={'project/'+ project.name} state={{projectData: project}}>Open Project</Link>
            </div>
    )
}
export default ProjectDetails;
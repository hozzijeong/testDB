import React, {useState, useEffect} from "react";
import TutorialDataService from "../Service/TutorialService"
import {Link} from "react-router-dom"

const TutorialList = () => {
    const [tutorials,setTutorials] = useState([]);
    const [currentTutorial, setCurrentTutorial] = useState(null)
    const [currentIdx, setCurrentIdx] = useState(-1)
    const [searchTitle, setSearchTitle] = useState("")

    useEffect(() => {
        retrieveTutorials();
    },[])

    const onChangeSearchTitle = e =>{
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle)
    }

    const retrieveTutorials = () =>{
        TutorialDataService.getAll()
        .then(response =>{
            setTutorials(response.data)
            console.log(response.data, "얻은 데이터")
        })
        .catch(e=>{
            console.log(e)
        })
    }

    const refreshList = () =>{
        retrieveTutorials();
        setCurrentTutorial(null);
        setCurrentIdx(-1)
    }

    const setActivateTutorial = (tutorial,index) => {
        setCurrentTutorial(tutorial);
        setCurrentIdx(index)
    }

    const removeAllTutorials = () => {
        TutorialDataService.removeAll()
        .then(response =>{
            console.log(response.data,"삭제한 데이터")
            refreshList()
        })
        .catch(e =>{
            console.log(e)
        })
    }

    const findByTitle = () => {
        TutorialDataService.findByTitle(searchTitle)
        .then(response => {
            setTutorials(response.data)
            console.log(response.data,"검색한 데이터")
        })
        .catch(e => {
            console.log(e)
        })
    }

    return(
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group md-3">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className = "input-group-append">
                        <button
                            classNAme = "btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className = "col-md-6">
                <h4>Tutorials List</h4>
                <ul className="list-group">
                    {tutorials && 
                        tutorials.map((tutorial,index) => (
                            <li 
                                className={
                                    "list-group-item" + (index === currentIdx ? "active" : "")
                                }
                                onClick = { () => setActivateTutorial(tutorial,index)}
                                key = {index}
                            >
                                {tutorial.title}
                            </li>
                    ))}
                </ul>

                <button 
                    classNAme="m-3 btn btn-sm btn-danger"
                    onClick = {removeAllTutorials}>
                        removeAll
                </button>
            </div>
            <div className="col-md-6">
                {currentTutorial ? (
                    <div>
                        <h4>Tutorial</h4>
                        <div> 
                            <label>
                                <strong>Title:</strong>
                            </label>{"  "}
                            {currentTutorial.title}
                        </div>
                        <div> 
                            <label>
                                <strong>Description:</strong>
                            </label>{"  "}
                            {currentTutorial.description}
                        </div>
                        <div> 
                            <label>
                                <strong>Status:</strong>
                            </label>{"  "}
                            {currentTutorial.published? "Published":"Pending"}
                        </div>
                        <Link
                            to = {"/tutorial/" + currentTutorial.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Tutorial...</p>    
                    </div>
                )}
            </div>

        </div>
    )

}

export default TutorialList
import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {TbEdit} from 'react-icons/tb'
import {RiDeleteBin6Line} from 'react-icons/ri'
import './Tasks.css'


function Tasks() {

  let [tasks,setTasks]=useState([])

  let [taskToEdit,setTaskToEdit]=useState({})

  let [err,setErr]=useState("")

  let [show,setShow]=useState(false)

  let showModal=()=>setShow(true)
  let closeModal=()=>setShow(false)

  let editTask=(taskObjToBeEdited)=>{
    showModal()
    setTaskToEdit(taskObjToBeEdited)
    //filling input fields
    setValue("Task",taskObjToBeEdited.Task)
    setValue("StartTime",taskObjToBeEdited.StartTime)
    setValue("EndTime",taskObjToBeEdited.EndTime)
    setValue("Category",taskObjToBeEdited.Category)
    setValue("Status",taskObjToBeEdited.Status)
  }

  let saveTask=()=>{
    closeModal()
    //get modified Task data
    let modifiedTask=getValues()
    //setting modified taskid
    modifiedTask.id=taskToEdit.id
    //http put request
    axios.put(`http://localhost:5000/Tasks/${modifiedTask.id}`,modifiedTask)
    .then(response=>{
      console.log(response)
      if(response.status===200){
      getTasks()
      }
    })
    .catch(err=>{
      if(err.response){
        setErr(err.message)
      }
      //network request error
      else if(err.request){
        setErr(err.message)
      }
      //other errors
      else{
        setErr(err.message)
      }

    })
  }


  useEffect(()=>{
    getTasks()
  },[])

  let getTasks=()=>
  //http get request
  axios.get(" http://localhost:5000/Tasks")
  .then(response=>{
    if(response.status===200){
    setTasks(response.data)
    }
  })
  .catch(err=>{
    if(err.response){
      setErr(err.message)
    }
    //network request error
    else if(err.request){
      setErr(err.message)
    }
    //other errors
    else{
      setErr(err.message)
    }
  })

  let {
    register,
    setValue,
    getValues
  }=useForm()

  let deleteAllTasks=()=>{
    tasks.map((taskObj)=>
      axios.delete(`http://localhost:5000/Tasks/${taskObj.id}`)
      .then(response=>{
        if(response.status===200){
          getTasks();
        }
      })
      .catch(err=>{
        if(err.response){
          setErr(err.message)
        }
        //network request error
        else if(err.request){
          setErr(err.message)
        }
        //other errors 
        else{
          setErr(err.message)
        }

      })
    )
  }

  let deleteTask=(taskToBeDeleted)=>{
    //delete request
    axios.delete(` http://localhost:5000/Tasks/${taskToBeDeleted.id}`)
    .then(response=>{
      if(response.status===200){
        getTasks()
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }




  return (
    <div className='container'>
      <div className="active-header row">
        
        <p className='display-3 mt-2 text-white fw-bold text-center'>Tasks
        {/*button to edit*/}
        <button className="btn btn-danger ms-3" onClick={deleteAllTasks} >
        ClearAll <span className=''><RiDeleteBin6Line /></span>
                  </button>
        </p>
        {err.length!==0 && <h2 className="display-2 text-danger text-center">{err}</h2>}

      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2">
        {
          tasks.map((taskObj)=>
            <div className="col text-center mx-auto" key={taskObj.id}>
              <div className="card text-center mt-2  text-white bg-black bg-opacity-75 rounded ">
                <div className="card-body " >
                  <p className="display-6 taskname fw-semibold ">{taskObj.Task}</p>
                  <hr />
                  <p className="fw-semibold ">{taskObj.StartTime}-{taskObj.EndTime}</p>
                  <p className="">{taskObj.Category}</p>
                  <p className="fst-italic text-decoration-underline">{taskObj.Status}</p>
                  
                  {/*button to edit*/}
                  <button className="btn text-center text-white fw-light" onClick={()=>editTask(taskObj)} >
                    Edit<span className='fs-4 text-warning'><TbEdit /></span>
                  </button>

                  {/*button to delete*/}
                  <button className="btn text-center text-white fw-light" onClick={()=>deleteTask(taskObj)} >
                    delete<span className='fs-4 text-danger'><RiDeleteBin6Line /></span>
                  </button>
                  
                  
                </div>
            
              </div>
              
            </div>
          )
        }
      </div>

      {/*modal for editing*/}
      <Modal 
      show={show}
      onHide={closeModal}
      backdrop="static"
      centered
      className="modal" >
        
        {/*modal header*/}
        <Modal.Header>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        {/*modal body*/}
        <Modal.Body>
        <form  className="bg-white rounded p-3 modalForm" >
        
        <div className="row">
          <div className="mb-3">

                        <label htmlFor="Task" className='mb-2 fw-bold'>Task</label>
                        <input type="text" id="Task" className="form-control" 
                        {...register("Task")} />
                        
          </div>

          <div className="mb-3">
                        <label htmlFor="StartTime" className='mb-2 fw-bold'>StartTime</label>
                        <input type="time" className='form-control' required 
                        {...register("StartTime")} />
                        
          </div>

          <div className=" mb-3">
                        <label htmlFor="EndTime" className='mb-2 fw-bold'>EndTime</label>
                        <input type="time" className='form-control' required 
                        {...register("EndTime")} />              
          </div>

          <div className=" mb-3">
                        <label htmlFor="Category" className='fw-bold mb-2'>Category</label>
                        <select {...register("Category")} name="Category" id="Category" className="form-select mb-3">

                        
                        <option value="Personal">Personal</option>
                        <option value="Work">Work</option>
                        <option value="College">College</option>
                        <option value="Entertainment">Entertainment</option>


                        </select>
                        
          </div>

          <div className=" ">
                        <label htmlFor="Status" className='fw-bold mb-2'>Status</label>
                        <select {...register("Status")} name="Status" id="Status" className="form-select mb-3" defaultValue={""}>

                        <option value=""></option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        </select>
                        
          </div>
        </div>   
      </form>

        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success"onClick={saveTask} >save</button>
          <button className="btn btn-light"onClick={closeModal} >close</button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Tasks
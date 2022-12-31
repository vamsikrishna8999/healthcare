import React, { useState } from 'react'
import './Today.css'
import {useForm} from 'react-hook-form'
import {CgAdd} from 'react-icons/cg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Today() {
  let navigate=useNavigate()

  

  let [err,setErr]=useState("")

  let {
    register,
    handleSubmit,
    formState:{errors},
}= useForm()




let submitForm=(data)=>{
    //post request to Tasks
    axios.post("http://localhost:5000/Tasks",data)
    .then(response=>{
      if(response.status===201){
        setErr("")
        navigate("/Tasks")
      }
    })
    .catch(err=>{
      // response error 
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
  return (
    <div className="today">
      <div className='container'>
      <div className="row ">
        <div className=" mx-auto">
          <div className="pt-5">
            {err.length!==0 && <h2 className="display-2 text-danger text-center">{err}</h2>}
            <p className="display-3 text-white text-center fw-bold header">Tasklist</p>
          </div>
          <form onSubmit={handleSubmit(submitForm)} className="bg-black text-white p-5 mb-5 bg-opacity-25 rounded-circle " >
        
            <div className="row">
              <div className="col-12 col-sm-6 col-md-3 mb-3">

                            <label htmlFor="Task" className='mb-2 fw-bold labels'>Task</label>
                            <input type="text" id="Task" className="form-control" 
                            {...register("Task",{required:"*Please provide Task"})} />
                            {errors && 
                            <p className="text-warning fw-bold">{errors.Task?.message}</p> }
              </div>

              <div className="col-sm-6 col-md-2  mb-3">
                            <label htmlFor="StartTime" className='mb-2 fw-bold labels'>StartTime</label>
                            <input type="time" className='form-control' required 
                            {...register("StartTime",{required:true})} />
                            
              </div>

              <div className="col-sm-6 col-md-2 mb-3">
                            <label htmlFor="EndTime" className='mb-2 fw-bold labels'>EndTime</label>
                            <input type="time" className='form-control' required 
                            {...register("EndTime",{required:true})} />              
              </div>

              <div className="col-sm-6 col-md-2 mb-3">
                            <label htmlFor="Category" className='fw-bold mb-2 labels'>Category</label>
                            <select {...register("Category",{required:"Category required"})} name="Category" id="Category" className="form-select mb-3">

                            
                            <option value="Personal">Personal</option>
                            <option value="Work">Work</option>
                            <option value="College">College</option>
                            <option value="Entertainment">Entertainment</option>


                            </select>
                            <p className="text-danger">{errors.Category?.message}</p> 
              </div>

              <div className="col-sm-6 col-md-2  mb-3">
                            <label htmlFor="Status" className='fw-bold mb-2 labels'>Status</label>
                            <select {...register("Status",{required:"*Please provide Status"})} name="Status" id="Status" className="form-select mb-3" defaultValue={""}>

                            <option value="" disabled>Choose</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                            </select>
                            <p className="text-warning fw-bold">{errors.Status?.message}</p> 
              </div>

              <div className="col-sm-6 col-md-1 pt-1">
                
                <button className="btn mt-4 float-end"type='submit'>
                  <span className='fs-2 text-light '><CgAdd /></span>

                </button>
              </div>

            </div>   
          </form>
        </div>
      </div> 
      
    </div>

    </div>
    
  )
}



export default Today;
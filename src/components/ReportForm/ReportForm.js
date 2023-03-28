import React, { useState } from 'react'
import './ReportForm.css'
import {useForm} from 'react-hook-form'
import {CgAdd} from 'react-icons/cg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ReportForm() {
  let navigate=useNavigate()

  

  let [err,setErr]=useState("")
  

  let {
    register,
    handleSubmit,
    formState:{errors},
}= useForm()




let submitForm=(data)=>{
    //post request to Tasks
    axios.post("http://localhost:5000/Reports",data)
    .then(response=>{
      if(response.status===201){
        setErr("")
        navigate("/Report")
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
            <p className="display-3 text-white text-center fw-bold header">Enter Details</p>
          </div>
          <form onSubmit={handleSubmit(submitForm)} className="bg-black text-white p-5 mb-5 bg-opacity-25 rounded-circle " >
        
            <div className="row">
              <div className="col-12 col-sm-6 col-md-3 mb-3">

                            <label htmlFor="Test" className='mb-2 fw-bold labels'>Testname</label>
                            <input type="text" id="Test" className="form-control" 
                            {...register("Test",{required:"*Please provide testname"})} />
                            {errors && 
                            <p className="text-warning fw-bold">{errors.Test?.message}</p> }
              </div>

              <div className="col-12 col-sm-6 col-md-3 mb-3">

                            <label htmlFor="Lab" className='mb-2 fw-bold labels'>lab/address</label>
                            <input type="text" id="Lab" className="form-control" 
                            {...register("Lab",{required:"*Please provide Lab"})} />
                            {errors && 
                            <p className="text-warning fw-bold">{errors.Lab?.message}</p> }
              </div>

              <div className="col-12 col-sm-6 col-md-3 mb-3">
                            <label htmlFor="visit" className='mb-2 fw-bold labels'>Conducted on</label>
                            <input type="date" id="visit" className="form-control" 
                            {...register("Visit",{required:true})} />
                            
              </div>

              <div className="col-12 col-sm-6 col-md-3 mb-3">

                            <label htmlFor="Found" className='mb-2 fw-bold labels'>Diseases found</label>
                            <input type="text" id="Found" className="form-control" 
                            {...register("Found",{required:"*Please provide Doctor"})} />
                            {errors && 
                            <p className="text-warning fw-bold">{errors.Found?.message}</p> }
              </div>

              <div className="col-sm-6 col-md-2  mb-3">
                            <label htmlFor="Status" className='fw-bold mb-2 labels'>Status</label>
                            <select {...register("Status",{required:"*Please provide Status"})} name="Status" id="Status" className="form-select mb-3" defaultValue={""}>

                            <option value="" disabled>Choose</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Cured</option>
                            </select>
                            <p className="text-warning fw-bold">{errors.Status?.message}</p> 
              </div>

              


              

            </div> 
            
            <div className="text-center">
            <button className="btn mt-4 btn-success"type='submit'>
                  <span className='fs-2 text-light'>Add<CgAdd /></span>

                </button>

            </div>
                
                
             
          </form>
        </div>
      </div> 
      
    </div>

    </div>
    
  )
}



export default ReportForm;
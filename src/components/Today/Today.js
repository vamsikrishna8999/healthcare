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
    axios.post("http://localhost:5000/Records",data)
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
            <p className="display-3 text-white text-center fw-bold header">Enter Details</p>
          </div>
          <form onSubmit={handleSubmit(submitForm)} className="bg-black text-white p-5 mb-5 bg-opacity-25 rounded-circle " >
        
            <div className="row">
              <div className="col-12 col-sm-6 col-md-3 mb-3">

                            <label htmlFor="disease" className='mb-2 fw-bold labels'>Disease</label>
                            <input type="text" id="disease" className="form-control" 
                            {...register("Disease",{required:"*Please provide disease"})} />
                            {errors && 
                            <p className="text-warning fw-bold">{errors.Disease?.message}</p> }
              </div>

              <div className="col-12 col-sm-6 col-md-3 mb-3">

                            <label htmlFor="hospital" className='mb-2 fw-bold labels'>Hospital</label>
                            <input type="text" id="doc" className="form-control" 
                            {...register("Hospital",{required:"*Please provide Hospital"})} />
                            {errors && 
                            <p className="text-warning fw-bold">{errors.Hospital?.message}</p> }
              </div>

              <div className="col-12 col-sm-6 col-md-3 mb-3">

                            <label htmlFor="doc" className='mb-2 fw-bold labels'>Doctor</label>
                            <input type="text" id="doc" className="form-control" 
                            {...register("Doctor",{required:"*Please provide Doctor"})} />
                            {errors && 
                            <p className="text-warning fw-bold">{errors.Doctor?.message}</p> }
              </div>

              <div className="col-12 col-sm-6 col-md-3 mb-3">
                            <label htmlFor="visit" className='mb-2 fw-bold labels'>Visited on</label>
                            <input type="date" id="visit" className="form-control" 
                            {...register("Visit",{required:true})} />
                            
              </div>

              <div className="col-12 mb-3">

                            <label htmlFor="prescription" className='mb-2 fw-bold labels'>Prescription</label>
                            <input type="text" id="prescription" className="form-control" 
                            {...register("Prescription",{required:"*Please provide prescription"})} />
                            {errors && 
                            <p className="text-warning fw-bold">{errors.Prescription?.message}</p> }
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



export default Today;
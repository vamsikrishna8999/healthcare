import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {TbEdit} from 'react-icons/tb'
import {RiDeleteBin6Line} from 'react-icons/ri'
import './Report.css'


function Report() {


  let [records,setRecords]=useState([])

  let [recordToEdit,setRecordToEdit]=useState({})

  let [err,setErr]=useState("")

  let [show,setShow]=useState(false)

  let showModal=()=>setShow(true)
  let closeModal=()=>setShow(false)

  let editRecord=(recordObjToBeEdited)=>{
    showModal()
    setRecordToEdit(recordObjToBeEdited)
    //filling input fields
    setValue("Disease",recordObjToBeEdited.Test)
    setValue("Hospital",recordObjToBeEdited.Lab)
    setValue("Doctor",recordObjToBeEdited.Visit)
    setValue("visited on",recordObjToBeEdited.Found)
    setValue("Prescription",recordObjToBeEdited.Status)
  }

  let saveRecord=()=>{
    closeModal()
    //get modified Task data
    let modifiedRecord=getValues()
    //setting modified taskid
    modifiedRecord.id=recordToEdit.id
    //http put request
    axios.put(`http://localhost:5000/Reports/${modifiedRecord.id}`,modifiedRecord)
    .then(response=>{
      console.log(response)
      if(response.status===200){
      getRecords()
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
    getRecords()
  },[])

  let getRecords=()=>
  //http get request
  axios.get(" http://localhost:5000/Reports")
  .then(response=>{
    if(response.status===200){
    setRecords(response.data)
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

  let deleteAllRecords=()=>{
    records.map((recordObj)=>
      axios.delete(`http://localhost:5000/Records/${recordObj.id}`)
      .then(response=>{
        if(response.status===200){
          getRecords();
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

  let deleteRecord=(recordToBeDeleted)=>{
    //delete request
    axios.delete(` http://localhost:5000/Reports/${recordToBeDeleted.id}`)
    .then(response=>{
      if(response.status===200){
        getRecords()
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }




  return (
    <div className='container'>
      <div className="active-header row">
        
        <p className='display-3 mt-2 text-white fw-bold text-center'>Patient report Details
        <button className="btn btn-danger ms-3" onClick={deleteAllRecords} >
        ClearAll <span className=''><RiDeleteBin6Line /></span>
                  </button>
        </p>
        {err.length!==0 && <h2 className="display-2 text-danger text-center">{err}</h2>}

      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-2 g-2">
        {
          records.map((recordObj)=>
            <div className="col text-center mx-auto" key={recordObj.id}>
              <div className="card text-center mt-2  text-white bg-black bg-opacity-75 rounded ">
                <div className="card-body " >
                  <p className="lead taskname fw-semibold ">Test : {recordObj.Test}</p>
                  <hr />
                  <p className="fw-semibold ">Lab : {recordObj.Lab}</p>
                  <p className="">Date : {recordObj.Visit}</p>
                  <p className="fw-semibold ">Found : {recordObj.Found}</p>
                  <p className="">Status : {recordObj.Status}</p>
                  
                  {/*button to edit*/}
                  <button className="btn text-center text-white fw-light" onClick={()=>editRecord(recordObj)} >
                    Edit<span className='fs-4 text-warning'><TbEdit /></span>
                  </button>

                  {/*button to delete*/}
                  <button className="btn text-center text-white fw-light" onClick={()=>deleteRecord(recordObj)} >
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
          <Modal.Title>Edit Record</Modal.Title>
        </Modal.Header>
        {/*modal body*/}
        <Modal.Body>
        <form  className="bg-white rounded p-3 modalForm" >
        
        <div className="row">
              <div className="col-12 col-sm-6 col-md-3 mb-3">

                            <label htmlFor="Test" className='mb-2 fw-bold labels'>Testname</label>
                            <input type="text" id="Test" className="form-control" 
                            {...register("Test")} />
                            
              </div>

              <div className="col-12 col-sm-6 col-md-3 mb-3">

                            <label htmlFor="Lab" className='mb-2 fw-bold labels'>lab/address</label>
                            <input type="text" id="Lab" className="form-control" 
                            {...register("Lab")} />
                            
              </div>

              <div className="col-12 col-sm-6 col-md-3 mb-3">
                            <label htmlFor="visit" className='mb-2 fw-bold labels'>Conducted on</label>
                            <input type="date" id="visit" className="form-control" 
                            {...register("Visit")} />
                            
              </div>

              <div className="col-12 col-sm-6 col-md-3 mb-3">

                            <label htmlFor="Found" className='mb-2 fw-bold labels'>Diseases found</label>
                            <input type="text" id="Found" className="form-control" 
                            {...register("Found")} />
                            
              </div>

              <div className="col-sm-6 col-md-2  mb-3">
                            <label htmlFor="Status" className='fw-bold mb-2 labels'>Status</label>
                            <select {...register("Status")} name="Status" id="Status" className="form-select mb-3" defaultValue={""}>

                            <option value="" disabled>Choose</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Cured</option>
                            </select>
                            
              </div>

              


              

            </div>    
      </form>

        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success"onClick={saveRecord} >save</button>
          <button className="btn btn-light"onClick={closeModal} >close</button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Report
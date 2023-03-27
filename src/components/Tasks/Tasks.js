import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {TbEdit} from 'react-icons/tb'
import {RiDeleteBin6Line} from 'react-icons/ri'
import './Tasks.css'


function Tasks() {


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
    setValue("Disease",recordObjToBeEdited.Disease)
    setValue("Hospital",recordObjToBeEdited.Hospital)
    setValue("Doctor",recordObjToBeEdited.doc)
    setValue("visited on",recordObjToBeEdited.Visit)
    setValue("Prescription",recordObjToBeEdited.Prescription)
  }

  let saveRecord=()=>{
    closeModal()
    //get modified Task data
    let modifiedRecord=getValues()
    //setting modified taskid
    modifiedRecord.id=recordToEdit.id
    //http put request
    axios.put(`http://localhost:5000/Tasks/${modifiedRecord.id}`,modifiedRecord)
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
  axios.get(" http://localhost:5000/Records")
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
    axios.delete(` http://localhost:5000/Records/${recordToBeDeleted.id}`)
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
        
        <p className='display-3 mt-2 text-white fw-bold text-center'>Patient Details
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
                  <p className="lead taskname fw-semibold ">Disease : {recordObj.Disease}</p>
                  <hr />
                  <p className="fw-semibold ">Hospital : {recordObj.Hospital}</p>
                  <p className="fw-semibold ">Doctor : {recordObj.Doctor}</p>
                  <p className="">Visited on : {recordObj.Visit}</p>
                  <p className="fst-italic text-decoration-underline">Prescription - {recordObj.Prescription}</p>
                  
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
          <div className="mb-3">

                        <label htmlFor="Disease" className='mb-2 fw-bold'>Disease</label>
                        <input type="text" id="Disease" className="form-control" 
                        {...register("Disease")} />
                        
          </div>
          <div className="mb-3">

                        <label htmlFor="hospital" className='mb-2 fw-bold'>Hospital</label>
                        <input type="text" id="hospital" className="form-control" 
                        {...register("Hospital")} />
                        
          </div>

          

          <div className="mb-3">

                        <label htmlFor="Doctor" className='mb-2 fw-bold'>Doctor</label>
                        <input type="text" id="Doctor" className="form-control" 
                        {...register("Doctor")} />
                        
          </div>

          <div className="mb-3">

                        <label htmlFor="Visit" className='mb-2 fw-bold'>Visited on</label>
                        <input type="date" id="Visit" className="form-control" 
                        {...register("Visit")} />
                        
          </div>

          <div className="mb-3">

                        <label htmlFor="Prescription" className='mb-2 fw-bold'>Prescription</label>
                        <input type="text" id="Prescription" className="form-control" 
                        {...register("Prescription")} />
                        
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

export default Tasks
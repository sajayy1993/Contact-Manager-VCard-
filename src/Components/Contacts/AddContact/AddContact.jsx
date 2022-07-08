import React, { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContactService } from '../../../Services/ContactService';

const AddContact = () => {
let navigate= useNavigate();

let [state,setState]=useState({
 loading:false,
 contact:{
          name:'',
          photo:'',
          mobile:'',
          email:'',
          company:'',
          title:'',
          groupId:''
 },
 groups:{},
 errorMessage:''

});

let updateInput=(e)=>{
  setState({
    ...state,
    contact:{
      ...state.contact,
      [e.target.name]: e.target.value

    }

  });
};

useEffect(()=> {
  ( async ()=>{try{
  setState({...state, loading:true});
let response = await ContactService.getGroups();
setState({
  ...state,
  loading:false,
  groups:response.data

})

}catch(error){
 setState({
  ...state,
  loading:false,
  errorMessage:error.message
 });
}}) ();
  },[]);


  let submitForm= async(e)=>{
    e.preventDefault();
    try{
  let response=await ContactService.createContact(state.contact);
  if(response){
    navigate('/contacts/list', {replace:true});
  }
    }catch(error){
setState({...state, errorMessage:error.message});
navigate('/contacts/add',{replace:false})
    }
  };
let {loading, contact, groups, errorMessage}=state;

  return (
    <>
    <section className='add-contact p-3'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <p className='h4 text-success fw-bold'> Create Contact</p>
            <p className='fst-italic'>Here you create a new Contact (Virtual Card) Card for your data storing convenience.</p>
          </div>
        </div>
      
      <div className='row'>
        <div className='col-md-4'>
          <form onSubmit={submitForm}>
            <div className='mb-2'>
              <input 
              required={true}
              name='name'  
              value={contact.name}
               onChange={updateInput} 
               type='text' 
                className='form-control' 
                placeholder='Name' />
            </div>
            <div className='mb-2'>
              <input 
               required={true}
              name='photo'  
              value={contact.photo}
               onChange={updateInput} type='text'  className='form-control' placeholder='Photo Url' />
            </div>
            <div className='mb-2'>
              <input 
               required={true}
              name='mobile'  
              value={contact.mobile}
               onChange={updateInput} type='number'  className='form-control' placeholder='Mobile' />
            </div>
            <div className='mb-2'>
              <input 
               required={true}
              name='email'  
              value={contact.email}
               onChange={updateInput} type='email'  className='form-control' placeholder='Email' />
            </div>
            <div className='mb-2'>
              <input
               required={true}
              name='company'  
              value={contact.company}
               onChange={updateInput}  type='text'  className='form-control' placeholder='Company' />
            </div>
            <div className='mb-2'>
              <input 
               required={true}
              name='title'  
              value={contact.title}
               onChange={updateInput} type='text'  className='form-control' placeholder='Title' />
            </div>
            <div className='mb-2'>
              <select 
               required={true}
              name='groupId'  
              value={contact.groupId}
               onChange={updateInput}  className='form-control'>
                <option value=''>Select a Group</option>
                {
                  groups.length>0&&
                  groups.map(groups=>{
                    return(
                      <option key={groups.id} value={groups.id}>{groups.name}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className='mb-2'>
              <input type='submit'  className='btn btn-success' value='Create' />
              <Link to={'/contacts/list'} className='btn btn-dark ms-2'> Cancel </Link>
            </div>
          </form>
        </div>
      </div>
      </div>
    </section>
    </>
  )
}

export default AddContact;
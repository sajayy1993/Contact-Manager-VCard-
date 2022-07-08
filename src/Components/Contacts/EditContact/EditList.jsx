import React, {useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ContactService } from '../../../Services/ContactService';
import Spinner from '../../Sppiner/Spinner';


const EditList = () => {

  let navigate = useNavigate();

  let {contactId}=useParams();

  let [state,setState]=useState({
    loading:false,
    contacts:{
      name:'',
      photo:'',
      mobile:'',
      email:'',
      company:'',
      title:'',
      groupId:''
    },
    groups:[],
    errorMessage:''
     });

     useEffect(()=> {
      ( async ()=>{try{
      setState({...state, loading:true});
    let response = await ContactService.getContacts(contactId);
    let groupResponse = await ContactService.getGroups();
    setState({
      ...state,
      loading:false,
      contacts:response.data,
      groups:groupResponse.data    
    })
    
    }catch(error){
     setState({
      ...state,
      loading:false,
      errorMessage:error.message
     });
    }}) ();
      },[contactId]);

      let updateInput=(event)=>{
        setState({
          ...state,
          contacts:{
            ...state.contacts,
            [event.target.name]:event.target.value
          }
        });
      };
      
      let submitForm=async(event)=>{
       event.preventDefault();
       try{
        let response=await ContactService.updateContact(state.contacts, contactId);
      
        if(response){
          navigate('/contacts/list', {replace:true});
        }
          }catch(error){
      setState({...state, errorMessage:error.message});
      navigate(`/contacts/edit/${contactId}`,{replace:false})
          }
          
        };

      let {loading, contacts, groups, errorMessage}=state;

  return (
    <>
{
  loading ? <Spinner /> :<>
  <section className='add-contact p-3'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <p className='h4 text-primary fw-bold'> Edit Contact</p>
            <p className='fst-italic'>Update your virtual card </p>
          </div>
        </div>
      
      <div className='row align-items-center'>
        <div className='col-md-4 '>
          <form onSubmit={submitForm}>
            <div className='mb-2'>
              <input 
              required={true}
              name='name'
              value={contacts.name}
              onChange={updateInput}
              type='text'  className='form-control' placeholder='Name' />
            </div>
            <div className='mb-2'>
              <input 
              required={true}
              name='photo'
              value={contacts.photo}
              onChange={updateInput} type='text'  className='form-control' placeholder='Photo Url' />
            </div>
            <div className='mb-2'>
              <input 
              required={true}
              name='mobile'
              value={contacts.mobile}
              onChange={updateInput} type='number'  className='form-control' placeholder='Mobile' />
            </div>
            <div className='mb-2'>
              <input required={true}
              name='email'
              value={contacts.email}
              onChange={updateInput} type='email'  className='form-control' placeholder='Email' />
            </div>
            <div className='mb-2'>
              <input 
              required={true}
              name='company'
              value={contacts.company}
              onChange={updateInput}type='text'  className='form-control' placeholder='Company' />
            </div>
            <div className='mb-2'>
              <input 
              required={true}
              name='title'
              value={contacts.title}
              onChange={updateInput}type='text'  className='form-control' placeholder='Title' />
            </div>
            <div className='mb-2'>
              <select 
                required={true}
              name='groupId'
              value={contacts.groupId}
              onChange={updateInput}className='form-control'>
                <option value=''>Select a Group</option>
                {
                  groups.length > 0 &&
                  groups.map(group=>{
                    return(
                      <option key={group.id} value={group.id}>{group.name}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className='mb-2'>
              <input type='submit'  className='btn btn-primary' value='Update' />
              <Link to={'/contacts/list'} className='btn btn-dark ms-2'> Cancel </Link>
            </div>
          </form>
        </div>
        <div className='col-md-6'>
          <img src={contacts.photo} alt='' className='img-fluid contact-img'/>
        </div>
      </div>
      </div>
    </section>
  </>
}
    
    </>
  )
};

export default EditList;
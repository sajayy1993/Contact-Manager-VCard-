import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { ContactService } from '../../../Services/ContactService';
import Spinner from '../../Sppiner/Spinner';


const ContactList= () => {


  let [query,setQuery]= useState({
    text:''
  })

  let [state,setState]=useState({
 loading:false,
 contacts:[],
 filterContacts:[],
 errorMessage:''
  });

  useEffect(()=> {
  ( async ()=>{try{
  setState({...state, loading:true});
let response = await ContactService.getAllContacts();
setState({
  ...state,
  loading:false,
  contacts:response.data,
  filterContacts:response.data

})

}catch(error){
 setState({
  ...state,
  loading:false,
  errorMessage:error.message
 });
}}) ();
  },[]);


  // delete data

  let clickDelete = async(contactId)=>{
    try{
let response =await ContactService.deleteContact(contactId);
if(response){
  setState({...state, loading:true});
let response = await ContactService.getAllContacts();
setState({
  ...state,
  loading:false,
  contacts:response.data,
  filterContacts:response.data
});
}

    }catch(error){
      setState({
        ...state,
        loading:false,
        errorMessage:error.message
      });
    }
  };

  let  serachContacts= (event)=>{
    setQuery({...query, text :event.target.value});
    let theContacts = state.contacts.filter(contacts=>{
      return contacts.name.toLowerCase().includes(event.target.value.toLowerCase())
    });
setState({
  ...state,
  filterContacts:theContacts
});
  };

  let {loading, contacts,errorMessage, filterContacts}= state;

  return (
    <>

    <section className='contact-search p-3'>
    <div className='container'>
      <div className='grid'>
        <div className='row'>
          <div className='col'>
            <p className='h3 fw-bold' > Contact Manager
            <Link to={'/contacts/add'} className='btn btn-primary ms-2'>
            <i className='fa fa-plus-circle me-2'/> New </Link></p>
            <p className='fst-italic'> A contact manager is a software program that enables users to easily store and find contact information, such as names, Company, and Mobile numbers. They are contact-centric databases that provide a fully integrated approach to tracking all information and communication activities linked to contacts. Simple ones for personal use are included in most smartphones. The main reference standard for contact data and metadata, semantic and interchange, is the virtual Card.</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
          <form className='row'>
          <div className='col'>
          <div className='mb-2'>
              <input
              name='text'
              value={query.text}
              onChange={serachContacts}
               type='text' className='form-control' placeholder='Search Name'/>
            </div>
          </div>
           <div className='col'>
           <div className='mb-2'>
              <input type='submit' className='btn btn-outline-dark' value='Search'/>
            </div>
           </div>
           
          </form>

          </div>
        </div>
      </div>
    </div>
    </section>
   {
    loading ? <Spinner/>:<>
    <section className='contact-list'>
      <div className='container'>
        <div  className='row'>
        {
          filterContacts.length> 0 &&
          filterContacts.map(contacts=>{
            return(
              <div className='col-md-6' key={contacts.id}> 
            <div className='card my-2'>
              <div className='card-body'>
                <div className='row align-items-center d-flex justify-content-around '>
                <div className='col-md-4'>
                <img src= {contacts.photo} alt="" className='contact-img'/>

                </div>
                <div className='col-md-7'>
                <ul className='list-group'>
                  <li className='list-group-item list-group-item-action'>
                    Name : <span className='fw-bold'>{contacts.name}</span>
                  </li>
                  <li className='list-group-item list-group-item-action'>
                    Mobile : <span className='fw-bold'>{contacts.mobile}</span>
                  </li>
                  <li className='list-group-item list-group-item-action'>
                    Email : <span className='fw-bold'>{contacts.email}</span>
                  </li>
                </ul>

                </div>
                <div className='col-md-1 d-flex flex-column align-items-center'>
                <Link to={`/Contacts/view/${contacts.id}`}className='btn btn-warning my-1'>
                  <i className='fa fa-eye'/>

                </Link>
                <Link to={`/Contacts/edit/${contacts.id}`}className='btn btn-primary my-1'>
                  <i className='fa fa-pen'/>
                  
                </Link>
                <button className='btn btn-danger my-1' onClick={()=>clickDelete(contacts.id)}>
                  <i className='fa fa-trash'/>
                  
                </button>

                </div>
                </div>
              </div>
            </div>
          </div>
         
            )
          })
        }
          
        </div>
      </div>
    </section>
    </>
   }
     
      </>
    

   
   
  
  )
}

export default ContactList;

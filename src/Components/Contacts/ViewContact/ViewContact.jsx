import React, { useEffect,useState } from 'react'
import { Link, useParams} from 'react-router-dom'
import { ContactService } from '../../../Services/ContactService';
import Spinner from '../../Sppiner/Spinner';

const ViewContact = () => {

  let {contactId}=useParams();

  let [state, setState]=useState({
loading:false,
contacts:[],
errorMessage:'',
group:{}
  });

  useEffect(()=> {
    ( async ()=>{try{
    setState({...state, loading:true});
  let response = await ContactService.getContacts(contactId);
  let groupResponse = await ContactService.getGroup(response.data);
  setState({
    ...state,
    loading:false,
    contacts:response.data,
    group:groupResponse.data
  
  })
  
  }catch(error){
   setState({
    ...state,
    loading:false,
    errorMessage:error.message
   });
  }}) ();
    },[contactId]);
    let {loading, contacts, errorMessage, group}=state;
  return (
    <>

    <section className='view-contact-intro p-3'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <p className='h3 text-warning  fw-bold'>
              View Contact
            </p>
            <p className='fst-italic'>SLDeVpmaqEuog2LTqLXawRwsrcOxnEMuLGuyRSNc0OY4Oa4AhzSCCDsII2hVrjmhtKTULs6O8lOTeSic7Vr2vhPyHdGw9luq6F0tDVwsnpnZMd6nMcNrHDc4cF7ePlmc</p>
          </div>
        </div>
      </div>
    </section>
    {
      loading? <Spinner />:<>
      {
        Object.keys(contacts).length>0 && Object.keys(group).length > 0 &&
        <section className='view-contact mt-3'>
    <div className='container'>
      <div className='row align-items-center'>
        <div className='col-md-4'>
<img src={contacts.photo}alt='' className='img-fluid contact-img'/>
        </div>
        <div className='col-md-8'>
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
                  <li className='list-group-item list-group-item-action'>
                    Company : <span className='fw-bold'>{contacts.company}</span>
                  </li>
                  <li className='list-group-item list-group-item-action'>
                    Title : <span className='fw-bold'>{contacts.title}</span>
                  </li>
                  <li className='list-group-item list-group-item-action'>
                    Group : <span className='fw-bold'>{group.name}</span>
                  </li>
                </ul>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Link to={'/contacts/list'} className='btn btn-warning'>Back</Link>
        </div>
      </div>
    </div>

    </section>

      }
      </>
    }

    </>
  )
}

export default ViewContact
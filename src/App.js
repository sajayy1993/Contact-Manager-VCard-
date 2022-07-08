import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import AddContact from './Components/Contacts/AddContact/AddContact';
import ContactList from './Components/Contacts/ContactList/ContactList';
import EditList from './Components/Contacts/EditContact/EditList';
import ViewContact from './Components/Contacts/ViewContact/ViewContact';
import Navbar from './Components/Navbar/Navbar';
import Spinner from './Components/Sppiner/Spinner';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path={'/'} element={<Navigate to={'/contacts/list'}/>}/>
        <Route path={'/contacts/list'} element={<ContactList/>} />
        <Route path={'/Contacts/add'} element={<AddContact/>} />
        <Route path={'/Contacts/edit/:contactId'} element={<EditList/>} />
        <Route path={'/Contacts/view/:contactId'} element={<ViewContact/>} />
      </Routes>
    </>
  )
}

export default App

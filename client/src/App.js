import React from 'react';

import { Route ,Routes } from 'react-router-dom'
import HomePage from './pages/homepage/HomePage';
import CreateForm from './pages/CreateForm/CreateForm';
import EditForm from './pages/editForm/EditForm';
import ViewForm from './pages/viewForm/ViewForm';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form/create" element={<CreateForm />} />
        <Route path="/form/:id/edit" element={<EditForm />} />
        <Route path="/form/:id" element={<ViewForm />} />
        {/* <Route path="/form/input" element={<Flo label={"Name"} placeholder={"Enter Your Name"} type='text'/>} /> */}

      </Routes>
    
  );
}

export default App;

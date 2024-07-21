import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Homepage.css'
import { getForms,delateForm } from "../../services/formService";

const HomePage = () => {
  const [forms, setForms] = useState([]);
  const [status, setStatus] = useState("loading");

  const fetchForms = async () => {
    try {
      const data = await getForms();
      setForms(data);
      setStatus(data.length > 0 ? "loaded" : "empty");
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    await delateForm(id);
    fetchForms();
  };

  return (
    <div className="homepage">
      <div  className="form-create-page">
        <h1>Welcome to Form.com</h1>
        <p>This is a simple form builder.</p>
        <Link className="link" type="button" to="/form/create">
          CREATE NEW FORM
        </Link>
      </div>
        <div className="underline"/>
      <hr />
      <>
      <h1 className="form-Text">Forms</h1>
        {status === "loading" ? (
          <div className="message">Loading forms...</div>
        ) : status === "error" ? (
          <div className="message">Error loading forms</div>
        ) : status === "empty" ? (
          <div className="message">You have to no forms created yet.</div>
        ) : (
          <div className="form-div">
            
            <ul>
              {forms.map((form) => (
                <div className="subForm">
                  <li key={form._id}>
                    <h3>{form.title}</h3>
                    <div className="naviagtion">
                      <Link className="view" to={`/form/${form._id}`}>VIEW</Link>
                      <Link className="edit" to={`/form/${form._id}/edit`}>EDIT</Link>
                      <Link className="button" onClick={() => handleDelete(form._id)}>
                        DELETE
                      </Link>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}
      </>
    </div>
  );
};

export default HomePage;

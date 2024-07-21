import "./ViewForm.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFormById, submitFormData } from "../../services/formService";
import FloatingLabelInput from "../formInput/FloatingInput";
const ViewForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      const form = await getFormById(id);
      setForm(form);
    };
    fetchForm();
  }, [id]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = () => {
    setFormData(formData);
    submitFormData(formData);
    console.log(formData);
    navigate('/')
    alert('Form Submitted SuccessFully...')
  };

  if (!form) return <div>Loading...</div>;

  

  return (
    <div className="ViewFormWrapper">
      <div className="ViewFormContainer">
        <h1>{form.title}</h1>
        <form className="floatingInputContainer">
          {form.inputs.map((input, index) => (
            <FloatingLabelInput
              label={input.title}
              type={input.type}
              placeholder={input.placeholder}
              value={formData[input.title] || ""}
              onChange={(e) => handleInputChange(input.title, e.target.value)}
            />
          ))}
        </form>
        <button onClick={submitForm}>Submit</button>
      </div>
    </div>
  );
};

export default ViewForm;

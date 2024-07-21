import { useState } from "react";
import Button from "../../components/buttons/Button";
import OutlineButton from "../../components/buttons/OutlineButton";
import HeadingEditText from "../../components/HeadingEditText/HeadingEditText";
import TextInput from "../../components/input/TextInput";
import "./CreateForm.css";
import { BiGridVertical } from "react-icons/bi";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createForm } from "../../services/formService";

const CreateForm = () => {
  const API_URL = "http://localhost:5000/api/forms";
  const [inputValue, setInputValue] = useState("");
  const [buttonShow, setButtonShow] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [addNewText, setAddNewText] = useState("Add New");
  const [headingTextChange, setHeadingTextChange] = useState(false);
  const [editButtonState, setEditButtonState] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [editTitleValue, setEditTitleValue] = useState("");
  const [placeholderValue, setPlaceholderValue] = useState("");
  const [formdata, setFormdata] = useState();
  const navigate = useNavigate();

  console.log("create Input", inputs);

  const inputValueHandler = (event) => {
    setInputValue(event.target.value);
  };

  const formEditStateHandler = (event) => {
    setEditTitleValue(event.target.value);
    setInputs((prev) =>
      prev.map((item) =>
        item.id === selectedId ? { ...item, text: event.target.value } : item
      )
    );
  };

  const formEditPlaceholdeHandler = (event) => {
    setPlaceholderValue(event.target.value);
    setInputs((prev) =>
      prev.map((item) =>
        item.id === selectedId
          ? { ...item, placeholder: event.target.value }
          : item
      )
    );
  };

  const addButtonHandler = () => {
    setButtonShow((prev) => !prev);
    setAddNewText((prev) =>
      prev === "Add New" ? "Close add input" : "Add New"
    );
    setHeadingTextChange(false);
  };

  const buttonAddHandler = (item) => {
    setButtonState(true);
    setInputs((prev) => [...prev, { ...item, placeholder: item.placeholder }]);
  };

  const editButtonDetails = (id) => {
    setSelectedId(id);
    setHeadingTextChange(false);
    setEditButtonState(true);
    const selectedItem = inputs.find((item) => item.id === id);
    setTitleValue(selectedItem?.text || "");
    setEditTitleValue(selectedItem?.text || "");
    setPlaceholderValue(selectedItem?.placeholder || "");
  };

  const deleteButtonHandler = (id) => {
    setInputs((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFormSubmit = async () => {
    console.log("input", inputs);
    const formData = {
      title: inputValue,
      inputs: inputs.map((input) => ({
        type: input.route,
        title: input.text,
        placeholder: input.placeholder,
      })),
    };
    console.log("formdata value", formData);

    try {
      const response = createForm(formData);
      alert("Form Submitted successFully...");
      console.log("Form submitted:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const buttonList = [
    { id: 1, text: "Text", route: "Text" },
    { id: 2, text: "Number", route: "Number" },
    { id: 3, text: "Email", route: "Email" },
    { id: 4, text: "Password", route: "Password" },
    { id: 5, text: "Date", route: "Date" },
  ];

  const TextFormComponent = ({ item }) => {
    return (
      <div className="textComponentContainer">
        <BiGridVertical />
        <div
          style={{
            borderBottomWidth: "2px",
            borderBottomColor: "red",
            marginTop: item.text ? "0px" : "20px",
          }}
        >
          <div>{item.text}</div>
          <div className="underLine" />
        </div>
        <MdModeEditOutline
          color={"#1A6DDE"}
          size={16}
          style={{ marginTop: "-1px" }}
          onClick={() => editButtonDetails(item.id)}
        />
        <MdDelete
          color={"red"}
          size={16}
          style={{ marginTop: "-1px" }}
          onClick={() => deleteButtonHandler(item.id)}
        />
      </div>
    );
  };

  const BackToHome = () => {
    navigate("/");
  };

  return (
    <div className="homeContainer">
      <h5>Create New Form</h5>
      <div className="formContainer">
        <div className="rightContainer">
          <HeadingEditText
            text={inputValue || "Untitled Form"}
            color={"#1A6DDE"}
            onClick={() => setHeadingTextChange(!headingTextChange)}
          />
          {buttonState && (
            <div className="textFormComponentWrapper">
              {inputs.map((item) => (
                <TextFormComponent key={item.id} item={item} />
              ))}
            </div>
          )}
          <div className="addInputContainer">
            <OutlineButton text={addNewText} onClick={addButtonHandler} />
          </div>
          {buttonShow && (
            <div className="buttonsWrapper">
              {buttonList.map((item) => (
                <Button
                  key={item.id}
                  bgcolor={"#1A6DDE"}
                  color={"white"}
                  title={item.text}
                  onClick={() => buttonAddHandler(item)}
                />
              ))}
            </div>
          )}
          <div className="addInputContainer">
            <Button
              bgcolor={"green"}
              title={"Submit"}
              color={"white"}
              onClick={handleFormSubmit}
            />
          </div>
        </div>
        <div className="leftContainer">
          <h1>Form Editor</h1>
          <p style={{ fontSize: "10px" }}>Select to see editor</p>
          {headingTextChange && (
            <TextInput
              label={"Title"}
              inputValue={inputValue}
              handleChange={inputValueHandler}
            />
          )}
          {editButtonState && (
            <>
              <h1>{titleValue}</h1>
              <TextInput
                label={"Title"}
                inputValue={editTitleValue}
                handleChange={formEditStateHandler}
              />
              <TextInput
                label={"Placeholder"}
                inputValue={placeholderValue}
                handleChange={formEditPlaceholdeHandler}
              />
            </>
          )}
        </div>
      </div>
      <Button
        bgcolor={"green"}
        title={"Create Form"}
        color={"white"}
        top={"3%"}
        right={"15%"}
        onClick={BackToHome}
      />
    </div>
  );
};

export default CreateForm;

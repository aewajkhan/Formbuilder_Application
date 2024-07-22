import { useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import OutlineButton from "../../components/buttons/OutlineButton";
import HeadingEditText from "../../components/HeadingEditText/HeadingEditText";
import TextInput from "../../components/input/TextInput";
import "./EditForm.css";
import { BiGridVertical } from "react-icons/bi";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { delateForm, getFormById, updateForm } from "../../services/formService";

const EditForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [buttonShow, setButtonShow] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [addNewText, setAddNewText] = useState("Add New");
  const [headingTextChange, setHeadingTextChange] = useState(false);
  const [editButtonState, setEditButtonState] = useState(false);
  const [editInput, setEditInput] = useState({ title: "", placeholder: "", index: null });
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchFormData = async () => {
      if (id) {
        const formData = await getFormById(id);
        setInputValue(formData.title);
        setInputs(formData.inputs);
        setSelectedId(id);
      }
    };
    fetchFormData();
  }, [id]);

  const inputValueHandler = (event) => {
    setInputValue(event.target.value);
  };

  const formEditStateHandler = (event) => {
    setEditInput((prev) => ({ ...prev, title: event.target.value }));
    updateInput(editInput.index, "title", event.target.value);
  };

  const formEditPlaceholderHandler = (event) => {
    setEditInput((prev) => ({ ...prev, placeholder: event.target.value }));
    updateInput(editInput.index, "placeholder", event.target.value);
  };

  const addButtonHandler = () => {
    setButtonShow((prev) => !prev);
    setAddNewText((prev) => (prev === "Add New" ? "Close add input" : "Add New"));
    setHeadingTextChange(false);
  };

  const buttonAddHandler = (type) => {
    if (inputs.length >= 20) return;
    setInputs([...inputs, { type, title: "", placeholder: "" }]);
  };

  const updateInput = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const deleteButtonHandler = async (index) => {
    const inputId = inputs[index]._id;
    setInputs(inputs.filter((_, i) => i !== index));
    if (inputId) await delateForm(inputId);
  };

  const editButtonDetails = (index) => {
    setEditButtonState(true);
    const selectedItem = inputs[index];
    setEditInput({ ...selectedItem, index });
  };

  const handleFormSubmit = async () => {
    const formData = {
      title: inputValue,
      inputs: inputs.map((input) => ({
        type: input.type,
        title: input.title,
        placeholder: input.placeholder,
      })),
    };

    try {
      await updateForm(selectedId, formData);
      alert("form Modify succefully create it...")

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const BackToHome = () => {
    navigate("/");
  };

  const TextFormComponent = ({ item, index }) => (
    <div className="textComponentContainer">
      <BiGridVertical />
      <div style={{ borderBottomWidth: "2px", borderBottomColor: "red", marginTop: item.title ? "0px" : "20px" }}>
        <div>{item.title}</div>
        <div className="underLine" />
      </div>
      <MdModeEditOutline
        color={"#1A6DDE"}
        size={16}
        style={{ marginTop: "-1px" }}
        onClick={() => editButtonDetails(index)}
      />
      <MdDelete
        color={"red"}
        size={16}
        style={{ marginTop: "-1px" }}
        onClick={() => deleteButtonHandler(index)}
      />
    </div>
  );

  return (
    <div className="homeContainer">
      <h5>Edit Form</h5>
      <div className="formContainer">
        <div className="rightContainer">
          <HeadingEditText
            text={inputValue || "Untitled Form"}
            color={"#1A6DDE"}
            onClick={() => setHeadingTextChange(!headingTextChange)}
          />
          <div className="textget">
            {inputs.map((item, index) => (
              <TextFormComponent key={index} item={item} index={index} />
            ))}
          </div>
          <div className="addInputContainer">
            <OutlineButton text={addNewText} onClick={addButtonHandler} />
          </div>
          {buttonShow && (
            <div className="buttonsWrapper">
              {["Text", "Number", "Email", "Password", "Date"].map((type, index) => (
                <Button
                  key={index}
                  bgcolor={"#1A6DDE"}
                  color={"white"}
                  title={type}
                  onClick={() => buttonAddHandler(type)}
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
              <h1>{editInput.type}</h1>
              <TextInput
                label={"Title"}
                inputValue={editInput.title}
                handleChange={formEditStateHandler}
              />
              <TextInput
                label={"Placeholder"}
                inputValue={editInput.placeholder}
                handleChange={formEditPlaceholderHandler}
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

export default EditForm;

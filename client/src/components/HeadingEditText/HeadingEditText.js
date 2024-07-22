import "./HeadingEditText.css";
import { MdModeEditOutline } from "react-icons/md";

const HeadingEditText = ({ text, color, onClick }) => {
  return (
    <div className="headingContainer">
      <h1>{text}</h1>
      <div onClick={onClick}>
        <MdModeEditOutline
          size={20}
          style={{ marginBottom: "0px", color: color }}
        />
      </div>
    </div>
  );
};

export default HeadingEditText;

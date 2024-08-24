import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragNDropImage(props) {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  useEffect(() => {
    if (file) {
      props.thumbnail(file);
    }
  }, [file]);
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
      <div className="flex border-dashed border h-[220px] sm:w-[400px] w-[300px]  items-center justify-center flex-col font-semibold cursor-pointer">
        <p>Drag n Drop file here </p>
        <p className="font-normal my-2">or</p>
        <p className="font-medium underline cursor-pointer">
          Click to select Files{" "}
        </p>
      </div>
    </FileUploader>
  );
}

export default DragNDropImage;

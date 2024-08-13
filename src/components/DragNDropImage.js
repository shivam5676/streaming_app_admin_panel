import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragNDropImage() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <FileUploader
      handleChange={handleChange}
      name="file"
      types={fileTypes}
    >
      <div className="flex border-dashed border h-[220px] w-[400px] items-center justify-center flex-col font-semibold cursor-pointer"><p>Drag n Drop file here </p><p className="font-normal my-2">or</p><p className="font-medium underline cursor-pointer">Click to  select Files </p></div>
    </FileUploader>
  );
}

export default DragNDropImage;

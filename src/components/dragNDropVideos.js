import React from "react";
import { FileUploader } from "react-drag-drop-files";

const DragNDropVideos = (props) => {
  const acceptedFileTypes = ["mp4", "avi", "mkv", "webm", "quicktime"];
  const handleFiles = (file) => {
    console.log(file);
    props.videoFile(file)
  };
  return (
    <FileUploader
      multiple={true} // Allow multiple files to be uploaded
      handleChange={handleFiles} // Handle file change event
      name="videoFile" // Name for the form data
      types={acceptedFileTypes} // Accepted file types
    >
      {props.children}
    </FileUploader>
  );
};

export default DragNDropVideos;

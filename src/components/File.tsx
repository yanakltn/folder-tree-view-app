import React, { useCallback } from "react";
// types
import { File } from "../models";
// assets
import FileIcon from "../assets/file.png";

interface FileProps {
  fileInfo: File;
  onDelete: (path: string) => void;
  path: string;
}

const FileComponent = ({ fileInfo, onDelete, path }: FileProps) => {
  const handleDelete = useCallback(
    () => onDelete(path + fileInfo.name),
    [onDelete, fileInfo, path]
  );

  return (
    <div className="wrapper">
      <img className="icon" src={FileIcon} alt="file" />
      <p className="name">{fileInfo.name}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default FileComponent;

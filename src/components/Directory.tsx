import React, { useCallback, useState } from "react";
// types
import { Directory } from "../models";
// components
import FileSystemEntryComponent from "./FileSystemEntry";
// assets
import FullFolder from "../assets/full-folder.png";
import OpenFolder from "../assets/open-folder.png";
import EmptyFolder from "../assets/empty-folder.png";

interface DirectoryProps {
  directoryInfo: Directory;
  openAll: boolean;
  onDelete: (path: string) => void;
  path: string;
}

const DirectoryComponent = ({
  directoryInfo,
  openAll,
  onDelete,
  path,
}: DirectoryProps) => {
  const folderPath = path + directoryInfo.name;
  const [isOpen, toggleOpen] = useState(false);
  const handleOpen = useCallback(() => {
    if (directoryInfo.hasAccess) {
      toggleOpen((open) => !open);
    } else {
      alert("Access denied");
    }
  }, [toggleOpen, directoryInfo]);

  const handleDelete = useCallback(
    () => onDelete(folderPath),
    [onDelete, folderPath]
  );

  return (
    <div>
      <div className="wrapper">
        {directoryInfo.children.length > 0 && (
          <button className="expand-button" onClick={handleOpen}>
            {isOpen || openAll ? "-" : "+"}
          </button>
        )}
        <img
          className="icon"
          src={
            isOpen
              ? OpenFolder
              : directoryInfo.children.length > 0
              ? FullFolder
              : EmptyFolder
          }
          alt="folder"
        />
        <p className="name">{directoryInfo.name}</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div className="folder-children">
        {(isOpen || openAll) &&
          directoryInfo.hasAccess &&
          directoryInfo.children.map((child) => (
            <FileSystemEntryComponent
              key={child.name}
              fileSystemEntryInfo={child}
              openAll={openAll}
              onDelete={onDelete}
              path={folderPath + "/"}
            />
          ))}
      </div>
    </div>
  );
};

export default DirectoryComponent;

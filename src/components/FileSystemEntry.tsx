import React from "react";
// types
import {
  Directory,
  File,
  FileSystemEntry,
  FileSystemEntryType,
} from "../models";
// components
import DirectoryComponent from "./Directory";
import FileComponent from "./File";

interface FileSystemEntryProps {
  fileSystemEntryInfo: FileSystemEntry;
  openAll: boolean;
  onDelete: (path: string) => void;
  path: string;
}

const FileSystemEntryComponent = ({
  fileSystemEntryInfo,
  openAll,
  onDelete,
  path,
}: FileSystemEntryProps) => {
  switch (fileSystemEntryInfo.entryType) {
    case FileSystemEntryType.Directory:
      return (
        <DirectoryComponent
          directoryInfo={fileSystemEntryInfo as Directory}
          openAll={openAll}
          onDelete={onDelete}
          path={path}
        />
      );
    case FileSystemEntryType.File:
      return (
        <FileComponent
          fileInfo={fileSystemEntryInfo as File}
          onDelete={onDelete}
          path={path}
        />
      );
  }
};

export default FileSystemEntryComponent;

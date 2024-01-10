import React, { useCallback, useMemo, useState } from "react";
// styles
import "./App.css";
// sample backend response
import * as SAMPLE_RESPONSE from "./response.json";
// component
import FileSystemEntryComponent from "./components/FileSystemEntry";
// types
import {
  Directory,
  File,
  FileSystemEntry,
  FileSystemEntryType,
} from "./models";

const deleteFileSystemEntry = (
  path: string,
  fileSystemEntry: FileSystemEntry
): FileSystemEntry | null => {
  console.log(path, fileSystemEntry);
  if (fileSystemEntry.entryType === FileSystemEntryType.Directory) {
    const directory = fileSystemEntry as Directory;
    if (directory.name === path) {
      return null;
    }

    if (path.startsWith(directory.name + "/")) {
      const newPath = path.substring(directory.name.length + 1);

      const filteredChildren = directory.children
        .map((child) => deleteFileSystemEntry(newPath, child))
        .filter((child) => Boolean(child)) as FileSystemEntry[];
      const filteredDirectory: Directory = {
        ...directory,
        children: filteredChildren,
      };

      return filteredDirectory;
    } else {
      return fileSystemEntry;
    }
  } else {
    const fileInfo = fileSystemEntry as File;

    if (path === fileInfo.name) {
      return null;
    } else {
      return fileInfo;
    }
  }
};

const searchFileSystem = (
  searchText: string,
  fileSystemEntry: FileSystemEntry
): FileSystemEntry | null => {
  if (fileSystemEntry.entryType === FileSystemEntryType.File) {
    if (fileSystemEntry.name.includes(searchText)) {
      return fileSystemEntry;
    }
  } else if (fileSystemEntry.entryType === FileSystemEntryType.Directory) {
    const directory = fileSystemEntry as Directory;
    const filteredChildren = directory.children
      .map((child) => searchFileSystem(searchText, child))
      .filter((child) => Boolean(child)) as FileSystemEntry[];

    if (filteredChildren.length > 0 || directory.name.includes(searchText)) {
      const filteredDirectory: Directory = {
        ...directory,
        children: filteredChildren,
      };

      return filteredDirectory;
    }
  }

  return null;
};

function App() {
  const [data, setData] = useState<FileSystemEntry | null>(
    SAMPLE_RESPONSE as FileSystemEntry
  );
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    [setSearchText]
  );

  const filteredFileSystem = useMemo(() => {
    return data && searchFileSystem(searchText, data);
  }, [searchText, data]);

  const handleDelete = useCallback(
    (path: string) => {
      setData((data) => data && deleteFileSystemEntry(path, data));
    },
    [setData]
  );

  return (
    <div className="App">
      <input
        type="text"
        id="Name"
        name="Name"
        data-testid="search-input"
        placeholder="type file or folder name"
        onChange={handleSearchTextChange}
      />
      {filteredFileSystem && (
        <FileSystemEntryComponent
          fileSystemEntryInfo={filteredFileSystem}
          openAll={searchText.length > 0}
          onDelete={handleDelete}
          path={""}
        />
      )}
    </div>
  );
}

export default App;

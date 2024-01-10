export enum FileSystemEntryType {
  File = "file",
  Directory = "directory",
}

export interface FileSystemEntry {
  entryType: FileSystemEntryType;
  name: string;
}

export interface File extends FileSystemEntry {
  entryType: FileSystemEntryType.File;
}

export interface Directory extends FileSystemEntry {
  entryType: FileSystemEntryType.Directory;
  children: FileSystemEntry[];
  hasAccess: boolean;
}

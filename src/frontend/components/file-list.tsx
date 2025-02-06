import {
  FileList as UIFileList,
  FileListDescription,
  FileListHeader,
  FileListIcon,
  FileListInfo,
  FileListItem,
  FileListName,
  FileListSize,
} from '@/frontend/components/ui/file-list';

interface FileListProps {
  files: File[];
}

export default function FileList({ files }: FileListProps) {
  return (
    <UIFileList>
      {files.map((file) => (
        <FileListItem key={file.name}>
          <FileListHeader>
            <FileListIcon />
            <FileListInfo>
              <FileListName>{file.name}</FileListName>
              <FileListDescription>
                <FileListSize>{file.size}</FileListSize>
              </FileListDescription>
            </FileListInfo>
          </FileListHeader>
        </FileListItem>
      ))}
    </UIFileList>
  );
}

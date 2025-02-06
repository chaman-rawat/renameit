import { Loader2, Trash2, X } from 'lucide-react';

import {
  FileList as UIFileList,
  FileListDescription,
  FileListHeader,
  FileListIcon,
  FileListInfo,
  FileListItem,
  FileListName,
  FileListSize,
  FileListDescriptionText,
  FileListAction,
  FileListDescriptionSeparator,
} from '@/frontend/components/ui/file-list';

interface FileListProps {
  files: File[];
}

export default function FileList({ files }: FileListProps) {
  const isRenaming = true;

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

                {isRenaming && (
                  <>
                    <FileListDescriptionSeparator />
                    <FileListDescriptionText>
                      <Loader2 className="size-3 animate-spin" />
                      Renaming...
                    </FileListDescriptionText>
                  </>
                )}
              </FileListDescription>
            </FileListInfo>
            {isRenaming && (
              <FileListAction>
                <X />
                <span className="sr-only">Close</span>
              </FileListAction>
            )}
            <FileListAction>
              <Trash2 />
              <span className="sr-only">Remove</span>
            </FileListAction>
          </FileListHeader>
        </FileListItem>
      ))}
    </UIFileList>
  );
}

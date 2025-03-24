import { Loader2, Trash2, RefreshCw } from 'lucide-react';

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
} from '@/frontend/components/ui/file-list';
import { useDashboardContext } from '../lib/context/DashboardContext';

export default function FileList() {
  const { currentState, files, removeFile } = useDashboardContext();

  const isRenaming = currentState !== 'fileSelection';

  return (
    <UIFileList>
      {files.map((file) => (
        <FileListItem key={file.name}>
          <FileListHeader>
            <FileListIcon />
            <FileListInfo>
              <FileListName>{file.name}</FileListName>
              <FileListDescription>
                {isRenaming ? (
                  <FileListDescriptionText>
                    <Loader2 className="size-3 animate-spin" />
                    Renaming...
                  </FileListDescriptionText>
                ) : (
                  <FileListSize>{file.size}</FileListSize>
                )}
              </FileListDescription>
            </FileListInfo>
            {isRenaming ? (
              <FileListAction>
                <RefreshCw />
                <span className="sr-only">Refresh</span>
              </FileListAction>
            ) : (
              <FileListAction onClick={() => removeFile(file.name)}>
                <Trash2 />
                <span className="sr-only">Remove</span>
              </FileListAction>
            )}
          </FileListHeader>
        </FileListItem>
      ))}
    </UIFileList>
  );
}

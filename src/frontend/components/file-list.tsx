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
  const { currentState, files, generatedNames, renamingStatuses, removeFile } =
    useDashboardContext();

  return (
    <UIFileList>
      {files.map((file) => (
        <FileListItem key={file.name}>
          <FileListHeader>
            <FileListIcon />
            <FileListInfo>
              <FileListName>{file.name}</FileListName>
              <FileListDescription>
                {currentState === 'fileSelection' && (
                  <FileListSize>{file.size}</FileListSize>
                )}

                <FileListDescriptionText>
                  {currentState !== 'fileSelection' &&
                    (() => {
                      switch (renamingStatuses[file.name]) {
                        case 'pending':
                        case 'generating':
                          return (
                            <>
                              <Loader2 className="size-3 animate-spin" />
                              <span>Generating...</span>
                            </>
                          );
                        case 'success':
                          return generatedNames[file.name];
                        case 'error':
                          return (
                            <span className="text-red-500">
                              Error generating filename
                            </span>
                          );
                        default:
                          return null;
                      }
                    })()}
                </FileListDescriptionText>
              </FileListDescription>
            </FileListInfo>
            {currentState !== 'fileSelection' ? (
              <FileListAction
                disabled={renamingStatuses[file.name] !== 'success'}
              >
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

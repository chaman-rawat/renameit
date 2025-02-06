import * as React from 'react';
import {
  Dropzone,
  DropzoneDescription,
  DropzoneGroup,
  DropzoneInput,
  DropzoneTitle,
  DropzoneUploadIcon,
  DropzoneZone,
} from '@/frontend/components/ui/dropzone';
import FileList from './file-list';

export default function FileDropzone() {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <Dropzone
      accept={{
        'image/*': ['.jpg', '.png'],
        'application/pdf': ['.pdf'],
      }}
      onDropAccepted={setFiles}
    >
      <div className="grid gap-4">
        <DropzoneZone>
          <DropzoneInput />
          <DropzoneGroup className="gap-4">
            <DropzoneUploadIcon />
            <DropzoneGroup>
              <DropzoneTitle>Drop or Upload</DropzoneTitle>
              <DropzoneDescription>
                Supported formats: JPG, PNG, PDF.
              </DropzoneDescription>
            </DropzoneGroup>
          </DropzoneGroup>
        </DropzoneZone>

        <FileList files={files} />
      </div>
    </Dropzone>
  );
}

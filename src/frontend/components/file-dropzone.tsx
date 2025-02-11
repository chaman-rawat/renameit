import { useState } from 'react';
import {
  Dropzone,
  DropzoneDescription,
  DropzoneGroup,
  DropzoneInput,
  DropzoneTitle,
  DropzoneUploadIcon,
  DropzoneZone,
} from '@/frontend/components/ui/dropzone';
import { Button } from './ui/button';
import FileList from './file-list';

export default function FileDropzone() {
  const [files, setFiles] = useState<File[]>([]);

  const handleDropAccepted = (newFiles: File[]) => {
    setFiles((prevFiles) => {
      const fileSet = new Set(prevFiles.map((file) => file.name));
      const uniqueNewFiles = newFiles.filter((file) => !fileSet.has(file.name));
      return [...prevFiles, ...uniqueNewFiles];
    });
  };

  return (
    <Dropzone
      accept={{
        'image/*': ['.jpg', '.png'],
        'application/pdf': ['.pdf'],
      }}
      onDropAccepted={handleDropAccepted}
    >
      <div className="grid gap-4 pb-10">
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

        <FileList files={files} setFiles={setFiles} />

        {files.length !== 0 && (
          <div className="fixed bottom-0 right-0 flex items-center justify-end w-full gap-2 p-2 bg-background ">
            <DropzoneDescription>
              {files.length} files selected
            </DropzoneDescription>
            <Button
              onClick={() => setFiles([])}
              className="w-24"
              variant="outline"
            >
              Clear All
            </Button>
            <Button className="w-24" type="submit">
              Submit
            </Button>
          </div>
        )}
      </div>
    </Dropzone>
  );
}

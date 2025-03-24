/* eslint-disable */
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

// Define the possible states
export type DashboardState =
  | 'fileSelection'
  | 'fileNameGeneration'
  | 'applyEditRegenerate';

// Define the renaming status for individual files
export type RenamingStatus = 'pending' | 'generating' | 'success' | 'error';

// Define the context value interface
interface DashboardContextType {
  currentState: DashboardState;
  setCurrentState: Dispatch<SetStateAction<DashboardState>>;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  generatedNames: Record<string, string>;
  setGeneratedNames: Dispatch<SetStateAction<Record<string, string>>>;
  renamingStatuses: Record<string, RenamingStatus>;
  setRenamingStatuses: Dispatch<SetStateAction<Record<string, RenamingStatus>>>;
  clearAllFiles: () => void;
  removeFile: (fileName: string) => void;
  submitFiles: () => Promise<void>;
  goBack: () => void;
  applyRenames: () => void;
  regenerateFileName: (file: File) => Promise<void>;
  applyCustomName: (fileName: string, newName: string) => void;
}

// Create the context
export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

// Create the context provider component
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentState, setCurrentState] =
    useState<DashboardState>('fileSelection');
  const [files, setFiles] = useState<File[]>([]);

  const [generatedNames, setGeneratedNames] = useState<Record<string, string>>(
    {},
  );
  const [renamingStatuses, setRenamingStatuses] = useState<
    Record<string, RenamingStatus>
  >({});

  const clearAllFiles = () => {
    setFiles([]);
    setGeneratedNames({});
    setRenamingStatuses({});
  };

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    const { [fileName]: removedGeneratedName, ...restGeneratedNames } =
      generatedNames;
    setGeneratedNames(restGeneratedNames);
    const { [fileName]: removedStatus, ...restStatuses } = renamingStatuses;
    setRenamingStatuses(restStatuses);
  };

  const submitFiles = async () => {
    setCurrentState('fileNameGeneration');
    setRenamingStatuses(
      files.reduce((acc, file) => ({ ...acc, [file.name]: 'generating' }), {}),
    );

    for (const file of files) {
      await regenerateFileName(file);
    }

    setCurrentState('applyEditRegenerate');
  };

  const regenerateFileName = async (file: File) => {
    setRenamingStatuses((prevStatuses) => ({
      ...prevStatuses,
      [file.name]: 'generating',
    }));
    try {
      console.log(`Regenerating name for: ${file.name}`);
      const generatedName = await generateFileName(file);
      setGeneratedNames((prevNames) => ({
        ...prevNames,
        [file.name]: generatedName,
      }));
      setRenamingStatuses((prevStatuses) => ({
        ...prevStatuses,
        [file.name]: 'success',
      }));
    } catch (error) {
      console.error(`Error regenerating name for ${file.name}:`, error);
      setRenamingStatuses((prevStatuses) => ({
        ...prevStatuses,
        [file.name]: 'error',
      }));
    }
  };

  // Placeholder for Gemini API call logic (now taking only File)
  const generateFileName = async (file: File): Promise<string> => {
    // This is where we would call Gemini API logic using the file object.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`ai_renamed_${file.name}`); // Example generated name
      }, 1000);
    });
  };

  const applyCustomName = (fileName: string, newName: string) => {
    setGeneratedNames((prevNames) => ({
      ...prevNames,
      [fileName]: newName,
    }));
  };

  const goBack = () => {
    setCurrentState('fileSelection');
    setGeneratedNames({});
    setRenamingStatuses({});
  };

  const applyRenames = () => {
    console.log('Applying renames:', generatedNames);
    // Implement file renaming logic here
  };

  const contextValue: DashboardContextType = {
    currentState,
    setCurrentState,
    files,
    setFiles,
    generatedNames,
    setGeneratedNames,
    renamingStatuses,
    setRenamingStatuses,
    clearAllFiles,
    removeFile,
    submitFiles,
    goBack,
    applyRenames,
    regenerateFileName,
    applyCustomName,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

// Create a custom hook to use the context
export const useDashboardContext = () => {
  const context = React.useContext(DashboardContext);
  if (!context) {
    throw new Error(
      'useDashboardContext must be used within a DashboardProvider',
    );
  }
  return context;
};

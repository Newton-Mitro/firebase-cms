import { useEffect, useState } from "react";
import { PhotoProvider } from "react-photo-view";
import AppLoader from "../../../components/AppLoader";
import PaginateRow from "../../../components/PaginateRow";
import UploadFileInput from "../../../components/UploadFileInput";
import { FileType } from "../../../enums/file-type.enum";
import useGetAttachments from "../hooks/useGetAttachments";
import useRemoveFile from "../hooks/useRemoveFile";
import useUploadFile from "../hooks/useUploadFile";
import FilePreview from "./FilePreview";

const FileManager = () => {
  const { fileUrl, uploadFile, loading, error } = useUploadFile();
  const [fileType, setFileType] = useState<string>(FileType.Image);
  const [currentPostStartFrom, setCurrentPostStartFrom] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const {
    attachments,
    listAttachments,
    loading: attachmentsLoading,
    error: attachmentsError,
    activeView,
    nextView,
    previousView,
    firstView,
    lastView,
    totalViews,
    totalRecords,
  } = useGetAttachments();

  const {
    removedFileId,
    removeFile,
    loading: removeFileLoading,
    error: removeFileError,
  } = useRemoveFile();

  useEffect(() => {
    listAttachments(fileType);
  }, [removedFileId, fileType, fileUrl]);

  return (
    <>
      <AppLoader
        isLoading={loading || attachmentsLoading || removeFileLoading}
      />
      <div className="w-full space-y-2">
        <h2 className="text-xl">File Manager</h2>
        <div className="h-[calc(100vh-122px)] border border-borderColor bg-secondary p-2 flex flex-col overflow-auto relative">
          <div className="flex flex-col gap-2">
            <div className="header flex gap-2 justify-between">
              <UploadFileInput
                fileType={fileType}
                uploadFile={uploadFile}
                listAttachments={listAttachments}
              />
              <div className="flex items-center gap-2 justify-end">
                <select
                  className="py-0.5 bg-primary border border-borderColor shadow-sm 
                focus:border-borderColor focus:ring focus:ring-gray-700 focus:ring-opacity-50"
                  onChange={(event) => {
                    setFileType(event.target.value);
                  }}
                >
                  <option selected value="Image">
                    Image
                  </option>
                  <option value="Audio">Audio</option>
                  <option value="Document">Document</option>
                </select>
              </div>
            </div>
            <div className="body border border-borderColor h-[calc(100vh-226px)] overflow-auto bg-primary">
              <div className="flex flex-wrap gap-4 p-2">
                <PhotoProvider>
                  {attachments?.map((file) => {
                    return (
                      <FilePreview
                        file={file}
                        showSelectButton={false}
                        showMaximizeButton={true}
                        showRemoveButton={true}
                        handleSelect={undefined}
                        handleRemove={removeFile}
                      />
                    );
                  })}
                </PhotoProvider>
              </div>
            </div>
          </div>

          <PaginateRow
            totalRecords={totalRecords}
            limit={limit}
            setLimit={setLimit}
            currentViewStartFrom={currentPostStartFrom}
            setCurrentViewStartFrom={setCurrentPostStartFrom}
            activeView={activeView}
            firstView={firstView}
            lastView={lastView}
            previousView={previousView}
            nextView={nextView}
            totalView={totalViews}
          />
        </div>
      </div>
    </>
  );
};
export default FileManager;

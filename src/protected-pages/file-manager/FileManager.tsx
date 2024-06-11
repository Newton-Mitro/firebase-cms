import { useEffect, useState } from "react";
import AppLoader from "../../components/AppLoader";
import PaginateRow from "../../components/PaginateRow";
import { FileType } from "./file-type.enum";
import useGetAttachments from "./useGetAttachments";
import useRemoveFile from "./useRemoveFile";
import useUploadFile from "./useUploadFile";

const FileManager = () => {
  const { fileUrl, uploadFile, loading, error } = useUploadFile();
  const [fileType, setFileType] = useState();
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
  } = useGetAttachments(FileType.Image);

  const {
    removedFileId,
    removeFile,
    loading: removeFileLoading,
    error: removeFileError,
  } = useRemoveFile();

  console.log(attachments);

  useEffect(() => {
    listAttachments();
  }, [removedFileId]);

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
              <button
                onClick={() => {}}
                className="bg-accent hover:bg-gray-900 disabled:bg-disabledColor border border-borderColor hover:shadow-md transition-all duration-300 shadow-sm rounded px-1.5 md:px-4 hover:cursor-pointer"
              >
                <span className="md:block hidden">Upload File</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 md:hidden block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-2 justify-end">
                <select className="py-0.5 bg-primary border border-borderColor shadow-sm focus:border-borderColor focus:ring focus:ring-gray-700 focus:ring-opacity-50">
                  <option selected value="Image">
                    Image
                  </option>
                  <option value="Audio">Audio</option>
                  <option value="Document">Document</option>
                </select>
              </div>
            </div>
            <div className="body border border-borderColor h-[calc(100vh-226px)] overflow-auto bg-primary">
              <div className="flex gap-4 p-2">
                {attachments?.map((file) => {
                  return (
                    <>
                      <div className="rounded shadow hover:cursor-pointer">
                        {/* <div className="">{file.fileName}</div> */}
                        <img
                          src={file?.attachmentUrl}
                          alt=""
                          className="h-20 object-cover w-32 rounded ring-2"
                        />
                      </div>
                    </>
                  );
                })}
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

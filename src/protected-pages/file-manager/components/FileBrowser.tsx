import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import AppLoader from "../../../components/AppLoader";
import PaginateRow from "../../../components/PaginateRow";
import UploadFileInput from "../../../components/UploadFileInput";
import { FileType } from "../../../enums/file-type.enum";
import useGetAttachments from "../hooks/useGetAttachments";
import useRemoveFile from "../hooks/useRemoveFile";
import useUploadFile from "../hooks/useUploadFile";
import FilePreview from "./FilePreview";

interface FileBrowserProps {
  isOpen: boolean;
  fileTypeSelectionDisabled?: boolean;
  setIsOpen: any;
  selectedFile: any;
}

const FileBrowser: React.FC<FileBrowserProps> = ({
  isOpen,
  setIsOpen,
  selectedFile,
  fileTypeSelectionDisabled = false,
}) => {
  const [fileType, setFileType] = useState<string>(FileType.Image);
  const [windowState, setWindowState] = useState(false);
  const [currentPostStartFrom, setCurrentPostStartFrom] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { fileUrl, uploadFile, loading, error } = useUploadFile();

  const {
    attachments,
    listAttachments,
    loading: attachmentsLoading,
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
    listAttachments(fileType, currentPostStartFrom, limit);
  }, [fileUrl, removedFileId, currentPostStartFrom, fileType, limit]);

  if (isOpen) {
    return ReactDOM.createPortal(
      <section
        className={`fixed inset-0 flex flex-col items-center 
          justify-center backdrop-blur-sm bg-slate-950/60`}
      >
        <AppLoader
          isLoading={loading || attachmentsLoading || removeFileLoading}
        />
        <div
          className={`${
            windowState
              ? "h-[calc(100vh-60px)] w-full lg:w-[calc(100vw-80px)]"
              : "w-full lg:w-8/12 h-5/6"
          } bg-primary text-onPrimary 
          flex flex-col border border-borderColor shadow`}
        >
          <header className="bg-accent text-onSecondary p-4 flex justify-between border-b border-borderColor">
            <div className="flex gap-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>

              <span className="text-xl">File Browser</span>
            </div>
            <div className="flex items-center gap-2">
              {windowState ? (
                <button
                  type="button"
                  onClick={() => {
                    setWindowState(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 hover:font-bold hover:text-yellow-100 hover:scale-105 transition-all"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setWindowState(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 hover:font-bold hover:text-yellow-100 hover:scale-105 transition-all"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                    />
                  </svg>
                </button>
              )}

              <button
                className=""
                type="button"
                onClick={() => {
                  setIsOpen();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 hover:font-bold hover:text-yellow-100 hover:scale-105 transition-all"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </header>
          <div className="p-4 overflow-auto h-1/2">
            <div className="mb-2">
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
            <div className="flex gap-1 lg:gap-4 flex-wrap">
              {attachments && attachments.length > 0 ? (
                attachments.map((attachment) => {
                  return (
                    <FilePreview
                      key={attachment?.id}
                      file={attachment}
                      handleSelect={(file: any) => {
                        selectedFile(file);
                        setIsOpen(false);
                      }}
                      handleRemove={removeFile}
                      showSelectButton={true}
                      showMaximizeButton={true}
                      showRemoveButton={true}
                    />
                  );
                })
              ) : (
                <div className="flex items-center justify-center flex-col">
                  <img
                    src={
                      "https://t4.ftcdn.net/jpg/02/17/88/73/360_F_217887350_mDfLv2ootQNeffWXT57VQr8OX7IvZKvB.jpg"
                    }
                    alt=""
                    className="h-32 object-cover rounded group-hover:bg-blend-darken group-hover:cursor-pointer"
                  />
                  <div className="">
                    No document found. Please upload document.
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-secondary border-t border-borderColor p-4 mt-auto flex justify-between">
            <UploadFileInput
              fileType={fileType}
              uploadFile={uploadFile}
              listAttachments={listAttachments}
            />
            <select
              disabled={fileTypeSelectionDisabled}
              value={fileType}
              className="py-0.5 bg-primary border border-borderColor shadow-sm disabled:bg-disabledColor
                focus:border-borderColor focus:ring focus:ring-gray-700 focus:ring-opacity-50"
              onChange={(event) => {
                setFileType(event.target.value);
              }}
            >
              <option value="Image">Image</option>
              <option value="Audio">Audio</option>
              <option value="Document">Document</option>
            </select>
          </div>
        </div>
      </section>,
      document.getElementById("portal")!
    );
  } else {
    return null;
  }
};
export default FileBrowser;

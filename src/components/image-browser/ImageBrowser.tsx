import { ReactComponent as YourSvg } from "assets/icon/pdf.svg";
import { ChangeEvent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import AppLoader from "../AppLoader";
import { FileType } from "./file-type.enum";
import useGetAttachments from "./useGetAttachments";
import useRemoveFile from "./useRemoveFile";
import useUploadFile from "./useUploadFile";

interface ImageBrowserProps {
  isOpen: boolean;
  setIsOpen: any;
  selectImage: any;
  fileType: FileType;
}

const ImageBrowser: React.FC<ImageBrowserProps> = ({
  isOpen,
  setIsOpen,
  selectImage,
  fileType,
}) => {
  const { fileUrl, uploadFile, loading, error } = useUploadFile();
  const [windowState, setWindowState] = useState(false);
  const {
    attachments,
    listAttachments,
    loading: attachmentsLoading,
    error: attachmentsError,
  } = useGetAttachments(FileType.Image);

  const {
    removedFileId,
    removeFile,
    loading: removeFileLoading,
    error: removeFileError,
  } = useRemoveFile();

  useEffect(() => {
    listAttachments();
  }, [fileUrl, removedFileId]);

  if (isOpen) {
    return ReactDOM.createPortal(
      <section
        className={`fixed inset-0 flex flex-col items-center justify-center`}
      >
        <AppLoader
          isLoading={loading || attachmentsLoading || removeFileLoading}
        />
        <div
          className={`${
            windowState
              ? "h-[calc(100vh-60px)] w-[calc(100vw-80px)]"
              : "w-8/12 h-5/6"
          } bg-primary text-onPrimary 
          flex flex-col border border-borderColor`}
        >
          <header className="bg-secondary text-onSecondary p-4 flex justify-between border-b border-borderColor">
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
            <div className="flex gap-1 lg:gap-4 flex-wrap">
              {attachments && attachments.length > 0 ? (
                attachments.map((attachment) => {
                  console.log(attachment);

                  if (attachment.fileType === FileType.Document) {
                    return (
                      <div
                        key={attachment?.id}
                        className="relative border rounded border-borderColor group"
                      >
                        <div className="w-28 flex items-center flex-col">
                          <YourSvg className="w-28 h-28" />
                          <p>{attachment?.fileName}</p>
                        </div>
                        <div className="bg-gray-950 bg-opacity-50 group-hover:bg-gray-950 group-hover:bg-opacity-80 w-full h-full absolute left-0 right-0 top-0"></div>
                        <div className="absolute inset-0">
                          <div className="flex items-center justify-evenly gap-6 w-full h-full">
                            <button
                              className="w-16 rounded-full ring-1 hover:cursor-pointer ring-green-500 ring-opacity-30 h-16 flex items-center justify-center hover:bg-green-950 hover:bg-opacity-65"
                              onClick={() => {
                                selectImage(attachment?.attachmentUrl);
                                setIsOpen(false);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6 hover:cursor-pointer hover:text-white hover:scale-110 transition-all"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m4.5 12.75 6 6 9-13.5"
                                />
                              </svg>
                            </button>
                            <button
                              className="w-16 rounded-full hover:cursor-pointer ring-1 ring-red-500 
                            ring-opacity-30 h-16 flex items-center justify-center hover:bg-red-950 hover:bg-opacity-65"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you wish to delete this item?"
                                  )
                                ) {
                                  removeFile(attachment);
                                }
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6 hover:cursor-pointer hover:text-white hover:scale-110 transition-all"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18 18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={attachment?.id}
                        className="relative border rounded border-borderColor group"
                      >
                        <img
                          src={attachment?.attachmentUrl}
                          alt=""
                          className="h-32 object-cover rounded group-hover:bg-blend-darken group-hover:cursor-pointer"
                        />
                        <div className="bg-gray-950 bg-opacity-50 group-hover:bg-gray-950 group-hover:bg-opacity-80 w-full h-full absolute left-0 right-0 top-0"></div>
                        <div className="absolute inset-0">
                          <div className="flex items-center justify-evenly gap-6 w-full h-full">
                            <button
                              className="w-16 rounded-full ring-1 hover:cursor-pointer ring-green-500 ring-opacity-30 h-16 flex items-center justify-center hover:bg-green-950 hover:bg-opacity-65"
                              onClick={() => {
                                selectImage(attachment?.attachmentUrl);
                                setIsOpen(false);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6 hover:cursor-pointer hover:text-white hover:scale-110 transition-all"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m4.5 12.75 6 6 9-13.5"
                                />
                              </svg>
                            </button>
                            <button
                              className="w-16 rounded-full hover:cursor-pointer ring-1 ring-red-500 
                            ring-opacity-30 h-16 flex items-center justify-center hover:bg-red-950 hover:bg-opacity-65"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you wish to delete this item?"
                                  )
                                ) {
                                  removeFile(attachment);
                                }
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6 hover:cursor-pointer hover:text-white hover:scale-110 transition-all"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18 18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }
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
          <div className="bg-secondary border-t border-borderColor p-4 mt-auto">
            <div className="flex items-center gap-4">
              <div className="">Upload File</div>
              {fileType === FileType.Image && (
                <input
                  id="attachments"
                  className="file:bg-accent file:text-stone-300 file:border-[1px] "
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  name="attachments"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files === null) {
                      return;
                    }

                    const file = event.target.files[0];
                    if (
                      file.type.substring(0, 5) === fileType.toLocaleLowerCase()
                    ) {
                      uploadFile(file, fileType);
                    }
                    listAttachments();
                  }}
                />
              )}
              {fileType === FileType.Document && (
                <input
                  id="attachments"
                  className="file:bg-accent file:text-stone-300 file:border-[1px] "
                  type="file"
                  accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                  text/plain, application/pdf"
                  name="attachments"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files === null) {
                      return;
                    }

                    const file = event.target.files[0];
                    if (
                      file.type.substring(0, 5) === fileType.toLocaleLowerCase()
                    ) {
                      uploadFile(file, fileType);
                    }
                    listAttachments();
                  }}
                />
              )}
              {fileType === FileType.Audio && (
                <input
                  id="attachments"
                  className="file:bg-accent file:text-stone-300 file:border-[1px] "
                  type="file"
                  accept="audio/mp3,audio/*;capture=microphone"
                  name="attachments"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files === null) {
                      return;
                    }

                    const file = event.target.files[0];
                    if (
                      file.type.substring(0, 5) === fileType.toLocaleLowerCase()
                    ) {
                      uploadFile(file, fileType);
                    }
                    listAttachments();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>,
      document.getElementById("portal")!
    );
  } else {
    return null;
  }
};
export default ImageBrowser;

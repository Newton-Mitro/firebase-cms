import { ReactComponent as YourSvg } from "assets/icon/pdf.svg";
import { ChangeEvent, useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import AppLoader from "../../components/AppLoader";
import PaginateRow from "../../components/PaginateRow";
import { FileType } from "../../enums/file-type.enum";
import useGetAttachments from "./useGetAttachments";
import useRemoveFile from "./useRemoveFile";
import useUploadFile from "./useUploadFile";

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
                        file.type.substring(0, 5) ===
                        fileType.toLocaleLowerCase()
                      ) {
                        uploadFile(file, fileType);
                      }
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
                      uploadFile(file, fileType);
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
                      uploadFile(file, fileType);
                      listAttachments();
                    }}
                  />
                )}
              </div>
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
                    if (FileType.Document === file.fileType) {
                      return (
                        <div className="relative group">
                          <div className="flex flex-col gap-2 items-center border border-borderColor p-2">
                            <YourSvg className="w-16 h-16" />

                            <div>{file.fileName}</div>
                            <div className="w-full h-full group-hover:bg-slate-950/50 absolute inset-0"></div>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 absolute top-1 right-0.5 hover:cursor-pointer hover:scale-125 transition-all"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this item?"
                                )
                              ) {
                                removeFile(file);
                              }
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </div>
                      );
                    }
                    if (FileType.Image === file.fileType) {
                      return (
                        <>
                          <div className="relative">
                            <PhotoView src={file?.attachmentUrl}>
                              <div className="group rounded shadow hover:cursor-pointer h-20 w-32 relative">
                                <img
                                  src={file?.attachmentUrl}
                                  alt=""
                                  className="object-cover h-20 w-32"
                                />

                                <div className="w-full h-full group-hover:bg-slate-950/50 absolute inset-0"></div>

                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-8 absolute top-6 left-12 hover:scale-125 transition-all"
                                  onClick={() => {}}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
                                  />
                                </svg>
                              </div>
                            </PhotoView>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6 absolute top-1 right-0.5 hover:cursor-pointer hover:scale-125 transition-all"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you wish to delete this item?"
                                  )
                                ) {
                                  removeFile(file);
                                }
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </div>
                        </>
                      );
                    }

                    if (FileType.Audio === file.fileType) {
                      return (
                        <>
                          <div className="bg-gray-500 flex items-center rounded pr-2">
                            <div className="">
                              <audio controls>
                                <source
                                  src="https://firebasestorage.googleapis.com/v0/b/christosangeet-afa3a.appspot.com/o/Audio%2Ffile_example_MP3_700KB.mp3?alt=media&token=6a290db3-fc7e-4da0-93ec-b4d84990e131"
                                  type="audio/ogg"
                                />
                                <source
                                  src="https://firebasestorage.googleapis.com/v0/b/christosangeet-afa3a.appspot.com/o/Audio%2Ffile_example_MP3_700KB.mp3?alt=media&token=6a290db3-fc7e-4da0-93ec-b4d84990e131"
                                  type="audio/mpeg"
                                />
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6 hover:cursor-pointer hover:scale-125 transition-all"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you wish to delete this item?"
                                  )
                                ) {
                                  removeFile(file);
                                }
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </div>
                        </>
                      );
                    }
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

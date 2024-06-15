import { useEffect, useState } from "react";
import AppLoader from "../../../components/AppLoader";
import { FileType } from "../../../enums/file-type.enum";
import useGetAttachments from "../hooks/useGetAttachments";
import useRemoveFile from "../hooks/useRemoveFile";
import useUploadFile from "../hooks/useUploadFile";

const SiteSettings = () => {
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
    listAttachments(fileType, currentPostStartFrom, limit);
  }, [removedFileId, fileType, fileUrl, currentPostStartFrom, limit]);

  return (
    <>
      <AppLoader
        isLoading={loading || attachmentsLoading || removeFileLoading}
      />
      <div className="w-full space-y-2">
        <h2 className="text-xl">Settings</h2>
        <div className="h-[calc(100vh-122px)] border border-borderColor bg-secondary p-2 flex flex-col overflow-auto relative">
          <div className="flex flex-col gap-2">
            <div className="header flex gap-1 justify-between">
              <div className="flex items-center gap-2 justify-end"></div>
            </div>
            <div className="body border border-borderColor h-[calc(100vh-226px)] w-full lg:w-1/2 overflow-auto bg-primary"></div>
            <div className="flex">
              <button
                type="submit"
                className="hover:bg-success bg-accent border border-borderColor hover:shadow-md transition-all shadow rounded px-4 py-2 hover:cursor-pointer"
              >
                Update Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SiteSettings;

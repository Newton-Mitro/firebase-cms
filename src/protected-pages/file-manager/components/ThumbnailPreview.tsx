import { ReactComponent as YourSvg } from "assets/icon/pdf.svg";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { FileType } from "../../../enums/file-type.enum";

interface ThumbnailPreviewProps {
  fileType: any;
  fileUrl: any;
  fileName: any;
  showMaximizeButton: boolean;
  showRemoveButton: boolean;
  handleRemove: any;
}

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({
  fileType,
  fileUrl,
  fileName,
  showMaximizeButton,
  showRemoveButton,
  handleRemove,
}) => {
  if (fileType === FileType.Image) {
    return (
      <div className="relative group">
        <PhotoProvider>
          <PhotoView src={fileUrl}>
            <div className="rounded shadow hover:cursor-pointer h-20 w-32 relative">
              <img src={fileUrl} alt="" className="object-cover h-20 w-32" />

              <div className="w-full h-full group-hover:bg-slate-950/50 absolute inset-0"></div>
              {showMaximizeButton && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-7 absolute bottom-1 left-1 transition-all hover:scale-125 hover:cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
              )}
            </div>
          </PhotoView>
        </PhotoProvider>
        <div className="absolute bottom-1 right-1 ">
          <div className="flex gap-1">
            {showRemoveButton && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-7 transition-all hover:scale-125 hover:cursor-pointer"
                onClick={handleRemove}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    );
  }
  if (fileType === FileType.Document) {
    return (
      <div className="relative group">
        <div className="flex flex-col gap-2 items-center border border-borderColor p-2">
          <YourSvg className="w-16 h-16" />

          <div>{fileName}</div>
          <div className="w-full h-full group-hover:bg-slate-950/50 absolute inset-0"></div>
        </div>
        {showRemoveButton && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 absolute top-1 right-0.5 hover:cursor-pointer hover:scale-125 transition-all"
            onClick={handleRemove}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        )}
      </div>
    );
  }
  if (fileType === FileType.Audio) {
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
          {showRemoveButton && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 hover:cursor-pointer hover:scale-125 transition-all"
              onClick={handleRemove}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          )}
        </div>
      </>
    );
  }
  return null;
};

export default ThumbnailPreview;

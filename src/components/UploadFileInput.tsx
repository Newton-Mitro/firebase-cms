import { ChangeEvent } from "react";
import { FileType } from "../enums/file-type.enum";

function UploadFileInput({ fileType, uploadFile, listAttachments }: any) {
  return (
    <div className="flex items-center w-40 lg:w-auto">
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
            if (file.type.substring(0, 5) === fileType.toLocaleLowerCase()) {
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
            if (file.type.substring(0, 5) === fileType.toLocaleLowerCase()) {
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
            if (file.type.substring(0, 5) === fileType.toLocaleLowerCase()) {
              uploadFile(file, fileType);
            }
            listAttachments();
          }}
        />
      )}
    </div>
  );
}

export default UploadFileInput;

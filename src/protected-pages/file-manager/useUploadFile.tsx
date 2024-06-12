import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { firebase_db, firebase_storage } from "../../configs/firebase-config";
import { FileType } from "../../enums/file-type.enum";

function useUploadFile() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  async function uploadFile(file: any, fileType: FileType) {
    try {
      if (file) {
        let metadata: any = null;
        if (fileType === FileType.Image) {
          metadata = {
            contentType: "image/jpeg",
          };
        }
        if (fileType === FileType.Audio) {
          metadata = {
            contentType: "audio/mp3",
          };
        }
        if (fileType === FileType.Document) {
          metadata = {
            contentType: "document/pdf",
          };
        }

        setLoading(true);

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(firebase_storage, fileType + "/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                setLoading(true);
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            setLoading(false);
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log("File available at", downloadURL);
                const attachmentId = uuidv4();
                const attachment = {
                  id: attachmentId,
                  fileName: file.name,
                  attachmentUrl: downloadURL,
                  filePath: fileType + "/" + file.name,
                  fileType: fileType,
                };
                await setDoc(
                  doc(firebase_db, "attachments", attachmentId),
                  attachment
                );
                setFileUrl(downloadURL);
                setLoading(false);
                toast.success("Attachment added.");
              }
            );
          }
        );
      }
    } catch (error) {
      setError(error);
      toast.error("Attachment failed to add.");
    } finally {
      setLoading(false);
    }
  }

  return { fileUrl, uploadFile, loading, error };
}

export default useUploadFile;

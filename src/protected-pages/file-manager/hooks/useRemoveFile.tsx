import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  firebase_db,
  firebase_storage,
} from "../../../configs/firebase-config";

function useRemoveFile() {
  const [removedFileId, setRemovedFileId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  async function removeFile(file: any) {
    try {
      setLoading(true);

      const docRef = doc(firebase_db, "attachments", file.id);
      await deleteDoc(docRef);
      setRemovedFileId(file.id);
      toast.success("Attachment removed from database.");

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(firebase_storage, file.filePath);
      // Delete the file
      deleteObject(storageRef)
        .then(() => {
          // File deleted successfully
          toast.success("Attachment removed from storage.");
        })
        .catch((error) => {
          toast.error("Failed to remove attachment from storage.");
        });
    } catch (error) {
      setError(error);
      toast.error("Failed to remove attachment from db");
    } finally {
      setLoading(false);
    }
  }

  return { removedFileId, removeFile, loading, error };
}

export default useRemoveFile;

import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";

function useRemoveGallery() {
  const [removeGalleryId, setRemoveGalleryId] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function removeGallery(id: any) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "galleries", id);
      await deleteDoc(docRef);
      setRemoveGalleryId(id);
      toast.success("Gallery removed!");
    } catch (e: any) {
      setError(e);
      console.error("Error adding document: ", e);
      toast.error(e);
    } finally {
      setLoading(false);
    }
  }

  return { removeGalleryId, removeGallery, loading, error };
}

export default useRemoveGallery;

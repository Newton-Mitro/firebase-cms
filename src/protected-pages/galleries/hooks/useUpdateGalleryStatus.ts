import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";

function useUpdateGalleryStatus() {
  const [updatedGalleryId, setUpdatedGalleryId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function updateGalleryStatus(id: string, status: boolean) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "galleries", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const updatedGallery = {
          status: status,
          updatedAt: serverTimestamp(),
        };

        await updateDoc(docRef, updatedGallery);
        setUpdatedGalleryId(id);
        if (status) {
          toast.success("Gallery published!");
        } else {
          toast.success("Gallery draft!");
        }
      }
    } catch (e: any) {
      setError(e);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return { updatedGalleryId, updateGalleryStatus, loading, error };
}

export default useUpdateGalleryStatus;

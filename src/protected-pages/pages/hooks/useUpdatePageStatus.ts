import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";

function useUpdatePageStatus() {
  const [updatedPageId, setUpdatedPageId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function updatePageStatus(id: string, status: boolean) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "pages", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const updatedPage = {
          status: status,
          updatedAt: serverTimestamp(),
        };

        await updateDoc(docRef, updatedPage);
        setUpdatedPageId(id);
        if (status) {
          toast.success("Page published!");
        } else {
          toast.success("Page draft!");
        }
      }
    } catch (e: any) {
      setError(e);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return { updatedPageId, updatePageStatus, loading, error };
}

export default useUpdatePageStatus;

import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";

function useUpdateNoticeStatus() {
  const [updatedNoticeId, setUpdatedNoticeId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function updateNoticeStatus(id: string, status: boolean) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "notices", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const updatedNotice = {
          status: status,
          updatedAt: serverTimestamp(),
        };

        await updateDoc(docRef, updatedNotice);
        setUpdatedNoticeId(id);
        if (status) {
          toast.success("Notice published!");
        } else {
          toast.success("Notice draft!");
        }
      }
    } catch (e: any) {
      setError(e);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return { updatedNoticeId, updateNoticeStatus, loading, error };
}

export default useUpdateNoticeStatus;

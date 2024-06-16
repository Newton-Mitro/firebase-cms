import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";

function useRemoveNotice() {
  const [removeNoticeId, setRemoveNoticeId] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function removeNotice(id: any) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "notices", id);
      await deleteDoc(docRef);
      setRemoveNoticeId(id);
      toast.success("Notice removed!");
    } catch (e: any) {
      setError(e);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return { removeNoticeId, removeNotice, loading, error };
}

export default useRemoveNotice;

import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";

function useRemoveEvent() {
  const [removeEventId, setRemoveEventId] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function removeEvent(id: any) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "events", id);
      await deleteDoc(docRef);
      setRemoveEventId(id);
      toast.success("Event removed!");
    } catch (e: any) {
      setError(e);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return { removeEventId, removeEvent, loading, error };
}

export default useRemoveEvent;

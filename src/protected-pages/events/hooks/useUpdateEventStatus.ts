import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";

function useUpdateEventStatus() {
  const [updatedEventId, setUpdatedEventId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function updateEventStatus(id: string, status: boolean) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "events", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const updatedEvent = {
          status: status,
          updatedAt: serverTimestamp(),
        };

        await updateDoc(docRef, updatedEvent);
        setUpdatedEventId(id);
        if (status) {
          toast.success("Event published!");
        } else {
          toast.success("Event draft!");
        }
      }
    } catch (e: any) {
      setError(e);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return { updatedEventId, updateEventStatus, loading, error };
}

export default useUpdateEventStatus;

import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";

function useUpdateServiceStatus() {
  const [updatedServiceId, setUpdatedServiceId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function updateServiceStatus(id: string, status: boolean) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "services", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const updatedService = {
          status: status,
          updatedAt: serverTimestamp(),
        };

        await updateDoc(docRef, updatedService);
        setUpdatedServiceId(id);
        if (status) {
          toast.success("Service published!");
        } else {
          toast.success("Service draft!");
        }
      }
    } catch (e: any) {
      setError(e);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return { updatedServiceId, updateServiceStatus, loading, error };
}

export default useUpdateServiceStatus;

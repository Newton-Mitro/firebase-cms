import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";

function useRemoveService() {
  const [removeServiceId, setRemoveServiceId] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function removeService(id: any) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "services", id);
      await deleteDoc(docRef);
      setRemoveServiceId(id);
      toast.success("Service removed!");
    } catch (e: any) {
      setError(e);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return { removeServiceId, removeService, loading, error };
}

export default useRemoveService;

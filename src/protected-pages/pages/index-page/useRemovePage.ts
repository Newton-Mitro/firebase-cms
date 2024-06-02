import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";

function useRemovePage() {
  const [removePageId, setRemovePageId] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function removePage(id: any) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "pages", id);
      await deleteDoc(docRef);
      setRemovePageId(id);
      toast.success("Page removed!");
    } catch (e: any) {
      setError(e);
      console.error("Error adding document: ", e);
      toast.error(e);
    } finally {
      setLoading(false);
    }
  }

  return { removePageId, removePage, loading, error };
}

export default useRemovePage;

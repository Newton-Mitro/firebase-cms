import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";

function useUpdatePostStatus() {
  const [updatedPostId, setUpdatedPostId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function updatePostStatus(id: string, status: boolean) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const updatedPost = {
          status: status,
          updatedAt: serverTimestamp(),
        };

        await updateDoc(docRef, updatedPost);
        setUpdatedPostId(id);
        if (status) {
          toast.success("Post published!");
        } else {
          toast.success("Post draft!");
        }
      }
    } catch (e: any) {
      setError(e);
      console.error("Error adding document: ", e);
      toast.error(e);
    } finally {
      setLoading(false);
    }
  }

  return { updatedPostId, updatePostStatus, loading, error };
}

export default useUpdatePostStatus;

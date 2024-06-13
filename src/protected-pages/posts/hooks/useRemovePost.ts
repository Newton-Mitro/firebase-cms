import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";

function useRemovePost() {
  const [removePostId, setRemovePostId] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function removePost(id: any) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "posts", id);
      await deleteDoc(docRef);
      setRemovePostId(id);
      toast.success("Post removed!");
    } catch (e: any) {
      setError(e);
      console.error("Error adding document: ", e);
      toast.error(e);
    } finally {
      setLoading(false);
    }
  }

  return { removePostId, removePost, loading, error };
}

export default useRemovePost;

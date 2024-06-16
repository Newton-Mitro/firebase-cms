import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";
import { NoticeModel } from "../models/notice.model";

function useUpdateNotice() {
  const [notice, setNotice] = useState<NoticeModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function updateNotice(id: string, notice: NoticeModel) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "notices", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const updatedNotice = {
          slug: notice?.slug,
          title: notice?.title,
          content: notice?.content,
          contentSummery: notice?.contentSummery,
          featuredImage: notice?.featuredImage,
          sections: notice?.sections,
          status: notice?.status,
          updatedAt: serverTimestamp(),
        };

        await updateDoc(docRef, updatedNotice);
        setNotice({
          ...updatedNotice,
          createdAt: notice?.createdAt,
          id: notice?.id,
        });
        toast.success("Notice updated!");
      }
    } catch (e: any) {
      setError(e);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return { notice, updateNotice, loading, error };
}

export default useUpdateNotice;

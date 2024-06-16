import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";
import { NoticeModel } from "../models/notice.model";

function useAddNotice() {
  const [notice, setNotice] = useState<NoticeModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  async function addNotice(notice: NoticeModel) {
    try {
      notice = {
        id: notice?.id,
        slug: notice?.slug,
        title: notice?.title,
        content: notice?.content,
        contentSummery: notice?.contentSummery,
        featuredImage: notice?.featuredImage,
        sections: notice?.sections,
        status: notice?.status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(doc(firebase_db, "notices", notice?.id), notice);
      setNotice(notice);
      toast.success("Notice added!");
    } catch (error) {
      setError(error);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return { notice, addNotice, loading, error };
}

export default useAddNotice;

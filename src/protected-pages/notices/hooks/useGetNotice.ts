import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";
import { NoticeModel } from "../models/notice.model";

function useGetNotice() {
  const [notice, setNotice] = useState<NoticeModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getNotice(id: string) {
    try {
      const docRef = doc(firebase_db, "notices", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNotice({
          id: docSnap.id,
          slug: data?.slug,
          title: data?.title,
          content: data?.content,
          contentSummery: data?.contentSummery,
          featuredImage: data?.featuredImage,
          sections: data?.sections,
          status: data?.status,
          createdAt: data?.createdAt,
          updatedAt: data?.updatedAt,
        });
      }
    } catch (e: any) {
      setError(e);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return { notice, getNotice, loading, error };
}

export default useGetNotice;

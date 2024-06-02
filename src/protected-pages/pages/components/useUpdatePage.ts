import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";
import { PageModel } from "../models/page.model";

function useUpdatePage() {
  const [page, setPage] = useState<PageModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function updatePage(id: string, page: PageModel) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "pages", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const updatedPage = {
          slug: page.slug,
          title: page.title,
          content: page.content,
          contentSummery: page.contentSummery,
          attachments: page.attachments,
          status: page.status,
          createdAt: page.createdAt,
          updatedAt: serverTimestamp(),
        };

        await updateDoc(docRef, updatedPage);
        setPage({ ...updatedPage, id: page.id });
        toast.success("Page updated!");
      }
    } catch (e: any) {
      setError(e);
      console.error("Error adding document: ", e);
      toast.error("Error occurred during updating page.");
    } finally {
      setLoading(false);
    }
  }

  return { page, updatePage, loading, error };
}

export default useUpdatePage;

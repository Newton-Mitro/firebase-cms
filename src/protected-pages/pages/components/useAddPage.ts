import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";
import { PageModel } from "../models/page.model";

function useAddPage() {
  const [page, setPage] = useState<PageModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  async function addPage(page: PageModel) {
    try {
      page = {
        id: page.id,
        slug: page.slug,
        title: page.title,
        contentSummery: page.contentSummery,
        sections: page.sections,
        status: page.status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(doc(firebase_db, "pages", page.id), page);
      setPage(page);
      toast.success("Page added!");
    } catch (error) {
      setError(error);
      toast.error("Error occurred while adding page.");
    } finally {
      setLoading(false);
    }
  }

  return { page, addPage, loading, error };
}

export default useAddPage;

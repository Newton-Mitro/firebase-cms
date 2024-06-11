import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { firebase_db } from "../../../configs/firebase-config";
import { PageModel } from "../models/page.model";

function useGetPage() {
  const [page, setPage] = useState<PageModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getPage(id: string) {
    try {
      const docRef = doc(firebase_db, "pages", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setPage({
          id: docSnap.id,
          slug: data.slug,
          title: data.title,
          contentSummery: data.contentSummery,
          featuredImage: data.featuredImage,
          sections: data.sections,
          status: data.status,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      }
    } catch (e: any) {
      setError(e);
      console.error("Error adding document: ", e);
    } finally {
      setLoading(false);
    }
  }

  return { page, getPage, loading, error };
}

export default useGetPage;

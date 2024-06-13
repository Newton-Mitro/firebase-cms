import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { firebase_db } from "../../../configs/firebase-config";
import { GalleryModel } from "../models/gallery.model";

function useGetGallery() {
  const [page, setGallery] = useState<GalleryModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getGallery(id: string) {
    try {
      const docRef = doc(firebase_db, "galleries", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setGallery({
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

  return { page, getGallery, loading, error };
}

export default useGetGallery;

import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";
import { GalleryModel } from "../models/gallery.model";

function useUpdateGallery() {
  const [gallery, setGallery] = useState<GalleryModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function updateGallery(id: string, gallery: GalleryModel) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "galleries", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const updatedGallery = {
          slug: gallery.slug,
          title: gallery.title,
          contentSummery: gallery.contentSummery,
          featuredImage: gallery.featuredImage,
          sections: gallery.sections,
          status: gallery.status,
          createdAt: gallery.createdAt,
          updatedAt: serverTimestamp(),
        };

        await updateDoc(docRef, updatedGallery);
        setGallery({ ...updatedGallery, id: gallery.id });
        toast.success("Gallery updated!");
      }
    } catch (e: any) {
      setError(e);
      console.error("Error adding document: ", e);
      toast.error("Error occurred during updating gallery.");
    } finally {
      setLoading(false);
    }
  }

  return { gallery, updateGallery, loading, error };
}

export default useUpdateGallery;

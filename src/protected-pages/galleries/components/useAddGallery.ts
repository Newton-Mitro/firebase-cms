import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";
import { GalleryModel } from "../models/gallery.model";

function useAddGallery() {
  const [gallery, setGallery] = useState<GalleryModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  async function addGallery(gallery: GalleryModel) {
    try {
      gallery = {
        id: gallery.id,
        slug: gallery.slug,
        title: gallery.title,
        contentSummery: gallery.contentSummery,
        featuredImage: gallery.featuredImage,
        sections: gallery.sections,
        status: gallery.status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(doc(firebase_db, "galleries", gallery.id), gallery);
      setGallery(gallery);
      toast.success("Gallery added!");
    } catch (error) {
      setError(error);
      toast.error("Error occurred while adding gallery.");
    } finally {
      setLoading(false);
    }
  }

  return { gallery, addGallery, loading, error };
}

export default useAddGallery;

import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";
import { PostModel } from "../models/post.model";

function useGetPost() {
  const [post, setPost] = useState<PostModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getPost(id: string) {
    try {
      const docRef = doc(firebase_db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setPost({
          id: docSnap.id,
          slug: data?.slug,
          title: data?.title,
          content: data?.content,
          contentSummery: data?.contentSummery,
          featuredImage: data?.featuredImage,
          attachments: data?.attachments,
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

  return { post, getPost, loading, error };
}

export default useGetPost;

import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";
import { PostModel } from "../models/post.model";

function useUpdatePost() {
  const [post, setPost] = useState<PostModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function updatePost(id: string, post: PostModel) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const updatedPost = {
          slug: post.slug,
          title: post.title,
          content: post.content,
          contentSummery: post.contentSummery,
          featuredImage: post.featuredImage,
          attachments: post.attachments,
          status: post.status,
          updatedAt: serverTimestamp(),
        };

        await updateDoc(docRef, updatedPost);
        setPost({ ...updatedPost, createdAt: post.createdAt, id: post.id });
        toast.success("Post updated!");
      }
    } catch (e: any) {
      setError(e);
      console.error("Error adding document: ", e);
      toast.error("Error occurred during updating post.");
    } finally {
      setLoading(false);
    }
  }

  return { post, updatePost, loading, error };
}

export default useUpdatePost;

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";
import { PostModel } from "../models/post.model";

function useAddPost() {
  const [post, setPost] = useState<PostModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  async function addPost(post: PostModel) {
    try {
      post = {
        id: post.id,
        slug: post.slug,
        title: post.title,
        content: post.content,
        contentSummery: post.contentSummery,
        attachments: post.attachments,
        status: post.status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(doc(firebase_db, "posts", post.id), post);
      setPost(post);
      toast.success("Post added!");
    } catch (error) {
      setError(error);
      toast.error("Error occurred while adding post.");
    } finally {
      setLoading(false);
    }
  }

  return { post, addPost, loading, error };
}

export default useAddPost;

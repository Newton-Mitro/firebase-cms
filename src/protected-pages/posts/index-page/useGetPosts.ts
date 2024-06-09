import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebase_db } from "../../../configs/firebase-config";
import { PostModel } from "../models/post.model";

function useGetPosts() {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<number>(0);
  const [nextPost, setNextPost] = useState<number>(0);
  const [previousPost, setPreviousPost] = useState<number>(0);
  const [firstPost, setFirstPost] = useState<number>(0);
  const [lastPost, setLastPost] = useState<number>(0);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts(
    _currentPostStartAt: number = 1,
    _limit: number = 10
  ) {
    try {
      setLoading(true);
      const allPostsQuery = query(
        collection(firebase_db, "posts"),
        orderBy("updatedAt")
      );

      const documentSnapshots = await getDocs(allPostsQuery);
      setTotalRecords(documentSnapshots.size);
      setTotalPosts(Math.round(documentSnapshots.size / _limit));
      setTotalRecords(documentSnapshots.size);
      setActivePost(_currentPostStartAt);
      setNextPost(
        _currentPostStartAt < Math.round(documentSnapshots.size / _limit)
          ? _currentPostStartAt + 1
          : _currentPostStartAt
      );
      setPreviousPost(_currentPostStartAt < 2 ? 1 : _currentPostStartAt - 1);
      setFirstPost(Math.round(documentSnapshots.size / _limit) > 1 ? 1 : 0);
      setLastPost(Math.round(documentSnapshots.size / _limit));

      const temp = _currentPostStartAt - 1;
      const currentPostStartAfter = temp * _limit;
      const nextPostRecordStartAfter =
        documentSnapshots.docs[currentPostStartAfter];
      // Construct a new query starting at this document,
      // get the next 25 cities.
      const next = query(
        collection(firebase_db, "posts"),
        orderBy("updatedAt"),
        startAt(nextPostRecordStartAfter),
        limit(_limit)
      );

      const currentDocumentSnapshots = await getDocs(next);

      const postList = currentDocumentSnapshots.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          slug: data.slug,
          title: data.title,
          content: data.content,
          contentSummery: data.contentSummery,
          attachments: data.attachments,
          status: data.status,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };
      });
      setPosts(postList);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    posts,
    getPosts,
    loading,
    error,
    activePost,
    nextPost,
    previousPost,
    firstPost,
    lastPost,
    totalPosts,
    totalRecords,
  };
}

export default useGetPosts;

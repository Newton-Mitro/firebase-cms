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
  const [activeView, setActiveView] = useState<number>(0);
  const [nextView, setNextView] = useState<number>(0);
  const [previousView, setPreviousView] = useState<number>(0);
  const [firstView, setFirstView] = useState<number>(1);
  const [lastView, setLastView] = useState<number>(0);
  const [totalViews, setTotalViews] = useState<number>(0);
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
      setTotalViews(Math.ceil(documentSnapshots.size / _limit));
      setTotalRecords(documentSnapshots.size);
      setActiveView(_currentPostStartAt);
      setNextView(
        Math.round(documentSnapshots.size % _limit) !== 0
          ? _currentPostStartAt + 1
          : _currentPostStartAt
      );
      setPreviousView(_currentPostStartAt < 2 ? 1 : _currentPostStartAt - 1);
      setFirstView(documentSnapshots.size % _limit === 0 ? 0 : 1);
      setLastView(Math.ceil(documentSnapshots.size / _limit));

      const temp = _currentPostStartAt - 1;
      const currentPostStartAfter = temp * _limit;
      const nextViewRecordStartAfter =
        documentSnapshots.docs[currentPostStartAfter];
      // Construct a new query starting at this document,
      // get the next 25 cities.
      const next = query(
        collection(firebase_db, "posts"),
        orderBy("updatedAt"),
        startAt(nextViewRecordStartAfter),
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
          featuredImage: data.featuredImage,
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
    activeView,
    nextView,
    previousView,
    firstView,
    lastView,
    totalViews,
    totalRecords,
  };
}

export default useGetPosts;

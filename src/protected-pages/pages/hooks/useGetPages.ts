import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";
import { PageModel } from "../models/page.model";

function useGetPages() {
  const [pages, setPages] = useState<PageModel[]>([]);
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
    getPages();
  }, []);

  async function getPages(
    _currentPageStartAt: number = 1,
    _limit: number = 10
  ) {
    try {
      setLoading(true);
      const allPagesQuery = query(
        collection(firebase_db, "pages"),
        orderBy("updatedAt", "desc")
      );

      const documentSnapshots = await getDocs(allPagesQuery);
      setTotalRecords(documentSnapshots.size);

      setTotalViews(Math.ceil(documentSnapshots.size / _limit));
      setTotalRecords(documentSnapshots.size);
      setActiveView(_currentPageStartAt);
      setNextView(
        Math.round(documentSnapshots.size % _limit) !== 0
          ? _currentPageStartAt + 1
          : _currentPageStartAt
      );
      setPreviousView(_currentPageStartAt < 2 ? 1 : _currentPageStartAt - 1);
      setFirstView(documentSnapshots.size % _limit === 0 ? 0 : 1);
      setLastView(Math.ceil(documentSnapshots.size / _limit));

      const temp = _currentPageStartAt - 1;
      const currentPageStartAfter = temp * _limit;
      const nextViewRecordStartAfter =
        documentSnapshots.docs[currentPageStartAfter];
      // Construct a new query starting at this document,
      // get the next 25 cities.
      if (documentSnapshots.size > 0) {
        const next = query(
          collection(firebase_db, "pages"),
          orderBy("updatedAt", "desc"),
          startAt(nextViewRecordStartAfter),
          limit(_limit)
        );

        const currentDocumentSnapshots = await getDocs(next);

        const pageList = currentDocumentSnapshots.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            slug: data?.slug,
            title: data?.title,
            content: data?.content,
            contentSummery: data?.contentSummery,
            featuredImage: data?.featuredImage,
            sections: data?.sections,
            status: data?.status,
            createdAt: data?.createdAt,
            updatedAt: data?.updatedAt,
          };
        });
        setPages(pageList);
      } else {
        setPages([]);
      }
    } catch (error: any) {
      setError(error);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return {
    pages,
    getPages,
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

export default useGetPages;

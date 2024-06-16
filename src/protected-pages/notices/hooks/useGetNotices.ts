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
import { NoticeModel } from "../models/notice.model";

function useGetNotices() {
  const [notices, setNotices] = useState<NoticeModel[]>([]);
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
    getNotices();
  }, []);

  async function getNotices(
    _currentNoticeStartAt: number = 1,
    _limit: number = 10
  ) {
    try {
      setLoading(true);
      const allNoticesQuery = query(
        collection(firebase_db, "notices"),
        orderBy("updatedAt", "desc")
      );

      const documentSnapshots = await getDocs(allNoticesQuery);
      setTotalRecords(documentSnapshots.size);

      setTotalViews(Math.ceil(documentSnapshots.size / _limit));
      setTotalRecords(documentSnapshots.size);
      setActiveView(_currentNoticeStartAt);
      setNextView(
        Math.round(documentSnapshots.size % _limit) !== 0
          ? _currentNoticeStartAt + 1
          : _currentNoticeStartAt
      );
      setPreviousView(
        _currentNoticeStartAt < 2 ? 1 : _currentNoticeStartAt - 1
      );
      setFirstView(documentSnapshots.size % _limit === 0 ? 0 : 1);
      setLastView(Math.ceil(documentSnapshots.size / _limit));

      const temp = _currentNoticeStartAt - 1;
      const currentNoticeStartAfter = temp * _limit;
      const nextViewRecordStartAfter =
        documentSnapshots.docs[currentNoticeStartAfter];
      // Construct a new query starting at this document,
      // get the next 25 cities.
      if (documentSnapshots.size > 0) {
        const next = query(
          collection(firebase_db, "notices"),
          orderBy("updatedAt", "desc"),
          startAt(nextViewRecordStartAfter),
          limit(_limit)
        );

        const currentDocumentSnapshots = await getDocs(next);

        const noticeList = currentDocumentSnapshots.docs.map((doc) => {
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
        setNotices(noticeList);
      } else {
        setNotices([]);
      }
    } catch (error: any) {
      setError(error);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return {
    notices,
    getNotices,
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

export default useGetNotices;

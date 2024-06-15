import {
  collection,
  getDocs,
  limit,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebase_db } from "../../../configs/firebase-config";
import { FileType } from "../../../enums/file-type.enum";

function useGetAttachments() {
  const [attachments, setAttachments] = useState<any[] | null>(null);
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
    listAttachments();
  }, []);

  async function listAttachments(
    fileType: string = FileType.Image,
    _currentPageStartAt: number = 1,
    _limit: number = 10
  ) {
    try {
      setLoading(true);
      const q = query(
        collection(firebase_db, "attachments"),
        where("fileType", "==", fileType)
      );

      const documentSnapshots = await getDocs(q);
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

      if (documentSnapshots.size > 0) {
        const next = query(
          collection(firebase_db, "attachments"),
          where("fileType", "==", fileType),
          startAt(nextViewRecordStartAfter),
          limit(_limit)
        );

        const querySnapshot = await getDocs(next);
        let pageList: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          pageList.push({
            id: doc.id,
            fileName: data.fileName,
            attachmentUrl: data.attachmentUrl,
            fileType: data.fileType,
            filePath: data.filePath,
          });
        });
        setAttachments(pageList);
      } else {
        setAttachments([]);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    attachments,
    listAttachments,
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

export default useGetAttachments;

import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebase_db } from "../../configs/firebase-config";
import { FileType } from "../../enums/file-type.enum";

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

  async function listAttachments(fileType: string = FileType.Image) {
    try {
      setLoading(true);
      const q = query(
        collection(firebase_db, "attachments"),
        where("fileType", "==", fileType)
      );

      const querySnapshot = await getDocs(q);
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

      // const pagesCollection = collection(firebase_db, "attachments");
      // const pagesSnapshot = await getDocs(pagesCollection);
      // const pageList = pagesSnapshot.docs.map((doc) => {
      //   const data = doc.data();
      //   return {
      //     id: doc.id,
      //     fileName: data.fileName,
      //     attachmentUrl: data.attachmentUrl,
      //     fileType: data.fileType,
      //     filePath: data.filePath,
      //   };
      // });
      setAttachments(pageList);
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

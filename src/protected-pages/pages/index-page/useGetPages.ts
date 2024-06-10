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
import { PageModel } from "../models/page.model";

function useGetPages() {
  const [pages, setPages] = useState<PageModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<number>(0);
  const [previousPage, setPreviousPage] = useState<number>(0);
  const [firstPage, setFirstPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
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
        orderBy("updatedAt")
      );

      const documentSnapshots = await getDocs(allPagesQuery);
      setTotalRecords(documentSnapshots.size);
      setTotalPages(Math.round(documentSnapshots.size / _limit));
      setTotalRecords(documentSnapshots.size);
      setActivePage(_currentPageStartAt);
      setNextPage(
        _currentPageStartAt < Math.round(documentSnapshots.size / _limit)
          ? _currentPageStartAt + 1
          : _currentPageStartAt
      );
      setPreviousPage(_currentPageStartAt < 2 ? 1 : _currentPageStartAt - 1);
      setFirstPage(Math.round(documentSnapshots.size / _limit) > 1 ? 1 : 0);
      setLastPage(Math.round(documentSnapshots.size / _limit));

      const temp = _currentPageStartAt - 1;
      const currentPageStartAfter = temp * _limit;
      const nextPageRecordStartAfter =
        documentSnapshots.docs[currentPageStartAfter];
      // Construct a new query starting at this document,
      // get the next 25 cities.
      const next = query(
        collection(firebase_db, "pages"),
        orderBy("updatedAt"),
        startAt(nextPageRecordStartAfter),
        limit(_limit)
      );

      const currentDocumentSnapshots = await getDocs(next);

      const pageList = currentDocumentSnapshots.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          slug: data.slug,
          title: data.title,
          contentSummery: data.contentSummery,
          featuredImage: data.featuredImage,
          sections: data.sections,
          status: data.status,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };
      });
      setPages(pageList);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    pages,
    getPages,
    loading,
    error,
    activePage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    totalPages,
    totalRecords,
  };
}

export default useGetPages;

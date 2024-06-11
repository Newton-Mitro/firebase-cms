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
import { GalleryModel } from "../models/gallery.model";

function useGetGalleries() {
  const [galleries, setGalleries] = useState<GalleryModel[]>([]);
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
    getGalleries();
  }, []);

  async function getGalleries(
    _currentGalleryStartAt: number = 1,
    _limit: number = 10
  ) {
    try {
      setLoading(true);
      const allGalleriesQuery = query(
        collection(firebase_db, "galleries"),
        orderBy("updatedAt")
      );

      const documentSnapshots = await getDocs(allGalleriesQuery);
      setTotalRecords(documentSnapshots.size);

      setTotalViews(Math.ceil(documentSnapshots.size / _limit));
      setTotalRecords(documentSnapshots.size);
      setActiveView(_currentGalleryStartAt);
      setNextView(
        Math.round(documentSnapshots.size % _limit) !== 0
          ? _currentGalleryStartAt + 1
          : _currentGalleryStartAt
      );
      setPreviousView(
        _currentGalleryStartAt < 2 ? 1 : _currentGalleryStartAt - 1
      );
      setFirstView(documentSnapshots.size % _limit === 0 ? 0 : 1);
      setLastView(Math.ceil(documentSnapshots.size / _limit));

      const temp = _currentGalleryStartAt - 1;
      const currentGalleryStartAfter = temp * _limit;
      const nextViewRecordStartAfter =
        documentSnapshots.docs[currentGalleryStartAfter];
      // Construct a new query starting at this document,
      // get the next 25 cities.
      const next = query(
        collection(firebase_db, "galleries"),
        orderBy("updatedAt"),
        startAt(nextViewRecordStartAfter),
        limit(_limit)
      );

      const currentDocumentSnapshots = await getDocs(next);

      const galleryList = currentDocumentSnapshots.docs.map((doc) => {
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
      setGalleries(galleryList);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    galleries,
    getGalleries,
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

export default useGetGalleries;

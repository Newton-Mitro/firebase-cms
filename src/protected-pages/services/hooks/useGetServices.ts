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
import { ServiceModel } from "../models/service.model";

function useGetServices() {
  const [services, setServices] = useState<ServiceModel[]>([]);
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
    getServices();
  }, []);

  async function getServices(
    _currentServiceStartAt: number = 1,
    _limit: number = 10
  ) {
    try {
      setLoading(true);
      const allServicesQuery = query(
        collection(firebase_db, "services"),
        orderBy("updatedAt", "desc")
      );

      const documentSnapshots = await getDocs(allServicesQuery);
      setTotalRecords(documentSnapshots.size);
      setTotalViews(Math.ceil(documentSnapshots.size / _limit));
      setTotalRecords(documentSnapshots.size);
      setActiveView(_currentServiceStartAt);
      setNextView(
        Math.round(documentSnapshots.size % _limit) !== 0
          ? _currentServiceStartAt + 1
          : _currentServiceStartAt
      );
      setPreviousView(
        _currentServiceStartAt < 2 ? 1 : _currentServiceStartAt - 1
      );
      setFirstView(documentSnapshots.size % _limit === 0 ? 0 : 1);
      setLastView(Math.ceil(documentSnapshots.size / _limit));

      const temp = _currentServiceStartAt - 1;
      const currentServiceStartAfter = temp * _limit;
      const nextViewRecordStartAfter =
        documentSnapshots.docs[currentServiceStartAfter];
      if (documentSnapshots.size > 0) {
        const next = query(
          collection(firebase_db, "services"),
          orderBy("updatedAt", "desc"),
          startAt(nextViewRecordStartAfter),
          limit(_limit)
        );

        const currentDocumentSnapshots = await getDocs(next);

        const serviceList = currentDocumentSnapshots.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            slug: data?.slug,
            title: data?.title,
            content: data?.content,
            contentSummery: data?.contentSummery,
            featuredImage: data?.featuredImage,
            attachments: data?.attachments,
            status: data?.status,
            createdAt: data?.createdAt,
            updatedAt: data?.updatedAt,
          };
        });
        setServices(serviceList);
      } else {
        setServices([]);
      }
    } catch (error: any) {
      setError(error);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return {
    services,
    getServices,
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

export default useGetServices;

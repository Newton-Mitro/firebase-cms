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
import { EventModel } from "../models/event.model";

function useGetEvents() {
  const [events, setEvents] = useState<EventModel[]>([]);
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
    getEvents();
  }, []);

  async function getEvents(
    _currentEventStartAt: number = 1,
    _limit: number = 10
  ) {
    try {
      setLoading(true);
      const allEventsQuery = query(
        collection(firebase_db, "events"),
        orderBy("updatedAt", "desc")
      );

      const documentSnapshots = await getDocs(allEventsQuery);
      setTotalRecords(documentSnapshots.size);

      setTotalViews(Math.ceil(documentSnapshots.size / _limit));
      setTotalRecords(documentSnapshots.size);
      setActiveView(_currentEventStartAt);
      setNextView(
        Math.round(documentSnapshots.size % _limit) !== 0
          ? _currentEventStartAt + 1
          : _currentEventStartAt
      );
      setPreviousView(_currentEventStartAt < 2 ? 1 : _currentEventStartAt - 1);
      setFirstView(documentSnapshots.size % _limit === 0 ? 0 : 1);
      setLastView(Math.ceil(documentSnapshots.size / _limit));

      const temp = _currentEventStartAt - 1;
      const currentEventStartAfter = temp * _limit;
      const nextViewRecordStartAfter =
        documentSnapshots.docs[currentEventStartAfter];
      // Construct a new query starting at this document,
      // get the next 25 cities.
      if (documentSnapshots.size > 0) {
        const next = query(
          collection(firebase_db, "events"),
          orderBy("updatedAt", "desc"),
          startAt(nextViewRecordStartAfter),
          limit(_limit)
        );

        const currentDocumentSnapshots = await getDocs(next);

        const eventList = currentDocumentSnapshots.docs.map((doc) => {
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
        setEvents(eventList);
      } else {
        setEvents([]);
      }
    } catch (error: any) {
      setError(error);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return {
    events,
    getEvents,
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

export default useGetEvents;

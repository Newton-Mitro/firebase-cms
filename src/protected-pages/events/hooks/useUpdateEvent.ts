import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";
import { EventModel } from "../models/event.model";

function useUpdateEvent() {
  const [event, setEvent] = useState<EventModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function updateEvent(id: string, event: EventModel) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "events", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const updatedEvent = {
          slug: event?.slug,
          title: event?.title,
          content: event?.content,
          contentSummery: event?.contentSummery,
          featuredImage: event?.featuredImage,
          sections: event?.sections,
          status: event?.status,
          updatedAt: serverTimestamp(),
        };

        await updateDoc(docRef, updatedEvent);
        setEvent({
          ...updatedEvent,
          createdAt: event?.createdAt,
          id: event?.id,
        });
        toast.success("Event updated!");
      }
    } catch (e: any) {
      setError(e);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return { event, updateEvent, loading, error };
}

export default useUpdateEvent;

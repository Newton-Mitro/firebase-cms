import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";
import { EventModel } from "../models/event.model";

function useAddEvent() {
  const [event, setEvent] = useState<EventModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  async function addEvent(event: EventModel) {
    try {
      event = {
        id: event?.id,
        slug: event?.slug,
        title: event?.title,
        content: event?.content,
        contentSummery: event?.contentSummery,
        featuredImage: event?.featuredImage,
        sections: event?.sections,
        status: event?.status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(doc(firebase_db, "events", event?.id), event);
      setEvent(event);
      toast.success("Event added!");
    } catch (error) {
      setError(error);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return { event, addEvent, loading, error };
}

export default useAddEvent;

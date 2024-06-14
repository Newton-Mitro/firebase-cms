import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";
import { ServiceModel } from "../models/service.model";

function useUpdateService() {
  const [service, setService] = useState<ServiceModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function updateService(id: string, service: ServiceModel) {
    try {
      setLoading(true);
      const docRef = doc(firebase_db, "services", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const updatedService = {
          slug: service?.slug,
          title: service?.title,
          content: service?.content,
          contentSummery: service?.contentSummery,
          featuredImage: service?.featuredImage,
          attachments: service?.attachments,
          status: service?.status,
          updatedAt: serverTimestamp(),
        };

        await updateDoc(docRef, updatedService);
        try {
          setService({
            ...updatedService,
            createdAt: service?.createdAt,
            id: service?.id,
          });
        } catch (error) {}

        toast.success("Service updated!");
      }
    } catch (e: any) {
      setError(e);
      toast.error("An error has been occurred.");
    } finally {
      setLoading(false);
    }
  }

  return { service, updateService, loading, error };
}

export default useUpdateService;

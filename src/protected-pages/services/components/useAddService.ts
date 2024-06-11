import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firebase_db } from "../../../configs/firebase-config";
import { ServiceModel } from "../models/service.model";

function useAddService() {
  const [service, setService] = useState<ServiceModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  async function addService(service: ServiceModel) {
    try {
      service = {
        id: service.id,
        slug: service.slug,
        title: service.title,
        content: service.content,
        contentSummery: service.contentSummery,
        featuredImage: service.featuredImage,
        attachments: service.attachments,
        status: service.status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(doc(firebase_db, "services", service.id), service);
      setService(service);
      toast.success("Service added!");
    } catch (error) {
      setError(error);
      toast.error("Error occurred while adding service.");
    } finally {
      setLoading(false);
    }
  }

  return { service, addService, loading, error };
}

export default useAddService;

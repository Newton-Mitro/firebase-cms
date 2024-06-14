import { useState } from "react";
import { manageGalleryFormValidation } from "../utils/manageGalleryFormValidation";

function useManageGalleryFormState(selectedView: any) {
  const [galleryState, setGalleryState] = useState({
    title: selectedView.title,
    sections: selectedView.sections,
    contentSummery: selectedView.contentSummery,
    featuredImage: selectedView.featuredImage,
    status: selectedView.status,
    errors: { title: "", featuredImage: "", contentSummery: "" },
  });

  const updateGallerySection = (
    fieldName: string,
    fieldValue: any,
    index: number
  ) => {
    galleryState.sections[index] = {
      ...galleryState?.sections[index],
      [fieldName]: fieldValue,
      errors: {
        ...galleryState.sections[index].errors,
        [fieldName]: manageGalleryFormValidation(fieldName, fieldValue),
      },
    };
    setGalleryState({ ...galleryState });
  };

  const removeGallerySection = (index: number) => {
    if (index > 0) {
      galleryState?.sections.splice(index, 1);
      setGalleryState({
        ...galleryState,
        sections: galleryState?.sections,
      });
    }
  };

  const addGallerySection = () => {
    const newSection = {
      content: "",
      attachment: "",
      order: galleryState.sections.length + 1,
    };
    setGalleryState({
      ...galleryState,

      sections: [...galleryState.sections, newSection],
    });
  };

  const updateGalleryState = (name: string, value: any) => {
    setGalleryState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        errors: {
          ...galleryState.errors,
          [name]: manageGalleryFormValidation(name, value),
        },
      };
    });
  };

  return {
    galleryState,
    updateGallerySection,
    removeGallerySection,
    addGallerySection,
    updateGalleryState,
  };
}

export default useManageGalleryFormState;

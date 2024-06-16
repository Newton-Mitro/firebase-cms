import { useState } from "react";
import { manageServiceFormValidation } from "../utils/manageServiceFormValidation";

function useManageServiceFormState(selectedView: any) {
  const [serviceState, setServiceState] = useState({
    title: selectedView?.title,
    sections: selectedView?.sections,
    content: selectedView?.content,
    contentSummery: selectedView?.contentSummery,
    featuredImage: selectedView?.featuredImage,
    status: selectedView?.status,
    errors: { title: "", featuredImage: "", content: "", contentSummery: "" },
  });

  const updateServiceSection = (
    fieldName: string,
    fieldValue: any,
    index: number
  ) => {
    serviceState.sections[index] = {
      ...serviceState?.sections[index],
      [fieldName]: fieldValue,
      errors: {
        ...serviceState.sections[index]?.errors,
        [fieldName]: manageServiceFormValidation(fieldName, fieldValue),
      },
    };
    setServiceState({ ...serviceState });
  };

  const removeServiceSection = (index: number) => {
    if (index > 0) {
      serviceState?.sections.splice(index, 1);
      setServiceState({
        ...serviceState,
        sections: serviceState?.sections,
      });
    }
  };

  const addServiceSection = () => {
    const newSection = {
      sectionContent: "",
      sectionAttachment: "",
      sectionOrder: serviceState.sections.length + 1,
    };
    setServiceState({
      ...serviceState,

      sections: [...serviceState.sections, newSection],
    });
  };

  const updateServiceState = (name: string, value: any) => {
    setServiceState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        errors: {
          ...serviceState.errors,
          [name]: manageServiceFormValidation(name, value),
        },
      };
    });
  };

  return {
    serviceState,
    updateServiceSection,
    removeServiceSection,
    addServiceSection,
    updateServiceState,
  };
}

export default useManageServiceFormState;

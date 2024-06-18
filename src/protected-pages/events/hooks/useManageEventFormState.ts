import { useState } from "react";
import { manageEventFormValidation } from "../utils/manageEventFormValidation";

function useManageEventFormState(selectedView: any) {
  const [eventState, setEventState] = useState({
    title: selectedView?.title,
    sections: selectedView?.sections,
    content: selectedView?.content,
    contentSummery: selectedView?.contentSummery,
    featuredImage: selectedView?.featuredImage,
    status: selectedView?.status,
    errors: { title: "", featuredImage: "", content: "", contentSummery: "" },
  });

  const updateEventSection = (
    fieldName: string,
    fieldValue: any,
    index: number
  ) => {
    eventState.sections[index] = {
      ...eventState?.sections[index],
      [fieldName]: fieldValue,
      errors: {
        ...eventState.sections[index]?.errors,
        [fieldName]: manageEventFormValidation(fieldName, fieldValue),
      },
    };
    setEventState({ ...eventState });
  };

  const removeEventSection = (index: number) => {
    if (index > 0) {
      eventState?.sections.splice(index, 1);
      setEventState({
        ...eventState,
        sections: eventState?.sections,
      });
    }
  };

  const addEventSection = () => {
    const newSection = {
      sectionContent: "",
      sectionAttachment: "",
      sectionOrder: eventState.sections.length + 1,
    };
    setEventState({
      ...eventState,

      sections: [...eventState.sections, newSection],
    });
  };

  const updateEventState = (name: string, value: any) => {
    setEventState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        errors: {
          ...eventState.errors,
          [name]: manageEventFormValidation(name, value),
        },
      };
    });
  };

  return {
    eventState,
    updateEventSection,
    removeEventSection,
    addEventSection,
    updateEventState,
  };
}

export default useManageEventFormState;

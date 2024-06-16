import { useState } from "react";
import { manageNoticeFormValidation } from "../utils/manageNoticeFormValidation";

function useManageNoticeFormState(selectedView: any) {
  const [noticeState, setNoticeState] = useState({
    title: selectedView?.title,
    sections: selectedView?.sections,
    content: selectedView?.content,
    contentSummery: selectedView?.contentSummery,
    featuredImage: selectedView?.featuredImage,
    status: selectedView?.status,
    errors: { title: "", featuredImage: "", content: "", contentSummery: "" },
  });

  const updateNoticeSection = (
    fieldName: string,
    fieldValue: any,
    index: number
  ) => {
    noticeState.sections[index] = {
      ...noticeState?.sections[index],
      [fieldName]: fieldValue,
      errors: {
        ...noticeState.sections[index]?.errors,
        [fieldName]: manageNoticeFormValidation(fieldName, fieldValue),
      },
    };
    setNoticeState({ ...noticeState });
  };

  const removeNoticeSection = (index: number) => {
    if (index > 0) {
      noticeState?.sections.splice(index, 1);
      setNoticeState({
        ...noticeState,
        sections: noticeState?.sections,
      });
    }
  };

  const addNoticeSection = () => {
    const newSection = {
      sectionContent: "",
      sectionAttachment: "",
      sectionOrder: noticeState.sections.length + 1,
    };
    setNoticeState({
      ...noticeState,

      sections: [...noticeState.sections, newSection],
    });
  };

  const updateNoticeState = (name: string, value: any) => {
    setNoticeState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        errors: {
          ...noticeState.errors,
          [name]: manageNoticeFormValidation(name, value),
        },
      };
    });
  };

  return {
    noticeState,
    updateNoticeSection,
    removeNoticeSection,
    addNoticeSection,
    updateNoticeState,
  };
}

export default useManageNoticeFormState;

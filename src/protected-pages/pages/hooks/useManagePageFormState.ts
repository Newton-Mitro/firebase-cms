import { useState } from "react";
import { managePageFormValidation } from "../utils/managePageFormValidation";

function useManagePageFormState(selectedView: any) {
  const [pageState, setPageState] = useState({
    title: selectedView?.title,
    sections: selectedView?.sections,
    content: selectedView?.content,
    contentSummery: selectedView?.contentSummery,
    featuredImage: selectedView?.featuredImage,
    status: selectedView?.status,
    errors: { title: "", featuredImage: "", content: "", contentSummery: "" },
  });

  const updatePageSection = (
    fieldName: string,
    fieldValue: any,
    index: number
  ) => {
    pageState.sections[index] = {
      ...pageState?.sections[index],
      [fieldName]: fieldValue,
      errors: {
        ...pageState.sections[index]?.errors,
        [fieldName]: managePageFormValidation(fieldName, fieldValue),
      },
    };
    setPageState({ ...pageState });
  };

  const removePageSection = (index: number) => {
    if (index > 0) {
      pageState?.sections.splice(index, 1);
      setPageState({
        ...pageState,
        sections: pageState?.sections,
      });
    }
  };

  const addPageSection = () => {
    const newSection = {
      content: "",
      attachment: "",
      order: pageState.sections.length + 1,
    };
    setPageState({
      ...pageState,

      sections: [...pageState.sections, newSection],
    });
  };

  const updatePageState = (name: string, value: any) => {
    setPageState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        errors: {
          ...pageState.errors,
          [name]: managePageFormValidation(name, value),
        },
      };
    });
  };

  return {
    pageState,
    updatePageSection,
    removePageSection,
    addPageSection,
    updatePageState,
  };
}

export default useManagePageFormState;

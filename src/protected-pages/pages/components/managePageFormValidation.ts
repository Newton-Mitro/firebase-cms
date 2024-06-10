export const managePageFormValidation = (
  fieldName: string,
  fieldValue: any
) => {
  switch (fieldName) {
    case "title":
      if (fieldValue.trim().length === 0) {
        return "Page title can't be empty";
      }
      if (fieldValue.length < 10) {
        return "Minimum 10 character needed for page title.";
      }
      return "";

    case "sectionTitle":
      if (fieldValue.trim().length === 0) {
        return "Section title can't be empty";
      }
      if (fieldValue.length < 10) {
        return "Minimum 10 character needed for section title.";
      }
      return "";

    case "order":
      if (fieldValue.toString().trim().length === 0) {
        return "Invalid sort order";
      }

      return "";

    case "content":
      if (fieldValue.trim().length === 0) {
        return "Section content can't be empty";
      }
      if (fieldValue.length < 15) {
        return "Minimum 15 character needed for section content.";
      }
      return "";

    default:
      return "";
  }
};

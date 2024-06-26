export const manageServiceFormValidation = (
  fieldName: string,
  fieldValue: any
) => {
  switch (fieldName) {
    case "title":
      if (fieldValue?.trim().length === 0) {
        return "Service title is required";
      }
      if (fieldValue.length < 2) {
        return "Minimum 2 character needed for service title.";
      }
      return "";

    case "content":
      if (fieldValue?.trim().length === 0) {
        return "Service content is required";
      }
      if (fieldValue.length < 15) {
        return "Minimum 15 character needed for section content.";
      }
      return "";

    case "sectionTitle":
      if (fieldValue?.trim().length === 0) {
        return "Section title is required";
      }
      if (fieldValue.length < 2) {
        return "Minimum 2 character needed for section title.";
      }
      return "";

    case "order":
      if (fieldValue?.toString()?.trim().length === 0) {
        return "Invalid sort order";
      }

      return "";

    case "sectionContent":
      if (fieldValue?.trim().length === 0) {
        return "Section content is required";
      }
      if (fieldValue.length < 15) {
        return "Minimum 15 character needed for section content.";
      }
      return "";

    default:
      return "";
  }
};

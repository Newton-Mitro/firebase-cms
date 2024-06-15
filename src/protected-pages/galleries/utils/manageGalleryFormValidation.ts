export const manageGalleryFormValidation = (
  fieldName: string,
  fieldValue: any
) => {
  console.log(fieldName, fieldValue);
  switch (fieldName) {
    case "title":
      if (fieldValue?.trim().length === 0) {
        return "Gallery title is required";
      }
      if (fieldValue?.length < 2) {
        return "Minimum 2 character needed for gallery title.";
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

    case "attachment":
      if (fieldValue === null) {
        return "Section attachment is required.";
      }
      return "";

    case "order":
      if (fieldValue?.toString()?.trim().length === 0) {
        return "Invalid sort order";
      }

      return "";

    default:
      return "";
  }
};

export const manageGalleryFormValidation = (
  fieldName: string,
  fieldValue: any
) => {
  switch (fieldName) {
    case "title":
      if (fieldValue.trim().length === 0) {
        return "Gallery title can't be empty";
      }
      if (fieldValue.length < 2) {
        return "Minimum 2 character needed for gallery title.";
      }
      return "";

    case "sectionTitle":
      if (fieldValue.trim().length === 0) {
        return "Section title can't be empty";
      }
      if (fieldValue.length < 2) {
        return "Minimum 2 character needed for section title.";
      }
      return "";

    case "order":
      if (fieldValue.toString().trim().length === 0) {
        return "Invalid sort order";
      }

      return "";

    default:
      return "";
  }
};

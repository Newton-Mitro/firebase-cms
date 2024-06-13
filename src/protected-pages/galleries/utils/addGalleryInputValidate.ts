const validate = (values: any) => {
  let errors: any = {};
  if (!values.title) {
    errors.title = "Required";
  } else if (values.title.length < 2) {
    errors.title = "Minimum 2 character needed.";
  }

  if (!values.content) {
    errors.content = "Required";
  } else if (values.content.length < 20) {
    errors.content = "Minimum 20 character needed.";
  }

  return errors;
};

export default validate;

import { useFormik } from "formik";
import { useState } from "react";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import AppLoader from "../../../components/AppLoader";
import { FileType } from "../../../enums/file-type.enum";
import useRemoveFile from "../hooks/useRemoveFile";
import useUploadFile from "../hooks/useUploadFile";

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

const SiteSettings = () => {
  const { fileUrl, uploadFile, loading, error } = useUploadFile();
  const [fileType, setFileType] = useState<string>(FileType.Image);
  const [currentPostStartFrom, setCurrentPostStartFrom] = useState<number>(1);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      contentSummery: "",
      featuredImage: "",
      status: false,
      attachments: [],
    },
    validate,
    onSubmit: (values) => {
      const postId = uuidv4();
      const slug = slugify(values.title, {
        replacement: "_", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: false, // strip special characters except replacement, defaults to `false`
        locale: "vi", // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
      });

      // updatePost(selectedView?.id, {
      //   id: selectedView?.id,
      //   slug: slug,
      //   title: values.title,
      //   content: values.content,
      //   contentSummery: values.contentSummery,
      //   featuredImage: values.featuredImage,
      //   attachments: values.attachments,
      //   status: false,
      //   createdAt: "",
      //   updatedAt: "",
      // });
    },
  });

  const {
    removedFileId,
    removeFile,
    loading: removeFileLoading,
    error: removeFileError,
  } = useRemoveFile();

  return (
    <>
      <AppLoader isLoading={loading || removeFileLoading} />
      <div className="w-full space-y-2">
        <h2 className="text-xl">Settings</h2>
        <div className="h-[calc(100vh-122px)] border border-borderColor bg-secondary p-2 flex flex-col overflow-auto relative">
          <div className="flex flex-col gap-2">
            <div className="header flex gap-1 justify-between">
              <div className="flex items-center gap-2 justify-end"></div>
            </div>
            <div className="body border border-borderColor h-[calc(100vh-226px)] w-full lg:w-1/2 overflow-auto bg-primary">
              <section className="p-2 overflow-auto">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                    <label className="w-5/12" htmlFor="username">
                      Contact Number
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formik.values.title}
                      className="w-full mt-1 block rounded-sm py-1 border-borderColor bg-primary
                disabled:bg-disabledColor shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                      onChange={formik.handleChange}
                    />
                    {formik.errors?.title && (
                      <div className="text-xs text-red-400">
                        {formik.errors?.title.toString()}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                    <label className="w-5/12" htmlFor="username">
                      Contact Email
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formik.values.title}
                      className="w-full mt-1 block rounded-sm py-1 border-borderColor bg-primary
                disabled:bg-disabledColor shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                      onChange={formik.handleChange}
                    />
                    {formik.errors?.title && (
                      <div className="text-xs text-red-400">
                        {formik.errors?.title.toString()}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                    <label className="w-5/12" htmlFor="username">
                      Address Line One
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formik.values.title}
                      className="w-full mt-1 block rounded-sm py-1 border-borderColor bg-primary
                disabled:bg-disabledColor shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                      onChange={formik.handleChange}
                    />
                    {formik.errors?.title && (
                      <div className="text-xs text-red-400">
                        {formik.errors?.title.toString()}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                    <label className="w-5/12" htmlFor="username">
                      Address Line Two
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formik.values.title}
                      className="w-full mt-1 block rounded-sm py-1 border-borderColor bg-primary
                disabled:bg-disabledColor shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                      onChange={formik.handleChange}
                    />
                    {formik.errors?.title && (
                      <div className="text-xs text-red-400">
                        {formik.errors?.title.toString()}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                    <label className="w-5/12" htmlFor="username">
                      Address Line Three
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formik.values.title}
                      className="w-full mt-1 block rounded-sm py-1 border-borderColor bg-primary
                disabled:bg-disabledColor shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                      onChange={formik.handleChange}
                    />
                    {formik.errors?.title && (
                      <div className="text-xs text-red-400">
                        {formik.errors?.title.toString()}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                    <label className="w-5/12" htmlFor="username">
                      Facebook Link
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formik.values.title}
                      className="w-full mt-1 block rounded-sm py-1 border-borderColor bg-primary
                disabled:bg-disabledColor shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                      onChange={formik.handleChange}
                    />
                    {formik.errors?.title && (
                      <div className="text-xs text-red-400">
                        {formik.errors?.title.toString()}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                    <label className="w-5/12" htmlFor="username">
                      Youtube Link
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formik.values.title}
                      className="w-full mt-1 block rounded-sm py-1 border-borderColor bg-primary
                disabled:bg-disabledColor shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                      onChange={formik.handleChange}
                    />
                    {formik.errors?.title && (
                      <div className="text-xs text-red-400">
                        {formik.errors?.title.toString()}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                    <label className="w-5/12" htmlFor="username">
                      Embed Map Link
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formik.values.title}
                      className="w-full mt-1 block rounded-sm py-1 border-borderColor bg-primary
                disabled:bg-disabledColor shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                      onChange={formik.handleChange}
                    />
                    {formik.errors?.title && (
                      <div className="text-xs text-red-400">
                        {formik.errors?.title.toString()}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
            <div className="flex">
              <button
                type="submit"
                className="hover:bg-success bg-accent border border-borderColor hover:shadow-md transition-all shadow rounded px-4 py-2 hover:cursor-pointer"
              >
                Update Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SiteSettings;
function useFormic(arg0: {
  initialValues: {
    title: string;
    content: string;
    contentSummery: string;
    featuredImage: string;
    status: boolean;
    attachments: never[];
  };
  validate: (values: any) => any;
  onSubmit: (values: any) => void;
}) {
  throw new Error("Function not implemented.");
}

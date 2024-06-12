import { useFormik } from "formik";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import AppLoader from "../../../components/AppLoader";
import FileBrowser from "../../../components/image-browser/FileBrowser";
import { WindowType } from "../../../enums/window-type.enum";
import { Attachment } from "../../../interfaces/attachment";
import { formats, modules } from "../../../utils/QuillSettings";
import useAddPost from "./useAddPost";
import useUpdatePost from "./useUpdatePost";

const validate = (values: any) => {
  let errors: any = {};
  if (!values.title) {
    errors.title = "Required";
  } else if (values.title.length < 5) {
    errors.title = "Minimum 5 character needed.";
  }

  if (!values.content) {
    errors.content = "Required";
  } else if (values.content.length < 20) {
    errors.content = "Minimum 20 character needed.";
  }

  return errors;
};

function ManagePost({
  closePostDialogue,
  selectedPost,
  getPosts,
  windowType,
}: any) {
  const [windowState, setWindowState] = useState(false);
  const [openImageBrowser, setOpenImageBrowser] = useState(false);
  const [openFeaturedImageBrowser, setOpenFeaturedImageBrowser] =
    useState(false);
  const formik = useFormik({
    initialValues: {
      title: selectedPost?.title,
      content: selectedPost?.content,
      contentSummery: selectedPost?.contentSummery,
      featuredImage: selectedPost?.featuredImage,
      status: selectedPost?.status,
      attachments: selectedPost?.attachments,
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

      if (windowType === WindowType.Create) {
        addPost({
          id: postId,
          slug: slug,
          title: values.title,
          content: values.content,
          contentSummery: values.contentSummery,
          featuredImage: values.featuredImage,
          attachments: values.attachments,
          status: false,
          createdAt: "",
          updatedAt: "",
        });
      } else {
        updatePost(selectedPost?.id, {
          id: selectedPost?.id,
          slug: slug,
          title: values.title,
          content: values.content,
          contentSummery: values.contentSummery,
          featuredImage: values.featuredImage,
          attachments: values.attachments,
          status: false,
          createdAt: "",
          updatedAt: "",
        });
      }
    },
  });

  const removeAttachment = (index: number) => {
    let netAttachments: any[] = formik.values.attachments;
    if (index > -1) {
      netAttachments.splice(index, 1);
    }
    formik.setFieldValue("attachments", [...netAttachments]);
  };

  const {
    post: addedPost,
    addPost,
    loading: addPostLoading,
    error: addPostError,
  } = useAddPost();

  const {
    post: updatedPost,
    updatePost,
    loading: updatePostLoading,
    error: updatePostError,
  } = useUpdatePost();

  if (addedPost !== null) {
    closePostDialogue();
    getPosts();
  }

  if (updatedPost !== null) {
    closePostDialogue();
    getPosts();
  }

  return (
    <>
      <FileBrowser
        isOpen={openImageBrowser}
        setIsOpen={setOpenImageBrowser}
        selectedFile={(file: Attachment) => {
          if (file) {
            formik.setFieldValue("attachments", [
              ...formik.values.attachments,
              file,
            ]);
          }
        }}
      />
      <AppLoader isLoading={addPostLoading} />
      <form onSubmit={formik.handleSubmit}>
        <div
          className={`absolute  h-full shadow ${
            windowState
              ? "lg:w-full bottom-2 right-2 lg:inset-0"
              : "lg:w-7/12 lg:h-[calc(100vh-170px)] bottom-2 right-2"
          } w-full bg-secondary flex flex-col shadow border border-borderColor overflow-auto`}
        >
          <header className="bg-accent border-b border-borderColor p-4 flex justify-between">
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 hover:font-bold hover:text-yellow-100 hover:scale-105 transition-all"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>

              <span className="text-xl">{windowType} Post</span>
            </div>
            <div className="flex items-center gap-2">
              {windowState ? (
                <button
                  type="button"
                  onClick={() => {
                    setWindowState(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 hover:font-bold hover:text-yellow-100 hover:scale-105 transition-all"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setWindowState(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 hover:font-bold hover:text-yellow-100 hover:scale-105 transition-all"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                    />
                  </svg>
                </button>
              )}

              <button
                className=""
                type="button"
                onClick={() => {
                  closePostDialogue();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 hover:font-bold hover:text-yellow-100 hover:scale-105 transition-all"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </header>
          <section className="py-4 px-4 lg:px-10 overflow-auto">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label className="" htmlFor="username">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  disabled={windowType === WindowType.View ? true : false}
                  type="text"
                  value={formik.values.title}
                  className="mt-1 block w-full rounded-sm py-1 border-borderColor bg-primary
                disabled:bg-disabledColor shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                  onChange={formik.handleChange}
                />
                {formik.errors.title && (
                  <div className="text-xs text-red-400">
                    {formik.errors.title.toString()}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <label className="" htmlFor="username">
                  Content
                </label>
                <ReactQuill
                  theme="snow"
                  id="content"
                  modules={modules}
                  formats={formats}
                  className={`${
                    windowType === WindowType.View
                      ? "bg-disabledColor"
                      : "bg-primary"
                  } text-white text-xl`}
                  readOnly={windowType === WindowType.View ? true : false}
                  value={formik.values.content}
                  onChange={(content) => {
                    formik.setFieldValue("content", content);
                  }}
                />

                {formik.errors.content && (
                  <div className="text-xs text-red-400">
                    {formik.errors.content.toString()}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <label className="" htmlFor="username">
                  Content Summery
                </label>
                <textarea
                  id="contentSummery"
                  name="contentSummery"
                  rows={3}
                  disabled={windowType === WindowType.View ? true : false}
                  value={formik.values.contentSummery}
                  className="mt-1 block w-full rounded-sm py-1 border-borderColor bg-primary
                disabled:bg-disabledColor shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                  onChange={formik.handleChange}
                />
              </div>

              <div className="">
                <FileBrowser
                  isOpen={openFeaturedImageBrowser}
                  setIsOpen={setOpenFeaturedImageBrowser}
                  selectedFile={(file: Attachment) => {
                    if (file) {
                      formik.setFieldValue("featuredImage", file.attachmentUrl);
                    }
                  }}
                />
                <div className="">Featured Image</div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 lg:gap-4 flex-wrap">
                    {formik.values?.featuredImage !== "" ? (
                      <div className="relative border rounded border-borderColor group">
                        <img
                          src={formik.values?.featuredImage}
                          alt=""
                          className="h-20 object-cover rounded group-hover:bg-blend-darken group-hover:cursor-pointer"
                        />

                        {windowType !== WindowType.View ? (
                          <div className="">
                            <div className="group-hover:bg-gray-950 group-hover:bg-opacity-70 w-full h-full absolute left-0 right-0 top-0"></div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-6 w-6 absolute right-0 top-0 group-hover:cursor-pointer group-hover:text-white group-hover:scale-110 transition-all"
                              onClick={() => {
                                formik.setFieldValue("featuredImage", "");
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  {windowType !== WindowType.View ? (
                    <div className="">
                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 hover:font-bold hover:bg-accent  border border-borderColor hover:shadow-md transition-all duration-300 shadow-sm rounded px-4 py-2 hover:cursor-pointer"
                        onClick={() => {
                          setOpenFeaturedImageBrowser(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                          />
                        </svg>
                        Select Featured Image
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="" htmlFor="username">
                  Attachments
                </label>
                <div className="flex gap-1 lg:gap-4 flex-wrap">
                  {formik.values.attachments?.map(
                    (image: Attachment, index: number) => {
                      return (
                        <div
                          className="relative border rounded border-borderColor group"
                          key={index}
                        >
                          <img
                            src={image.attachmentUrl}
                            alt=""
                            className="h-20 object-cover rounded group-hover:bg-blend-darken group-hover:cursor-pointer"
                          />

                          {windowType !== WindowType.View ? (
                            <div className="">
                              <div className="group-hover:bg-gray-950 group-hover:bg-opacity-70 w-full h-full absolute left-0 right-0 top-0"></div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6 absolute right-0 top-0 group-hover:cursor-pointer group-hover:text-white group-hover:scale-110 transition-all"
                                onClick={() => {
                                  removeAttachment(index);
                                }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18 18 6M6 6l12 12"
                                />
                              </svg>
                            </div>
                          ) : null}
                        </div>
                      );
                    }
                  )}
                </div>
                {windowType !== WindowType.View ? (
                  <div className="">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 hover:font-bold hover:bg-accent  border border-borderColor hover:shadow-md transition-all duration-300 shadow-sm rounded px-4 py-2 mt-4 hover:cursor-pointer"
                      onClick={() => {
                        setOpenImageBrowser(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                        />
                      </svg>
                      Select Attachment
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
          {windowType !== WindowType.View && (
            <footer className="bg-primary border-t border-borderColor px-4 lg:px-10 py-2 mt-auto">
              <div className="flex items-center justify-end">
                {windowType === WindowType.Edit && (
                  <button
                    type="submit"
                    disabled={addPostLoading ? true : false}
                    className="login-btn hover:font-bold hover:bg-accent bg-accent border border-borderColor hover:shadow-md transition-all duration-300 shadow-sm rounded px-4 py-2 hover:cursor-pointer"
                  >
                    Update Post
                  </button>
                )}

                {windowType === WindowType.Create && (
                  <button
                    type="submit"
                    disabled={addPostLoading ? true : false}
                    className="login-btn hover:font-bold hover:bg-accent bg-accent border border-borderColor hover:shadow-md transition-all duration-300 shadow-sm rounded px-4 py-2 hover:cursor-pointer"
                  >
                    Create Post
                  </button>
                )}
              </div>
            </footer>
          )}
        </div>
      </form>
    </>
  );
}

export default ManagePost;

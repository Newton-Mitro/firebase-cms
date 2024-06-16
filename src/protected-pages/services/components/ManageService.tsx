import { useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import AppLoader from "../../../components/AppLoader";
import { FileType } from "../../../enums/file-type.enum";
import { WindowType } from "../../../enums/window-type.enum";
import { Attachment } from "../../../interfaces/attachment";
import { SectionView } from "../../../interfaces/section-view";
import { formats, modules } from "../../../utils/QuillSettings";
import FileBrowser from "../../file-manager/components/FileBrowser";
import ThumbnailPreview from "../../file-manager/components/ThumbnailPreview";
import useAddService from "../hooks/useAddService";
import useManageServiceFormState from "../hooks/useManageServiceFormState";
import useUpdateService from "../hooks/useUpdateService";
import { manageServiceFormValidation } from "../utils/manageServiceFormValidation";

function ManageService({
  closeManageWindow,
  selectedView,
  getServices,
  windowType,
}: any) {
  const [windowState, setWindowState] = useState(false);
  const [selectedSection, setSelectedSection] = useState(0);
  const [openAttachmentBrowser, setOpenAttachmentBrowser] = useState(false);
  const [openFeaturedImageBrowser, setOpenFeaturedImageBrowser] =
    useState(false);
  const {
    serviceState,
    updateServiceSection,
    removeServiceSection,
    addServiceSection,
    updateServiceState,
  } = useManageServiceFormState(selectedView);

  const onSubmitHandler = (event: any) => {
    event.preventDefault();
    var errors = "";
    errors = errors + manageServiceFormValidation("title", serviceState.title);
    errors =
      errors + manageServiceFormValidation("content", serviceState.content);
    serviceState.sections.forEach((element: any, index: number) => {
      let fieldName: keyof typeof element;
      for (fieldName in element) {
        updateServiceSection(fieldName, element[fieldName], index);
        errors =
          errors + manageServiceFormValidation(fieldName, element[fieldName]);
      }
    });
    updateServiceState("title", serviceState.title);
    updateServiceState("content", serviceState.content);
    if (errors) {
      toast.error("Please all the fields correctly!");
      return;
    }

    const serviceId = uuidv4();
    const slug = slugify(serviceState.title, {
      replacement: "_", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: "vi", // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
    const newSections: SectionView[] = serviceState.sections.map(
      (section: SectionView) => {
        return {
          sectionTitle: section.sectionTitle,
          sectionContent: section.sectionContent,
          sectionAttachment: section.sectionAttachment,
          sectionOrder: section.sectionOrder,
        };
      }
    );

    if (windowType === WindowType.Create) {
      addService({
        id: serviceId,
        slug: slug,
        title: serviceState.title,
        content: serviceState.content,
        contentSummery: serviceState.contentSummery,
        featuredImage: serviceState.featuredImage,
        sections: newSections,
        status: false,
        createdAt: "",
        updatedAt: "",
      });
    } else {
      updateService(selectedView?.id, {
        id: selectedView?.id,
        slug: slug,
        title: serviceState.title,
        content: serviceState.content,
        contentSummery: serviceState.contentSummery,
        featuredImage: serviceState.featuredImage,
        sections: newSections,
        status: false,
        createdAt: "",
        updatedAt: "",
      });
    }
  };

  const {
    service: addedService,
    addService,
    loading: addServiceLoading,
  } = useAddService();

  const {
    service: updatedService,
    updateService,
    loading: updateServiceLoading,
  } = useUpdateService();

  if (addedService !== null) {
    closeManageWindow();
    getServices();
  }

  if (updatedService !== null) {
    closeManageWindow();
    getServices();
  }

  return (
    <>
      <AppLoader isLoading={addServiceLoading || updateServiceLoading} />
      <FileBrowser
        isOpen={openFeaturedImageBrowser}
        fileTypeSelectionDisabled={true}
        setIsOpen={setOpenFeaturedImageBrowser}
        selectedFile={(file: Attachment) => {
          if (file) {
            updateServiceState("featuredImage", file.attachmentUrl);
          }
        }}
      />
      <FileBrowser
        isOpen={openAttachmentBrowser}
        setIsOpen={setOpenAttachmentBrowser}
        selectedFile={(file: Attachment) => {
          if (file) {
            updateServiceSection("sectionAttachment", file, selectedSection);
          }
        }}
      />
      <form onSubmit={onSubmitHandler}>
        <div
          className={`absolute  h-full shadow ${
            windowState
              ? "lg:w-full bottom-0 right-0 lg:inset-0"
              : "lg:w-7/12 lg:h-[calc(100vh-170px)] bottom-0 right-0"
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

              <span className="text-xl">{windowType} Service</span>
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
                  closeManageWindow();
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
                  Service Title
                </label>
                <input
                  id="title"
                  name="title"
                  disabled={windowType === WindowType.View ? true : false}
                  type="text"
                  value={serviceState?.title}
                  className="mt-1 block w-full rounded-sm py-1 border-borderColor bg-primary
                disabled:bg-disabledColor shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                  onChange={(event) => {
                    updateServiceState(event.target.name, event.target.value);
                  }}
                />
                {serviceState?.errors?.title && (
                  <div className="text-xs text-red-400">
                    {serviceState?.errors?.title}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <label className="" htmlFor="username">
                  Service Content
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
                  value={serviceState?.content}
                  onChange={(value) => {
                    updateServiceState("content", value);
                  }}
                />

                {serviceState?.errors?.content && (
                  <div className="text-xs text-red-400">
                    {serviceState?.errors?.content}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <label className="" htmlFor="username">
                  Service Summery
                </label>
                <textarea
                  id="contentSummery"
                  name="contentSummery"
                  rows={2}
                  disabled={windowType === WindowType.View ? true : false}
                  value={serviceState?.contentSummery}
                  className="mt-1 block w-full rounded-sm py-1 border-borderColor bg-primary
                disabled:bg-disabledColor shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                  onChange={(event) => {
                    updateServiceState(event.target.name, event.target.value);
                  }}
                />
              </div>

              <div className="">
                <div className="">Featured Image</div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 lg:gap-4 flex-wrap">
                    {serviceState?.featuredImage !== "" ? (
                      <ThumbnailPreview
                        fileType={FileType.Image}
                        fileName={"Featured Image"}
                        fileUrl={serviceState?.featuredImage}
                        handleRemove={() => {
                          updateServiceState("featuredImage", "");
                        }}
                        showMaximizeButton={true}
                        showRemoveButton={
                          windowType === WindowType.View ? false : true
                        }
                      />
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
                {serviceState.sections?.map(
                  (section: SectionView, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-2 border rounded border-dashed border-borderColor p-2 relative bg-yellow-950/10"
                      >
                        {index !== 0 && windowType !== WindowType.View && (
                          <div
                            className="absolute top-1 right-1  hover:cursor-pointer hover:text-error"
                            onClick={() => {
                              removeServiceSection(index);
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
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </div>
                        )}

                        <div className="flex flex-col">
                          <label className="" htmlFor="section_title">
                            Section Title
                          </label>
                          <input
                            id="sectionTitle"
                            name="sectionTitle"
                            disabled={
                              windowType === WindowType.View ? true : false
                            }
                            type="text"
                            value={serviceState?.sections[index].sectionTitle}
                            className="mt-1 block w-full rounded-sm py-1 border-borderColor bg-primary
                disabled:bg-disabledColor shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                            onChange={(event) => {
                              updateServiceSection(
                                "sectionTitle",
                                event.target.value,
                                index
                              );
                            }}
                          />
                          {serviceState?.sections[index]?.errors
                            ?.sectionTitle && (
                            <div className="text-xs text-red-400">
                              {
                                serviceState?.sections[index]?.errors
                                  ?.sectionTitle
                              }
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="" htmlFor="section_title">
                            Sort Order
                          </label>
                          <input
                            id="sectionOrder"
                            name="sectionOrder"
                            disabled={
                              windowType === WindowType.View ? true : false
                            }
                            type="number"
                            value={serviceState?.sections[index].sectionOrder}
                            className="mt-1 block w-full rounded-sm py-1 border-borderColor bg-primary
                disabled:bg-disabledColor shadow-sm focus:border-borderColor focus:ring focus:ring-accent focus:ring-opacity-50 text-gray-300"
                            onChange={(event) => {
                              updateServiceSection(
                                "sectionOrder",
                                event.target.value,
                                index
                              );
                            }}
                          />
                          {serviceState?.sections[index]?.errors
                            ?.sectionOrder && (
                            <div className="text-xs text-red-400">
                              {
                                serviceState?.sections[index]?.errors
                                  ?.sectionOrder
                              }
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col">
                          <label className="" htmlFor="username">
                            Section Content
                          </label>
                          <ReactQuill
                            theme="snow"
                            id="sectionContent"
                            modules={modules}
                            formats={formats}
                            className={`${
                              windowType === WindowType.View
                                ? "bg-disabledColor"
                                : "bg-primary"
                            } text-white text-xl`}
                            readOnly={
                              windowType === WindowType.View ? true : false
                            }
                            value={
                              serviceState?.sections[index]?.sectionContent
                            }
                            onChange={(value) => {
                              updateServiceSection(
                                "sectionContent",
                                value,
                                index
                              );
                            }}
                          />

                          {serviceState?.sections[index]?.errors
                            ?.sectionContent && (
                            <div className="text-xs text-red-400">
                              {
                                serviceState?.sections[index]?.errors
                                  ?.sectionContent
                              }
                            </div>
                          )}
                        </div>

                        <div className="">
                          <div className="">Section Attachment</div>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-1 lg:gap-4 flex-wrap">
                              {serviceState?.sections[index]
                                .sectionAttachment !== null && (
                                <ThumbnailPreview
                                  fileType={
                                    serviceState?.sections[index]
                                      .sectionAttachment.fileType
                                  }
                                  fileName={
                                    serviceState?.sections[index]
                                      .sectionAttachment.fileName
                                  }
                                  fileUrl={
                                    serviceState?.sections[index]
                                      .sectionAttachment.attachmentUrl
                                  }
                                  handleRemove={() => {
                                    updateServiceSection(
                                      "sectionAttachment",
                                      null,
                                      index
                                    );
                                  }}
                                  showMaximizeButton={true}
                                  showRemoveButton={
                                    windowType === WindowType.View
                                      ? false
                                      : true
                                  }
                                />
                              )}
                            </div>
                            {windowType !== WindowType.View ? (
                              <div className="">
                                <button
                                  type="button"
                                  className="flex items-center justify-center gap-2 hover:font-bold hover:bg-accent  border border-borderColor hover:shadow-md transition-all duration-300 shadow-sm rounded px-4 py-2 hover:cursor-pointer"
                                  onClick={() => {
                                    setSelectedSection(index);
                                    setOpenAttachmentBrowser(true);
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
                      </div>
                    );
                  }
                )}
              </div>
              {windowType !== WindowType.View && (
                <div className="">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 hover:font-bold hover:bg-accent  border border-borderColor 
                    hover:shadow-md transition-all duration-300 shadow-sm rounded px-4 py-2 hover:cursor-pointer"
                    onClick={() => {
                      addServiceSection();
                    }}
                  >
                    Add Section
                  </button>
                </div>
              )}
            </div>
          </section>
          {windowType !== WindowType.View && (
            <footer className="bg-primary border-t border-borderColor px-4 lg:px-10 py-2 mt-auto">
              <div className="flex items-center justify-end">
                {windowType === WindowType.Edit && (
                  <button
                    type="submit"
                    disabled={addServiceLoading ? true : false}
                    className="hover:bg-success bg-accent border border-borderColor hover:shadow-md transition-all shadow rounded px-4 py-2 hover:cursor-pointer"
                  >
                    Update Service
                  </button>
                )}

                {windowType === WindowType.Create && (
                  <button
                    type="submit"
                    disabled={addServiceLoading ? true : false}
                    className="hover:bg-success bg-accent border border-borderColor hover:shadow-md transition-all shadow rounded px-4 py-2 hover:cursor-pointer"
                  >
                    Create Service
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

export default ManageService;

import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import AppLoader from "../../../components/AppLoader";
import { WindowType } from "../../../enums/window-type.enum";
import ManagePage from "../components/ManagePage";
import { PageModel } from "../models/page.model";
import PaginateRow from "./PaginateRow";
import useGetPages from "./useGetPages";
import useRemovePage from "./useRemovePage";
import useUpdatePageStatus from "./useUpdatePageStatus";

function ListPage() {
  const [isAdvanceSearchOpen, setAdvanceSearchOpen] = useState(false);
  const [isCreatePageOpen, setCreatePageOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageModel | null>(null);
  const [windowType, setWindowType] = useState<WindowType>(WindowType.View);
  const [currentPageStartFrom, setCurrentPageStartFrom] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const {
    pages,
    getPages,
    loading: getPagesLoading,
    error: getPagesError,
    activePage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    totalPages,
    totalRecords,
  } = useGetPages();

  // const paginatePages = pagination(4)(activePage, totalPages);

  const {
    removePageId,
    removePage,
    loading: removePageLoading,
    error: removePageError,
  } = useRemovePage();

  const {
    updatedPageId,
    updatePageStatus,
    loading: updatePageStatusLoading,
    error: updatePageStatusError,
  } = useUpdatePageStatus();

  const toggleAdvanceSearchOption = () => {
    setAdvanceSearchOpen(!isAdvanceSearchOpen);
  };

  function openPageCreateDialogue() {
    setWindowType(WindowType.Create);
    setCreatePageOpen(true);
    setSelectedPage({
      id: "",
      slug: "",
      title: "",
      content: "",
      contentSummery: "",
      attachments: [],
      status: false,
      createdAt: "",
      updatedAt: "",
    });
  }

  function closePageDialogue() {
    setSelectedPage(null);
    setCreatePageOpen(false);
  }

  function openPageViewDialogue() {
    setWindowType(WindowType.View);
    setCreatePageOpen(true);
  }

  function openPageEditDialogue() {
    setWindowType(WindowType.Edit);
    setCreatePageOpen(true);
  }

  useEffect(() => {
    getPages(currentPageStartFrom, limit);
  }, [removePageId, updatedPageId, limit, currentPageStartFrom]);

  return (
    <>
      <AppLoader
        isLoading={
          getPagesLoading || removePageLoading || updatePageStatusLoading
        }
      />
      <div className="w-full space-y-2">
        <h2 className="text-xl">Pages</h2>
        <div className="h-[calc(100vh-122px)] border border-gray-800 bg-zinc-950 p-2 flex flex-col overflow-auto relative">
          <div className="flex-1">
            <div className="flex gap-2">
              <button
                disabled={selectedPage !== null ? true : false}
                onClick={() => {
                  openPageCreateDialogue();
                }}
                className="bg-gray-800 hover:bg-gray-900 border border-gray-700 hover:shadow-md transition-all duration-300 shadow-sm rounded py-1.5 px-1.5 md:px-4 hover:cursor-pointer"
              >
                <span className="md:block hidden">Create Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 md:hidden block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
              </button>

              <div className="flex gap-2">
                <CSVLink data={pages}>
                  <button className="bg-gray-800 hover:bg-gray-900 border border-gray-700 hover:shadow-md transition-all duration-300 shadow-sm rounded py-1.5 px-1.5 md:px-4 hover:cursor-pointer">
                    <span className="md:block hidden">Export CSV</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 block md:hidden"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                      />
                    </svg>
                  </button>
                </CSVLink>
              </div>
            </div>
            <div className="flex items-center my-1.5 gap-2 justify-end">
              <div className="flex gap-10 items-center">
                <div className="flex items-center justify-end ">
                  <input
                    type="text"
                    disabled={true}
                    className="w-full md:w-80 rounded-sm py-1 disabled:bg-gray-800 border-gray-700 bg-transparent shadow-sm focus:border-gray-800 focus:ring focus:ring-gray-800 focus:ring-opacity-50 text-gray-300"
                    onChange={(e) => {}}
                  />
                  <button
                    disabled={true}
                    className="border disabled:bg-gray-800 border-slate-700 hover:bg-slate-800 rounded-r bg-slate-700 p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </button>
                  <button className="absolute hidden top-1 border border-slate-700 hover:bg-slate-800 rounded-r -right-8 bg-slate-700 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="h-[calc(100vh-268px)] md:h-[calc(100vh-264px)] overflow-auto border border-b border-gray-800">
              <table className="whitespace-no-wrap relative w-full table-auto border-collapse border">
                <thead className="w-full">
                  <tr className="sticky -top-1 h-10 hidden w-full shadow-sm md:table-row bg-gray-800">
                    <th className="cursor-pointer border border-gray-800 p-2 transition-colors hover:bg-blue-gray-50">
                      <div
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none"
                      >
                        Id
                      </div>
                    </th>
                    <th className="cursor-pointer border border-gray-800 p-2 transition-colors hover:bg-blue-gray-50">
                      <div
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none"
                      >
                        Slug
                      </div>
                    </th>
                    <th className="cursor-pointer border border-gray-800 p-2 transition-colors hover:bg-blue-gray-50">
                      <div
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none"
                      >
                        Title
                      </div>
                    </th>

                    <th className="cursor-pointer border border-gray-800 p-2 transition-colors hover:bg-blue-gray-50">
                      <div
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none"
                      >
                        Status
                      </div>
                    </th>
                    <th className="cursor-pointer border border-gray-800 p-2 transition-colors hover:bg-blue-gray-50">
                      <div
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none"
                      >
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="flex-1 md:flex-none space-y-6">
                  {pages?.map((page: any, index: number) => {
                    return (
                      <tr
                        key={index}
                        className="flex w-full flex-col flex-wrap border-b border-gray-800 last:border-b-0 even:bg-slate-800/50 md:table-row"
                      >
                        <td className="border border-gray-800 px-2">
                          <label className="md:hidden">Id</label>
                          <p className="font-semibold md:font-normal">
                            {page.id}
                          </p>
                        </td>
                        <td className="border border-gray-800 px-2">
                          <label className="md:hidden">Slug</label>
                          <p className="font-semibold md:font-normal">
                            {page.slug}
                          </p>
                        </td>
                        <td className="border border-gray-800 px-2">
                          <label className="md:hidden">Title</label>
                          <p className="font-semibold md:font-normal">
                            {page.title}
                          </p>
                        </td>

                        <td className="border border-gray-800 px-2">
                          <label className="md:hidden">Status</label>

                          <div className="flex flex-wrap">
                            {page.status ? (
                              <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                Published
                              </span>
                            ) : (
                              <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                Draft
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="border border-gray-800 px-2">
                          <label className="md:hidden">Actions</label>
                          <div className="flex gap-1">
                            <button
                              className="rounded hover:text-gray-100 hover:scale-110 p-1 group"
                              onClick={() => {
                                setSelectedPage(page);
                                openPageViewDialogue();
                              }}
                            >
                              <span className="group-hover:block absolute top-0 right-0 hidden rounded shadow-lg px-1 -mt-6 border border-gray-800 bg-neutral-700 text-orange-100">
                                View
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                            </button>
                            <button
                              className="rounded hover:text-gray-100 hover:scale-110 p-1 group"
                              onClick={() => {
                                setSelectedPage(page);
                                openPageEditDialogue();
                              }}
                            >
                              <span className="group-hover:block absolute top-0 right-0 hidden rounded shadow-lg px-1 -mt-6 border border-gray-800 bg-neutral-700 text-orange-100">
                                Edit
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                              </svg>
                            </button>
                            <button
                              className="rounded hover:text-gray-100 hover:scale-110 p-1 group relative"
                              onClick={() => {
                                removePage(page.id);
                                getPages();
                              }}
                            >
                              <span className="group-hover:block absolute top-0 right-0 hidden rounded shadow-lg px-1 -mt-6 border border-gray-800 bg-neutral-700 text-orange-100">
                                Delete
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </button>
                            <div className="">
                              {page.status ? (
                                <button
                                  className="rounded hover:text-gray-100 hover:scale-110 p-1 group"
                                  onClick={() => {
                                    updatePageStatus(page.id, false);
                                    getPages();
                                  }}
                                >
                                  <span className="group-hover:block absolute top-0 right-0 hidden rounded shadow-lg px-1 -mt-6 border border-gray-800 bg-neutral-700 text-orange-100">
                                    Draft
                                  </span>
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
                                      d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                                    />
                                  </svg>
                                </button>
                              ) : (
                                <button
                                  className="rounded hover:text-gray-100 hover:scale-110 p-1 group"
                                  onClick={() => {
                                    updatePageStatus(page.id, true);
                                    getPages();
                                  }}
                                >
                                  <span className="group-hover:block absolute top-0 right-0 hidden rounded shadow-lg px-1 -mt-6 border border-gray-800 bg-neutral-700 text-orange-100">
                                    Publish
                                  </span>
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
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <PaginateRow
            totalRecords={totalRecords}
            limit={limit}
            setLimit={setLimit}
            currentPageStartFrom={currentPageStartFrom}
            setCurrentPageStartFrom={setCurrentPageStartFrom}
            activePage={activePage}
            firstPage={firstPage}
            lastPage={lastPage}
            previousPage={previousPage}
            nextPage={nextPage}
            totalPages={totalPages}
          />
          {isCreatePageOpen && (
            <ManagePage
              closePageDialogue={closePageDialogue}
              getPages={getPages}
              selectedPage={selectedPage}
              windowType={windowType}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ListPage;

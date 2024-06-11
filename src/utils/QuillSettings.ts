export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    // [{ font: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["code-block"],
    [{ align: [] }],
    ["clean"],
  ],
};

// ["link", "image", "video", "formula"],

export const formats = [
  "header",
  // "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
  "video",
  "sub",
  "super",
];

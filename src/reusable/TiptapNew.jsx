import React, { useRef } from "react";
import "./style.scss";
import {
  BiBold,
  BiItalic,
  BiStrikethrough,
  BiParagraph,
  BiUndo,
  BiRedo,
  BiSolidQuoteAltLeft,
  BiListUl,
  BiListOl,
  BiSpaceBar,
} from "react-icons/bi";
import useDetectOutside from "./useDetectOutside";
import { useLocation } from "react-router-dom";
// import { Color } from "@tiptap/extension-color";
// import ListItem from "@tiptap/extension-list-item";
// import TextStyle from "@tiptap/extension-text-style";
import {
  EditorProvider,
  useCurrentEditor,
  useEditor,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const MenuBar = ({ editor }) => {
  // const { editor } = useCurrentEditor();
  const sizeRef = useRef();

  const outside = useDetectOutside(sizeRef, "size");
  if (!editor) {
    return null;
  }

  return (
    <div className={`w-full py-2 `}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${
          editor.isActive("bold") ? "is-active" : ""
        } border border-black p-1  `}
        title={`Bold`}
      >
        <BiBold className={`text-[22px] text-slate-900 m-auto`} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic") ? "is-active" : ""
        } border border-black p-1 `}
        title={`Italic`}
      >
        <BiItalic className={`text-[22px] text-slate-900 m-auto`} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`${
          editor.isActive("strike") ? "is-active" : ""
        } border border-black p-1`}
        title={`Strike`}
      >
        <BiStrikethrough className={`text-[22px] text-slate-900 m-auto`} />
      </button>
      {/* <button */}
      {/*   onClick={() => editor.chain().focus().toggleCode().run()} */}
      {/*   disabled={!editor.can().chain().focus().toggleCode().run()} */}
      {/*   className={editor.isActive("code") ? "is-active" : ""} */}
      {/* > */}
      {/*   code */}
      {/* </button> */}
      {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}> */}
      {/*   clear marks */}
      {/* </button> */}
      {/* <button onClick={() => editor.chain().focus().clearNodes().run()}> */}
      {/*   clear nodes */}
      {/* </button> */}
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${
          editor.isActive("paragraph") ? "is-active" : ""
        } border border-black p-1 `}
        title={`Paragraph`}
      >
        <BiParagraph className={`text-[22px] text-slate-900 m-auto`} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${
          editor.isActive("bulletList") ? "is-active" : ""
        } border border-black p-1 `}
        title={`BulletList`}
      >
        <BiListUl className={`text-[22px] text-slate-900 m-auto`} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${
          editor.isActive("orderedList") ? "is-active" : ""
        } border border-black p-1 `}
        title={`OrderedList`}
      >
        <BiListOl className={`text-[22px] text-slate-900 m-auto`} />
      </button>
      {/* <button */}
      {/*   onClick={() => editor.chain().focus().toggleCodeBlock().run()} */}
      {/*   className={editor.isActive("codeBlock") ? "is-active" : ""} */}
      {/* > */}
      {/*   code block */}
      {/* </button> */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${
          editor.isActive("blockquote") ? "is-active" : ""
        } border border-black p-1 `}
        title={`Blockquote`}
      >
        <BiSolidQuoteAltLeft className={`text-[22px] text-slate-900 m-auto`} />
      </button>
      {/* <button onClick={() => editor.chain().focus().setHorizontalRule().run()}> */}
      {/*   horizontal rule */}
      {/* </button> */}
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={` border border-black p-1`}
        title={`Break`}
      >
        <BiSpaceBar className={`text-[22px] text-slate-900 m-auto`} />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={` border border-black p-1`}
        title={`Undo`}
      >
        <BiUndo className={`text-[22px] text-slate-900 m-auto`} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={` border border-black p-1`}
        title={`Redo`}
      >
        <BiRedo className={`text-[22px] text-slate-900 m-auto`} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${
          editor.isActive("heading", { level: 1 }) ? "is-active" : ""
        } border border-black p-1`}
      >
        s1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${
          editor.isActive("heading", { level: 2 }) ? "is-active" : ""
        }border border-black p-1`}
      >
        s2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${
          editor.isActive("heading", { level: 3 }) ? "is-active" : ""
        } border border-black p-1 `}
      >
        s3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`${
          editor.isActive("heading", { level: 4 }) ? "is-active" : ""
        } border border-black p-1 `}
      >
        s4
      </button>
      {/* <button */}
      {/*   onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} */}
      {/*   className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""} */}
      {/* > */}
      {/*   s5 */}
      {/* </button> */}
      {/* <button */}
      {/*   onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} */}
      {/*   className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""} */}
      {/* > */}
      {/*   h6 */}
      {/* </button> */}
      {/* text-size-end */}
    </div>
  );
};

// const extensions = [
//   // Color.configure({ types: [TextStyle.name, ListItem.name] }),
//   // TextStyle.configure({ types: [ListItem.name] }),
//   StarterKit.configure({
//     bulletList: {
//       keepMarks: true,
//       keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//     },
//     orderedList: {
//       keepMarks: true,
//       keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//     },
//   }),
// ];

const TiptapNew = ({ data, editable, addArticlePage, dataFromTiptap }) => {
  const tiptapRef = useRef();
  const location = useLocation();

  const editablePage =
    location.pathname && location.pathname.includes("editable") && editable;

  // .configure({
  //           BulletList: {
  //             HTMLAttributes: {
  //               class: "list-disc",
  //             },
  //           },
  //         })
  // dark:prose-invert
  const editor = useEditor(
    {
      extensions: [
        StarterKit,

        // TextDirection,
        // TextAlign.configure({
        //  types: ["heading", "paragraph"],
        // }),
      ],
      editorProps: {
        attributes: {
          class:
            "prose prose-md leading-6 min-w-[100%] prose-p:font-light focus:outline-none text-start prose-p:text-black prose-ol:text-black prose-ul:text-black  ",
        },
      },
      onCreate({ editor }) {
        // console.log(editor);

        addArticlePage
          ? editor.commands.setContent("")
          : editor.commands.setContent(
              data && data.matched && data.matched.body,
            );
        addArticlePage || editablePage
          ? editor.setEditable(true)
          : editor.setEditable(false);
        // if (addArticlePage) {
        //
        //     console.log(editor.contentComponent.editorContentRef);
        //     editor.contentComponent.editorContentRef.current.style.outline =
        //       "2px solid black ";
        //     editor.contentComponent.editorContentRef.current.style.padding =
        //       "5px";
        //
        // }
      },
      onFocus({ editor, event }) {
        editor.contentComponent.editorContentRef.current.style.outlineStyle =
          "hidden";
      },
      onUpdate({ editor, event }) {
        const data = {
          text: editor.view.dom.innerText,
          body: editor.getJSON(),
        };

        dataFromTiptap(data);
      },
    },
    [data, addArticlePage, editablePage],
  );

  return (
    <div
      className={` flex flex-col items-center justify-center    `}
      style={{ direction: "rtl" }}
      ref={tiptapRef}
    >
      {editablePage || addArticlePage ? <MenuBar editor={editor} /> : null}
      <EditorContent
        editor={editor}
        className={` w-full `}
        style={{
          outline: `${
            addArticlePage || editablePage ? "2px solid #0f172a" : "hidden"
          }`,
          padding: "5px",
        }}
      />
    </div>
  );
};

export default TiptapNew;

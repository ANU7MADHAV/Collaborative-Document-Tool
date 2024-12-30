import { useEffect, useRef, useState } from "react";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";

const TiptapEditor = () => {
  const [content, setContent] = useState({
    json: null,
  });

  const webSocketRef = useRef<WebSocket | null>(null);

  const editor = useEditor({
    extensions: [Document, Paragraph, Text, BulletList, ListItem],
    content: "",
    onUpdate: ({ editor }) => {
      setContent({
        json: editor.getJSON(),
      });
    },
  });

  if (!editor) {
    return null;
  }

  useEffect(() => {
    webSocketRef.current = new WebSocket("");

    webSocketRef.current.onopen = () => {
      console.log("connection established");
    };
    webSocketRef.current.onmessage = (message: MessageEvent) => {
      console.log("message", message);
    };
    webSocketRef.current.onerror = () => {
      console.log("error");
    };
    webSocketRef.current.onclose = () => {
      console.log("connection closed");
    };

    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (webSocketRef.current?.readyState === 1) {
      webSocketRef.current.send(JSON.stringify(content));
    }
  }, []);

  const handleToggleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const handleSplitListItem = () => {
    editor.chain().focus().splitListItem("listItem").run();
  };

  const handleSinkListItem = () => {
    editor.chain().focus().sinkListItem("listItem").run();
  };

  const handleLiftListItem = () => {
    editor.chain().focus().liftListItem("listItem").run();
  };

  console.log("content", content);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4 space-x-2">
        <button
          onClick={handleToggleBulletList}
          className={
            editor.isActive("bulletList")
              ? "shadow-md bg-violet-500 text-white px-2 rounded-md"
              : "shadow-lg text-black bg-gray-300 rounded-md font-semibold px-2"
          }
        >
          Toggle bullet list
        </button>
        <button
          onClick={handleSplitListItem}
          disabled={!editor.can().splitListItem("listItem")}
          className="shadow-lg text-black bg-gray-300 rounded-md font-semibold px-2 disabled:opacity-50"
        >
          Split list item
        </button>
        <button
          onClick={handleSinkListItem}
          disabled={!editor.can().sinkListItem("listItem")}
          className="shadow-lg text-black bg-gray-300 rounded-md font-semibold px-2 disabled:opacity-50"
        >
          Sink list item
        </button>
        <button
          onClick={handleLiftListItem}
          disabled={!editor.can().liftListItem("listItem")}
          className="shadow-lg text-black bg-gray-300 rounded-md font-semibold px-2 disabled:opacity-50"
        >
          Lift list item
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="prose max-w-full border p-4 rounded-md mb-4"
      />
    </div>
  );
};

export default TiptapEditor;

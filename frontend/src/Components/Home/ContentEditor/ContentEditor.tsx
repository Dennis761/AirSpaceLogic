import React, { useState, useRef, useCallback, useEffect } from "react";
import { FaBold, FaHeading, FaListOl, FaListUl } from "react-icons/fa";
import "./ContentEditor.css";

interface ContentEditorProps {
  initialContent?: string; 
  onSubmit: (content: string) => void;
  onCancel: () => void; 
}

const ContentEditor: React.FC<ContentEditorProps> = ({ initialContent = "", onSubmit, onCancel }) => {
  const [content, setContent] = useState<string>(initialContent);
  const editorRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = convertToHTML(initialContent); 
    }
  }, [initialContent]);

  const convertToHTML = (text: string): string => {
    return text
      .replace(/\[H1\](.*?)\[\/H1\]/gi, "<h1>$1</h1>")
      .replace(/\[H2\](.*?)\[\/H2\]/gi, "<h2>$1</h2>")
      .replace(/\[H3\](.*?)\[\/H3\]/gi, "<h3>$1</h3>")
      .replace(/\[P\](.*?)\[\/P\]/gi, "<p>$1</p>")
      .replace(/\[OL\](.*?)\[\/OL\]/gi, "<ol>$1</ol>")
      .replace(/\[UL\](.*?)\[\/UL\]/gi, "<ul>$1</ul>")
      .replace(/\[LI\](.*?)\[\/LI\]/gi, "<li>$1</li>");
  };

  const applyStyle = useCallback((command: string, value: string | null = null) => {
    document.execCommand(command, false, value);
  }, []);

  const handleContentChange = useCallback(() => {
    const editorContent = editorRef.current?.innerHTML || "";
    setContent(convertContent(editorContent));
  }, []);

  const convertContent = (html: string) => {
    return html 
      .replace(/<h1>(.*?)<\/h1>/gi, "[H1]$1[/H1]")
      .replace(/<h2>(.*?)<\/h2>/gi, "[H2]$1[/H2]")
      .replace(/<h3>(.*?)<\/h3>/gi, "[H3]$1[/H3]")
      .replace(/<p>(.*?)<\/p>/gi, "[P]$1[/P]")
      .replace(/<ol>(.*?)<\/ol>/gi, "[OL]$1[/OL]")
      .replace(/<ul>(.*?)<\/ul>/gi, "[UL]$1[/UL]")
      .replace(/<li>(.*?)<\/li>/gi, "[LI]$1[/LI]")
      .replace(/<span.*?>(.*?)<\/span>/gi, "$1")
      .replace(/<div.*?>(.*?)<\/div>/gi, "$1") 
      .replace(/\n/g, ""); 
  };

  const handleSubmit = () => {
    onSubmit(content); 
    onCancel(); 
  };

  return (
    <div className="text-display-container">
      <h2>Редактор опису</h2>
      <div className="controls">
        <button type="button" onClick={() => applyStyle("formatBlock", "h1")}>
          <FaHeading /> H1
        </button>
        <button type="button" onClick={() => applyStyle("formatBlock", "h2")}>
          <FaHeading /> H2
        </button>
        <button type="button" onClick={() => applyStyle("formatBlock", "h3")}>
          <FaHeading /> H3
        </button>
        <button type="button" onClick={() => applyStyle("formatBlock", "p")}>
          <FaBold /> Параграф
        </button>
        <button type="button" onClick={() => applyStyle("insertOrderedList")}>
          <FaListOl /> Нумерований список
        </button>
        <button type="button" onClick={() => applyStyle("insertUnorderedList")}>
          <FaListUl /> Маркований список
        </button>
      </div>

      <div
        ref={editorRef} 
        contentEditable
        className="editor-textarea"
        onInput={handleContentChange}
        placeholder="Почніть писати тут..."
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "200px",
          fontSize: "1rem",
        }}
      ></div>

      <button onClick={handleSubmit}>Згенерувати</button>
      <button onClick={onCancel}>Скасувати</button> 
    </div>
  );
};

export default ContentEditor;

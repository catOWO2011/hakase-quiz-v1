import MDEditor from "@uiw/react-md-editor";
import React, { useCallback, useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { getCodeString } from "rehype-rewrite";

const randomid = () => parseInt(String(Math.random() * 1e15), 10).toString(36);

const Code = ({ inline, children = [], className, ...props }) => {
  const demoid = useRef(`dome${randomid}`);
  const [container, setContainer] = useState(null);
  const isMermaid = className && /^language-mermaid/.test(className.toLocaleLowerCase());
  const code = children
    ? getCodeString(props.node.children)
    : children[0] || "";

  useEffect(() => {
    if (container && isMermaid && demoid.current && code) {
      mermaid
        .render(demoid.current, code)
        .then(({ svg, bindFunctions }) => {
          console.log("svg:", svg);
          container.innerHTML = svg;
          if (bindFunctions) {
            bindFunctions(container);
          }
        })
        .catch((error) => {
          console.error("error:", error);
        });
    }
  }, [container, isMermaid, code, demoid]);

  const refElement = useCallback((node) => {
    if (node != null) {
      setContainer(node);
    }
  }, []);

  if (isMermaid) {
    return (
      <>
        <code id={demoid.current} style={{ display: "none" }} />
        <code className={className} ref={refElement} data-name="mermaid"></code>
      </>
    );
  }
  return <code className={className}>{children}</code>
};

export default function MarkdownInput({ onChange, height = 100, initialValue='', placeholder }) {
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <div className="w-full">
        <MDEditor
          onChange={(newValue = "") => {
            setValue(newValue);
            onChange(newValue);
          }}
          textareaProps={{
            placeholder: placeholder ?? "Please enter Markdown text"
          }}
          height={height}
          value={value}
          previewOptions={{
            components: {
              code: Code
            }
          }}
        />
      </div>
    </>
  );
}

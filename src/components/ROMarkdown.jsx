import MDEditor from "@uiw/react-md-editor";
import { Flex } from "antd";
import { useEffect, useRef, useState } from "react";

function ROMarkdown({ text, id, extraClasses }) {
  const [height, setHeight] = useState(50);
  const markdownRef = useRef(null);

  const resizeHeight = () => {
    if (markdownRef.current) {
      let newHeight = 25 + document
        .getElementById(markdownRef.current.container.id)
        .getElementsByClassName("wmde-markdown-color")[0].scrollHeight;
      setHeight(newHeight);
    }
  };

  useEffect(() => {
    resizeHeight();
  }, [text]);

  useEffect(() => {
    window.addEventListener('resize', resizeHeight);
    return () => window.removeEventListener('resize', resizeHeight);
  }, [])
  
  if (text) {
    return (
      <Flex className={`w-full ${extraClasses}`}>
        <MDEditor
          id={id}
          ref={markdownRef}
          value={text}
          preview="preview"
          hideToolbar={true}
          height={height}
          className="w-full"
        />
      </Flex>
    );
  }

  return <></>;
}

export default ROMarkdown;

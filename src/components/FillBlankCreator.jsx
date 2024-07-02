import { DeleteTwoTone, PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";

const PLACEHOLDER_FILL_BLANK = "Write the text to fill";
const PLACEHOLDER_FILL_TEXT = "Write the text ouside the blank";
const BLANK_TYPE = "blank";
const TEXT_TYPE = "text";

export default function FillBlankCreator({ setCorrectAnswer, setQuestionText }) {
  const [tokens, setTokens] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [placeHolderText, setPlaceHolderText] = useState("");
  const [tokenType, setTokenType] = useState("");
  const inputRef = useRef(null);

  const handleAddBlank = () => {
    setShowInput(true);
    setTokenType(BLANK_TYPE);
    setPlaceHolderText(PLACEHOLDER_FILL_BLANK);
  };

  const handleAddText = () => {
    setShowInput(true);
    setTokenType(TEXT_TYPE);
    setPlaceHolderText(PLACEHOLDER_FILL_TEXT);
  };

  const handleRemoveToken = (tokenIndex) => {
    const newTokens = [...tokens];
    newTokens.splice(tokenIndex, 1);
    setTokens([...newTokens]);
    setQuestionText(tokens.map(({ type, text }) => type === BLANK_TYPE ? `__${text}__` : text).join(" "));
  };

  const handleInputKeyDown = (e) => {
    let {
      target: { value },
    } = e;

    value = value.trim();

    if (e.key == "Enter" && value) {
      if (
        tokens.find(
          ({ type, text }) =>
            text.toLowerCase() === value.toLowerCase() && tokenType === type
        )
      ) {
        return;
      }

      setTokens([
        ...tokens,
        {
          type: tokenType,
          text: value,
        },
      ]);

      inputRef.current.value = null;

      setShowInput(false);
    }
  };

  useEffect(() => {

    if (showInput) {
      inputRef.current.focus();
    }

    setQuestionText(
      tokens.map(
        ({ type, text }) => {
          text = text.split(/\s+/).join(" ");
          return type === BLANK_TYPE ? ' '.repeat(text.split(' ').join(' ').length) : text
        }).join(" ")
    );

    setCorrectAnswer(
      [...tokens.filter(({ type }) => type === BLANK_TYPE).map(({ text }) => text)]
    );

  }, [showInput, tokens]);

  return (
    <>
      <div className="flex justify-end py-[10px]">
        <div className="flex gap-4">
          <Button onClick={handleAddBlank} className="items-center flex">
            <PlusCircleOutlined />
            Blank
          </Button>
          <Button onClick={handleAddText} className="items-center flex">
            <PlusCircleOutlined />
            Text
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap bg-white border-2 border-solid border-[#d6d6d6] px-[5px] pt-[5px] pb-0">
        <ul className="inline-flex flex-wrap m-0 p-0 w-full mb-[10px]">
          {tokens.map(({ type, text }, index) => (
            <li
              className={`flex
                        items-center
                        mr-[5px] mb-[5px]
                        py-[5px] px-[10px]
                        list-none
                        rounded-[5px]
                        ${type == BLANK_TYPE ? "bg-[#00A9FF]" : ""}`}
              key={`token-${index}`}
            >
              {text}
              <button
                className={`
                          items-center
                          inline-flex
                          p-0
                          ml-[8px]
                        `}
                onClick={() => handleRemoveToken(index)}
              >
                <DeleteTwoTone />
              </button>
            </li>
          ))}
          <li className="bg-none grow p-0 flex mr-[5px] mb-[5px] items-center">
            {showInput && (
              <input
                placeholder={placeHolderText}
                onKeyDown={handleInputKeyDown}
                className={
                  `overflow-visi4ble
                  w-full p-[5px]
                  focus:border-[#00A9FF]
                  focus:border-teal
                  focus:outline-none
                  focus:ring-0
                  bg-[#${tokenType == BLANK_TYPE ? '89CFF3' : 'CDF5FD'}]`
                }
                ref={inputRef}
              />
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

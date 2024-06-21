import debounce from "lodash.debounce";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

interface CodeSpaceProps {
  selectedLang: string;
  algorithmId: number;
}

const CodeSpace: React.FC<CodeSpaceProps> = ({ selectedLang, algorithmId }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineNumbers, setLineNumbers] = useState<number[]>([1]);

  // 알고리즘 별 코드 정보를 sessionStorage에 저장
  const [code, setCode] = useState<string>(() => {
    return sessionStorage.getItem(algorithmId.toString()) || "";
  });

  // 하이라이팅 된 코드 정보
  const [highlightedHTML, setHighlightedCode] = useState("");

  // textarea 높이에 따라 lineNumber 계산
  const calculateLineNumbers = useCallback(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
      const lines = Math.ceil(textarea.scrollHeight / Math.ceil(lineHeight));
      setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
    }
  }, []);

  // debounce를 통해 lineNumber Update
  const updateLineNumbers = useCallback(debounce(calculateLineNumbers, 50), [
    calculateLineNumbers,
  ]);

  // textarea 높이 조절
  const adjustTextareaHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // textarea의 높이가 내용에 따라 줄어들 수 있도록 함
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  // 코드가 입력될때마다 setCode, lineNumber 업데이트
  const changeCode = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newCode = e.target.value;
      setCode(newCode);
      sessionStorage.setItem(algorithmId.toString(), newCode); // 코드를 sessionStorage에 저장
      updateLineNumbers();
      adjustTextareaHeight();
    },
    [algorithmId, updateLineNumbers, adjustTextareaHeight]
  );

  // 입력한 코드를 HTML화하여 하이라이팅
  const createMarkUpCode = useCallback(
    (code: string): { __html: string } => ({
      __html: code,
    }),
    []
  );

  // hljs로 코드 하이라이팅 하는 useEffect
  useEffect(() => {
    if (hljs.getLanguage(selectedLang)) {
      setHighlightedCode(
        hljs.highlight(code, { language: selectedLang }).value
      );
    } else {
      setHighlightedCode(hljs.highlightAuto(code).value);
    }
    updateLineNumbers();
    adjustTextareaHeight();
  }, [code, selectedLang, updateLineNumbers, adjustTextareaHeight]);

  // textarea에 코드 입력
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const handleInput = () => {
        setCode(textarea.value);
        updateLineNumbers();
        adjustTextareaHeight();
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Tab") {
          event.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          textarea.setRangeText("  ", start, end, "end");
          handleInput();
        }
      };

      textarea.addEventListener("input", handleInput);
      textarea.addEventListener("keydown", handleKeyDown);

      handleInput(); // 초기 줄 번호 설정

      return () => {
        textarea.removeEventListener("input", handleInput);
        textarea.removeEventListener("keydown", handleKeyDown);
        updateLineNumbers.cancel();
      };
    }
  }, [updateLineNumbers, setCode, adjustTextareaHeight]);

  // 컴포넌트 마운트 시 초기 줄 번호 설정
  useEffect(() => {
    calculateLineNumbers();
    adjustTextareaHeight();
  }, [calculateLineNumbers, adjustTextareaHeight]);

  return (
    <div className="codeSpace">
      <div className="editor">
        <div className="lineNumbers">
          {lineNumbers.map((number) => (
            <span className="lineNumber" key={number}>
              {number}
            </span>
          ))}
        </div>
        <div className="fakeDiv">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={changeCode}
            autoComplete="false"
            spellCheck="false"
            style={{ overflow: "hidden", resize: "none" }}
          />
          <pre className="present">
            <code
              dangerouslySetInnerHTML={createMarkUpCode(highlightedHTML)}
            ></code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeSpace;

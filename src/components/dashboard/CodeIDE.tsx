import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

// styles
import { Container } from "@/styles/home/IDEStyles";

// atom
import { useRecoilState } from "recoil";
import { pageDataState, testDataState } from "@/atom/stats";

// type
import { problemListType, testCaseType } from "@/types/aboutAdmin";
import { Result, TestResult } from "@/types/aboutStudy";
import CodeSpace from "@/components/dashboard/CodeSpace.tsx";

const CodeIDE = () => {
  const [cookies] = useCookies(["accessToken"]);
  const { accessToken } = cookies;

  // 알고리즘 문제 정보, 테스트 케이스 정보
  const [pageData] = useRecoilState<problemListType>(pageDataState);
  const [testData] = useRecoilState<testCaseType[]>(testDataState);

  // 코드 제출 후 결과
  const [result, setResult] = useState<Result>();
  const [testResult, setTestResult] = useState<TestResult[]>();

  // language 선택 토글 상태
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("java");

  // 코드 채점 결과 별 class
  const getStatusClass = (status: string) => {
    switch (status) {
      case "PASS":
        return "pass";
      case "FAIL":
        return "fail";
      case "ERROR":
        return "error";
      default:
        return "";
    }
  };

  // 스크롤 구현
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();

        if (
          containerRect.top < 0 ||
          containerRect.bottom > window.innerHeight
        ) {
          window.scrollBy(0, containerRect.top);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // language 선택 관련
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (item: string) => {
    setSelectedLang(item);
    setIsOpen(false);
  };

  // 코드 제출
  const onSubmit = async () => {
    const code = sessionStorage.getItem(pageData.algorithmId.toString()) || "";
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      // console.log("code: ", code);
      const response = await axios.put(
        `${import.meta.env.VITE_DEPLOYED_API_ADDRESS}/submit`,
        {
          algorithmId: pageData.algorithmId,
          language: selectedLang,
          detail: code,
        },
        {
          headers: headers,
        }
      );
      // console.log(response.data.results);
      setResult(response.data.results[0]);
      setTestResult(response.data.results[0].results);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = () => {
    setResult(undefined);
    setTestResult(undefined);
    onSubmit();
  };

  return (
    <Container>
      <nav className="title">
        {pageData.algorithmTitle}
        <div>
          <div className="toggle-button-container" onClick={toggleDropdown}>
            <span className="label">{selectedLang}</span>
            <span className={`arrow ${isOpen ? "open" : "closed"}`} />
            <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
              {["java", "c++", "python"].map((item) => (
                <div
                  key={item}
                  className="dropdown-item"
                  onClick={() => selectItem(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div className="divideContainer" ref={containerRef}>
        <div className="problem-details">
          <div className="content">
            <h2 className="task">문제</h2>
            <p className="description">
              {pageData.explanation &&
                (pageData.explanation.includes("\n") ? (
                  pageData.explanation.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))
                ) : (
                  <React.Fragment>{pageData.explanation}</React.Fragment>
                ))}
            </p>
            {/*
              문제 생성 시 예시 데이터 입력란이 없음
              <div className="example">
                <pre></pre>
              </div> 
            */}
          </div>
          <div className="content">
            <h2 className="task">제한 사항</h2>
            <ul>
              {pageData.restrictions.map((rest, index) => (
                <li key={index}>{rest}</li>
              ))}
            </ul>
          </div>
          {testData.map((test, index) => (
            <div className="testcase" key={index}>
              <div className="content">
                <h2 className="task">입력</h2>
                <div className="example">
                  <pre>{test.input}</pre>
                </div>
              </div>
              <div className="content">
                <h2 className="task">출력</h2>
                <div className="example">
                  <pre>{test.output}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="IDEContainer">
          <CodeSpace
            selectedLang={selectedLang}
            algorithmId={pageData.algorithmId}
          />
          <div className="resultSpace">
            <div className="task">실행 결과</div>
            <div className="result">
              {result && (
                <div className="elements">
                  <div className="element">
                    전체 결과:{" "}
                    <span className={`${getStatusClass(result?.answerType)}`}>
                      {result?.answerType}
                    </span>
                  </div>
                  <div className="element">언어: {result?.language}</div>
                  <div className="element">
                    사용 메모리: {result?.solveMemory.toFixed(2)}KB
                  </div>
                  <div className="element">
                    경과 시간 : {result?.solveTime}ms
                  </div>
                </div>
              )}
              {testResult?.map((test) => (
                <div className="testResult" key={test.testNum}>
                  테스트 케이스 {test.testNum} :{" "}
                  <span className={`${getStatusClass(test.status)}`}>
                    {test.status}
                  </span>
                  {test.usedMemory >= 0 && (
                    <span className="small">
                      사용 메모리 : {test.usedMemory.toFixed(2)}KB
                    </span>
                  )}
                  {test.executionTime && (
                    <span className="small">시간 : {test.executionTime}ms</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <button className="submit" onClick={handleSubmit}>
          제출 후 채점하기
        </button>
      </div>
    </Container>
  );
};

export default CodeIDE;

import { SetStateAction, forwardRef, useEffect, useRef, useState } from "react";
// img
import Close from "@/assets/admin/Close_round.png";
import Plus from "@/assets/home/plus_testCase.png";
import Minus from "@/assets/admin/minus.png";

// types
import { createProblemType, testCaseType } from "@/types/aboutAdmin";

interface TestCaseModalType {
  openTestCase: () => void;
  testCase: testCaseType[];
  setTestCaseData: React.Dispatch<React.SetStateAction<testCaseType[]>>;
  setCreateProblem: React.Dispatch<React.SetStateAction<createProblemType>>;
  ref: (node?: Element | null | undefined) => void;
}

const TestCaseModal = forwardRef<any, TestCaseModalType>(
  ({ openTestCase, testCase, setCreateProblem }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleScroll = () => {
        if (containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();

          // 부모 요소를 벗어났을 때 스크롤 조절
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

    // 추가
    const addTestCase = () => {
      setCreateProblem((prevData) => ({
        ...prevData,
        // 여기서 prevData를 업데이트하여 새로운 createProblemType 객체를 반환
        testCase: [...prevData.testCase, { input: "", output: "" }],
      }));
    };

    // 삭제
    const removeTestCase = () => {
      setCreateProblem((prevData) => {
        if (prevData.testCase.length > 1) {
          return {
            ...prevData,
            testCases: prevData.testCase.slice(0, prevData.testCase.length - 1),
          };
        }
        return prevData;
      });
    };

    const inputData = (type: string, value: string, index: number) => {
      setCreateProblem((prevData) => ({
        ...prevData,
        testCase: prevData.testCase.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              [type]: value,
            };
          }
          return item;
        }),
      }));
    };

    return (
      <div className="testCaseModal" ref={containerRef}>
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <img
            src={Close}
            onClick={openTestCase}
            style={{ padding: "0.5rem" }}
          />
        </nav>
        <span className="testCaseTitle">테스트 케이스</span>
        <div className="testCaseModalContents">
          {/* 입출력 */}
          {testCase.map((testCaseData, index) => (
            <div key={index} className="testCaseRow" ref={ref}>
              <div className="testCaseCol">
                <span className="testCaseInput">입력</span>
                <div className="textareaBg">
                  <textarea
                    className="textarea"
                    value={testCaseData.input}
                    onChange={(e) => inputData("input", e.target.value, index)}
                  />
                </div>
              </div>
              <div className="testCaseCol">
                <span className="testCaseInput">출력</span>
                <div className="textareaBg">
                  <textarea
                    className="textarea"
                    value={testCaseData.output}
                    onChange={(e) => inputData("output", e.target.value, index)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div id="observer" style={{ height: "10px" }}></div>
          {/* 입출력 */}
        </div>
        <div className="testCaseButtonContainer">
          <button className="testCaseButton" onClick={addTestCase}>
            <img src={Plus} />
          </button>
          <button className="testCaseButton" onClick={removeTestCase}>
            <img
              src={Minus}
              style={{ width: "1vw", paddingBottom: "0.2rem" }}
            />
          </button>
        </div>
      </div>
    );
  }
);

export default TestCaseModal;

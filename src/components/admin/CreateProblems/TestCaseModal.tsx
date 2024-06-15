import { SetStateAction, useEffect } from "react";
// img
import Close from "@/assets/admin/Close_round.png";
import Plus from "@/assets/home/plus_testCase.png";
import Minus from "@/assets/admin/minus.png";

// types
import { createProblemType, testCaseType } from "@/types/aboutAdmin";

interface TestCaseModalType {
  openTestCase: () => void;
  testCases: testCaseType[];
  setCreateProblem: React.Dispatch<React.SetStateAction<createProblemType>>;
}
const TestCaseModal = ({
  openTestCase,
  testCases,
  setCreateProblem,
}: TestCaseModalType) => {
  // 추가
  const addTestCase = () => {
    setCreateProblem((prevData) => ({
      ...prevData,
      // 여기서 prevData를 업데이트하여 새로운 createProblemType 객체를 반환
      testCases: [...prevData.testCases, { input: "", output: "" }],
    }));
  };
  // 삭제
  const removeTestCase = () => {
    setCreateProblem((prevData) => {
      if (prevData.testCases.length > 0) {
        return {
          ...prevData,
          testCases: prevData.testCases.slice(0, prevData.testCases.length - 1),
        };
      }
      return prevData;
    });
  };

  const inputData = (type: string, value: string, index: number) => {
    setCreateProblem((prevData) => ({
      ...prevData,
      testCases: prevData.testCases.map((item, i) => {
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
    <div className="testCaseModal">
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <img src={Close} onClick={openTestCase} style={{ padding: "0.5rem" }} />
      </nav>
      <span className="testCaseTitle">테스트 케이스</span>
      <div className="testCaseModalContents">
        {/* 입출력 */}
        {testCases.map((testCase, index) => (
          <div key={index} className="testCaseRow">
            <div className="testCaseCol">
              <span className="testCaseInput">입력</span>
              <div className="textareaBg">
                <textarea
                  className="textarea"
                  value={testCase.input}
                  onChange={(e) => inputData("input", e.target.value, index)}
                />
              </div>
            </div>
            <div className="testCaseCol">
              <span className="testCaseInput">출력</span>
              <div className="textareaBg">
                <textarea
                  className="textarea"
                  value={testCase.output}
                  onChange={(e) => inputData("output", e.target.value, index)}
                />
              </div>
            </div>
          </div>
        ))}

        {/* 입출력 */}
      </div>
      <div className="testCaseButtonContainer">
        <button className="testCaseButton" onClick={addTestCase}>
          <img src={Plus} />
        </button>
        <button className="testCaseButton" onClick={removeTestCase}>
          <img src={Minus} style={{ width: "1vw", paddingBottom: "0.2rem" }} />
        </button>
      </div>
    </div>
  );
};

export default TestCaseModal;

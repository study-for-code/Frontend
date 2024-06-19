import { useContext, useEffect, useState } from "react";
// styles
import { LimitElementInput } from "@/styles/admin/adminStyles";
// img

// apis
import { TestCaseModalContext } from "@/pages/Admin/Admin";
import TestCaseModal from "./CreateProblems/TestCaseModal";

// type
import {
  createProblemType,
  limitationType,
  testCaseType,
} from "@/types/aboutAdmin";

// componets
import ProblemDetailSection from "@/components/admin/CreateProblems/ProblemDetailSection";
import ProblemInputSection from "@/components/admin/CreateProblems/ProblemInputSection";

// libraries
import axios from "axios";

const CreateProblems = () => {
  // apis
  const { testCaseModal, setTestCaseModal } = useContext(TestCaseModalContext);

  // 테스트 케이스 데이터
  const [testCaseData, setTestCaseData] = useState<testCaseType[]>([
    {
      input: "",
      output: "",
    },
  ]);

  // 제한 사항
  const [limitationList, setLimitationList] = useState<string[]>([" "]);

  // 문제 생성 데이터
  const [createProblem, setCreateProblem] = useState<createProblemType>({
    title: "", // 문제 이름
    timeLimit: 0, // 시간 제한
    memoryLimit: 0, // 메모리 제한
    submit: 0, // 전체 정답 제출 횟수
    answer: 0, // 제출 된 정답 코드들중 통과한 횟수
    answerRate: "", // 정답 비율
    testCase: [
      {
        input: "",
        output: "",
      },
    ], // 테스트 케이스
    explanation: "", // 문제 설명
  });

  const {
    title,
    explanation,
    timeLimit,
    submit,
    answer,
    answerRate,
    testCase,
  } = createProblem;

  // 테스트 케이스 닫기
  const closeTestCase = () => {
    setTestCaseModal(true);
  };
  // 테스트 케이스 열기
  const openTestCase = () => {
    setTestCaseModal(false);
  };

  const inputData = (type: string, value: string | number) => {
    setCreateProblem((prev) => {
      let newValue = value;
      if (typeof value === "string") {
        newValue = isNaN(Number(value)) ? value : Number(value);
      }
      return {
        ...prev,
        [type]: newValue,
      };
    });
  };

  // create problem
  const onCreate = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/algorithms`,
        {
          title,
          timeLimit,
          submit,
          answer,
          answerRate,
          explanation,
          restrictions: limitationList,
        }
      );
      console.log(response);
      const { algorithmId } = response.data.results[0];

      const response2 = testCase.map((testCase) =>
        axios.post(
          `${import.meta.env.VITE_LOCAL_API_ADDRESS}/testcases/${algorithmId}`,
          {
            input: testCase.input,
            output: testCase.output,
          }
        )
      );
      const res = await Promise.all(response2);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("createProblem: ", createProblem);
    console.log("limitationList: ", limitationList);
  }, [createProblem, limitationList]);

  return (
    <div className="content">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "40px",
        }}
      >
        <span className="title">문제 생성</span>
      </div>

      {/* 문제 입력 박스 */}
      <div className="problemSection">
        {/* 문제 입력 헤더 */}
        <div className="topSection">
          <span className="userName">사용자 이름</span>
          <div className="buttonContainer">
            <button className="inputProblem" onClick={onCreate}>
              문제 생성
            </button>
            <button className="testCase" onClick={closeTestCase}>
              테스트 케이스
            </button>
            {testCaseModal && (
              <TestCaseModal
                openTestCase={openTestCase}
                testCase={testCase}
                setCreateProblem={setCreateProblem}
                setTestCaseData={setTestCaseData}
              />
            )}
          </div>
        </div>
        {/* 문제 입력 헤더 */}
        {/* 문제 입력 컨텐츠 부분 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ProblemDetailSection inputData={inputData} />
        </div>
        {/* 문제 입력 컨텐츠 부분 */}
      </div>
      {/* 문제 입력 박스 */}
      <ProblemInputSection inputData={inputData} />
      {/* 문제 입력 박스 */}
      <div className="limitElementSection">
        <span className="sectionTitle2">제한 사항</span>
        <div
          style={{
            height: "auto",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            marginTop: "1rem",
          }}
        >
          {limitationList.map((item, i: number) => (
            <li className="listElement" key={i}>
              <LimitElementInput
                testcasemodal={testCaseModal}
                name="restrictions"
                onChange={(e) => {
                  limitationList[i] = e.target.value;
                  setLimitationList([...limitationList]);
                }}
                onKeyDown={(e) => {
                  const key = e.key.toUpperCase();
                  if (key === "ENTER") {
                    e.preventDefault();
                    setLimitationList([...limitationList, ""]);
                  }
                }}
                value={item}
              />
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateProblems;

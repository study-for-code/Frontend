import { useContext, useEffect, useState } from "react";
// styles
import { LimitElementInput } from "@/styles/admin/adminStyles";
// img

// apis
import { TestCaseModalContext } from "@/pages/Admin/Admin";
import TestCaseModal from "./CreateProblems/TestCaseModal";

// type
import { createProblemType, testCaseType } from "@/types/aboutAdmin";

// componets
import ProblemDetailSection from "@/components/admin/CreateProblems/ProblemDetailSection";
import ProblemInputSection from "@/components/admin/CreateProblems/ProblemInputSection";

// libraries
import { useCookies } from "react-cookie";
import useOnCreate, {
  useOnCreateType,
} from "@/hooks/admin/CreateProblems/useOnCreate";
import useInputData from "@/hooks/admin/CreateProblems/useInputData";

const CreateProblems = () => {
  // cookie
  const [cookies] = useCookies(["nickname"]);
  // apis
  const { testCaseModal, setTestCaseModal } = useContext(TestCaseModalContext);

  // 테스트 케이스 데이터
  const [, setTestCaseData] = useState<testCaseType[]>([
    {
      input: "",
      output: "",
    },
  ]);

  // 제한 사항
  const [restrictions, setRestrictions] = useState<string[]>([" "]);

  // 문제 생성 데이터
  const [createProblem, setCreateProblem] = useState<createProblemType>({
    title: "", // 문제 이름
    timeLimit: 0, // 시간 제한
    memorySize: 0, // 메모리 제한
    testCase: [
      {
        input: "",
        output: "",
      },
    ], // 테스트 케이스
    explanation: "", // 문제 설명
  });

  const { title, explanation, timeLimit, memorySize, testCase } = createProblem;

  // 테스트 케이스 닫기
  const closeTestCase = () => {
    setTestCaseModal(true);
  };
  // 테스트 케이스 열기
  const openTestCase = () => {
    setTestCaseModal(false);
  };

  const inputData = (type: string, value: string | number) => {
    const object = {
      setCreateProblem,
      type,
      value,
    };
    const execute = useInputData(object);
    execute();
  };

  // create problem
  const onCreate = async () => {
    const object: useOnCreateType = {
      title,
      timeLimit,
      memorySize,
      explanation,
      restrictions,
      testCase,
    };
    const execute = useOnCreate(object);
    execute();
  };

  useEffect(() => {
    console.log("createProblem: ", createProblem);
    console.log("limitationList: ", restrictions);
  }, [createProblem, restrictions]);

  return (
    <div className="content">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "30px",
        }}
      >
        <span className="title">문제 생성</span>
      </div>

      {/* 문제 입력 박스 */}
      <div className="problemSection">
        {/* 문제 입력 헤더 */}
        <div className="topSection">
          <span className="userName">{cookies.nickname}</span>
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
          {restrictions.map((item, i: number) => (
            <li className="listElement" key={i}>
              <LimitElementInput
                testcasemodal={testCaseModal}
                name="restrictions"
                onChange={(e) => {
                  restrictions[i] = e.target.value;
                  setRestrictions([...restrictions]);
                }}
                onKeyDown={(e) => {
                  const key = e.key.toUpperCase();
                  if (key === "ENTER") {
                    e.preventDefault();
                    setRestrictions([...restrictions, ""]);
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

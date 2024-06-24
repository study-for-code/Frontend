import { useContext, useEffect, useState } from "react";
// img
import ListIcon from "@/assets/admin/list.png";
import modalOpen from "@/assets/admin/Expand_left_double.png";
import modalClose from "@/assets/admin/Expand_right_double.png";

// hooks
import useManageProblemData, {
  useManageProblemDataType,
} from "@/hooks/admin/useManageProblemData";
// types
import { getTestCaseType, problemListType } from "@/types/aboutAdmin";

// styles
import {
  ManageProblemsContainer,
  ModifyBtn,
  ModifyLimitElementInput,
  ModifyTitleInput,
} from "@/styles/admin/adminStyles";
// components
import SlideModalNavBar from "@/components/admin/ManageProblems/SlideModalNavBar";
import ProblemList from "@/components/admin/ManageProblems/ProblemList";
import TestCaseModifyModal from "./ManageProblems/TestCaseModifyModal";

// apis
import { TestCaseModalContext } from "@/pages/Admin/Admin";
import useHandleTestCaseModal, {
  useHandleTestCaseModalType,
} from "@/hooks/admin/ManageProblems/useHandleTestCaseModal";
import useModifyData, {
  useModifyDataType,
} from "@/hooks/admin/ManageProblems/useModifyData";
import axios from "axios";
import useDeleteData from "@/hooks/admin/ManageProblems/useDeleteData";

const ManageProblems = () => {
  // testCase modal
  const modalContext = useContext(TestCaseModalContext);
  const { isModalOpen, setIsModalOpen } = modalContext;
  // modal 데이터
  const [modalData, setModalData] = useState<problemListType>({
    algorithmId: 0,
    algorithmTitle: "",
    submit: 0, // 제출된 정답의 개수
    answer: 0, // 맞은 정답의 개수
    answerRate: 0.0, // 정답 비율
    explanation: "", // 문제 내용
    restrictions: [],
    timeLimit: 0,
    memorySize: 0,
  });
  const {
    algorithmTitle,
    explanation,
    algorithmId,
    restrictions,
    timeLimit,
    memorySize,
  } = modalData;

  // modal 제어
  const [modalState, setModalState] = useState<boolean>(false);

  // modal 수정 제어
  const [isModify, setIsModify] = useState<boolean>(false);
  // 전체 문제 리스트
  const [problemList, setProblemList] = useState<problemListType[]>([]);

  // 테스트 케이스 리스트
  const [testcaseList, setTestcaseList] = useState<getTestCaseType[]>([
    {
      input: "",
      output: "",
      testcaseId: 0,
    },
  ]);

  // data 가져오기
  const getData = async () => {
    const object: useManageProblemDataType = {
      setProblemList,
    };
    const execute = useManageProblemData(object);
    execute();
  };

  // modal open
  const handleTestCaseModal = async () => {
    const object: useHandleTestCaseModalType = {
      setIsModalOpen,
      setTestcaseList,
      algorithmId,
    };
    const execute = useHandleTestCaseModal(object);
    execute();
  };
  // 수정 데이터 통신
  const modifyData = async () => {
    const object: useModifyDataType = {
      algorithmId,
      algorithmTitle,
      explanation,
      restrictions,
      timeLimit,
      memorySize,
      setIsModify,
      setProblemList,
    };
    const execute = useModifyData(object);
    execute();
  };

  const deleteData = async () => {
    const object = {
      setProblemList,
      algorithmId,
    };
    const execute = useDeleteData(object);
    execute();
  };
  // 입력
  const inputData = (type: string, value: string | number) => {
    if (value !== "-") {
      setModalData((prev) => {
        let newValue = value;
        if (typeof value === "string") {
          newValue =
            value.trim() === ""
              ? ""
              : !isNaN(Number(value))
                ? Number(value)
                : newValue;
        }
        return {
          ...prev,
          [type]: newValue,
        };
      });
    }
  };
  // 선택된 데이터
  const getSelectedData = (data: problemListType) => {
    setModalData(data);
    setModalState(true);
  };

  // modal controll
  const handleModal = () => {
    setModalState(!modalState);
  };

  // modify controll
  const handleModalModify = () => {
    setIsModify(!isModify);
  };

  // useEffect(() => {
  //   console.log("modalData: ", modalData);
  //   console.log("testcaseList: ", testcaseList);
  // }, [modalData, testcaseList]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <ManageProblemsContainer
      modalstate={modalState}
      ismodify={isModify}
      ismodalopen={isModalOpen}
    >
      <span className="title">문제 관리</span>
      <div className="container">
        <img src={ListIcon} />
        <span className="problemList">문제 목록</span>
      </div>
      {/* 문제 리스트 */}
      {/* 데이터가 가끔 못 받아오는 경우가 있어서 해결해야함 */}
      <ProblemList
        problemList={problemList}
        getSelectedData={getSelectedData}
      />
      {/* 문제 리스트 */}
      <div className="slideModal">
        <nav style={{ padding: "0.5rem" }}>
          <img
            src={modalState ? modalClose : modalOpen}
            onClick={handleModal}
          />
        </nav>
        {/* 내용 부분 */}
        {modalState ? (
          <div className="slideModalContent">
            {isModify ? (
              <div style={{ width: "100%" }}>
                <ModifyTitleInput
                  ismodify={isModalOpen}
                  name="algorithmTitle"
                  onChange={(e) => inputData(e.target.name, e.target.value)}
                  value={algorithmTitle}
                />
              </div>
            ) : (
              <div className="slideModalTitle">{modalData.algorithmTitle}</div>
            )}

            {/* 모달 nav바 */}
            <SlideModalNavBar
              isModify={isModify}
              modalData={modalData}
              inputData={inputData}
            />
            {/* 모달 nav바 */}
            {/* 모달 content */}
            <div className="slideModalContents">
              <div style={{ marginBottom: "0.5rem" }}>
                <span className="problem">문제</span>
              </div>
              {isModify ? (
                <div className="textareaBg">
                  <textarea
                    name="explanation"
                    onChange={(e) => inputData(e.target.name, e.target.value)}
                    value={explanation}
                  />
                </div>
              ) : (
                <div>{modalData.explanation}</div>
              )}
            </div>
            {/* <div className="limitElementSection">
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
                    <ModifyLimitElementInput
                      name="restrictions"
                      onChange={(e) => {
                        restrictions[i] = e.target.value;
                        setModalData((prev) => ({
                          ...prev,
                          restrictions,
                        }));
                      }}
                      onKeyDown={(e) => {
                        const key = e.key.toUpperCase();
                        if (key === "ENTER") {
                          e.preventDefault();
                          setModalData((prev) => ({
                            ...prev,
                            restrictions,
                          }));
                        }
                      }}
                      value={item}
                    />
                  </li>
                ))}
              </div>
            </div> */}
            {/* 버튼 */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "60%",
                }}
              >
                <ModifyBtn
                  ismodalopen={isModalOpen}
                  onClick={isModify ? modifyData : handleModalModify}
                >
                  {isModify ? "확인" : "수정"}
                </ModifyBtn>
                <button className="testCase" onClick={handleTestCaseModal}>
                  테스트 케이스
                </button>
                <button
                  className="testCase2"
                  onClick={deleteData}
                  style={{ width: "5vw" }}
                >
                  삭제
                </button>
                {isModalOpen && (
                  <TestCaseModifyModal
                    testcaseList={testcaseList}
                    setTestcaseList={setTestcaseList}
                  />
                )}
              </div>
            </div>
            {/* 모달 content */}
          </div>
        ) : null}
      </div>
    </ManageProblemsContainer>
  );
};

export default ManageProblems;

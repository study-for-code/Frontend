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
  ModifyTitleInput,
} from "@/styles/admin/adminStyles";
// components
import SlideModalNavBar from "@/components/admin/ManageProblems/SlideModalNavBar";
import ProblemList from "@/components/admin/ManageProblems/ProblemList";
import TestCaseModifyModal from "./ManageProblems/TestCaseModifyModal";

// apis
import { TestCaseModalContext } from "@/pages/Admin/Admin";
import axios from "axios";

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
    content: "", // 문제 내용
    restrictions: [],
    timeLimit: 0,
  });
  const { algorithmTitle, content, algorithmId, restrictions, timeLimit } =
    modalData;

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
    setIsModalOpen(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/testcases/${algorithmId}`
      );
      console.log("testCase: ", res);
      const { results } = res.data;
      console.log("results: ", results);
      setTestcaseList(results);
    } catch (error) {
      console.log(error);
    }
  };
  // 수정 데이터 통신
  const modifyData = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/algorithms/${algorithmId}`,
        {
          title: algorithmTitle,
          explanation: content,
          restrictions, // string 배열
          timeLimit,
        }
      );
      setIsModify(false);
      console.log(res);
      const { code } = res.data;
      if (code === "200") {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_API_ADDRESS}/algorithms`
        );
        console.log(response);
        const { results } = response.data;
        setProblemList(results);
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  // 입력
  const inputData = (type: string, value: string | number) => {
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

  useEffect(() => {
    console.log("modalData: ", modalData);
    console.log("testcaseList: ", testcaseList);
  }, [modalData, testcaseList]);

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
                    name="content"
                    onChange={(e) => inputData(e.target.name, e.target.value)}
                    value={content}
                  />
                </div>
              ) : (
                <div>{modalData.content}</div>
              )}
            </div>
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
                  width: "45%",
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

import { useEffect, useState } from "react";
// img
import ListIcon from "@/assets/admin/list.png";
import modalOpen from "@/assets/admin/Expand_left_double.png";
import modalClose from "@/assets/admin/Expand_right_double.png";

// hooks
import useManageProblemData, {
  useManageProblemDataType,
} from "@/hooks/admin/useManageProblemData";
// types
import { problemListType } from "@/types/aboutAdmin";

// styles
import { ManageProblemsContainer } from "@/styles/admin/adminStyles";
import SlideModalNavBar from "./ManageProblems/SlideModalNavBar";
import ProblemList from "./ManageProblems/ProblemList";

const ManageProblems = () => {
  // modal 데이터
  const [modalData, setModalData] = useState<problemListType>({
    subjectName: "",
    subjectNumber: 0, // 문제 번호
    algorithmType: "", // 알고리즘 종류
    problemDescription: "",
    timeLimit: 0, //  시간 제한
    memorySize: 0, // 메모리 사이즈
    answerRate: 0, // 정답 비율
    solveTime: "", // 풀이 시간
  });

  // modal 제어
  const [modalState, setModalState] = useState<boolean>(false);

  // 전체 문제 리스트
  const [problemList, setProblemList] = useState<problemListType[]>([]);

  // data 가져오기
  const getData = async () => {
    const object: useManageProblemDataType = {
      setProblemList,
    };
    const execute = useManageProblemData(object);
    execute();
  };

  const getSelectedData = (data: problemListType) => {
    setModalData(data);
    setModalState(true);
  };

  // modal controll
  const handleModal = () => {
    setModalState(!modalState);
  };

  useEffect(() => {
    console.log("modalData: ", modalData);
  }, [modalData]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <ManageProblemsContainer modalstate={modalState}>
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
        {modalState && (
          <div className="slideModalContent">
            <div className="slideModalTitle">
              {modalData.subjectNumber} {modalData.subjectName}
            </div>
            {/* 모달 nav바 */}
            <SlideModalNavBar modalData={modalData} />
            {/* 모달 nav바 */}
            {/* 모달 content */}
            <div className="slideModalContents">
              <div style={{ marginBottom: "0.5rem" }}>
                <span className="problem">문제</span>
              </div>
              <div>{modalData.problemDescription}</div>
            </div>
            {/* 모달 content */}
          </div>
        )}
      </div>
    </ManageProblemsContainer>
  );
};

export default ManageProblems;

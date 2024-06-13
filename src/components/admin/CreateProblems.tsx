// styles
import {
  LimitElmentInput,
  ProblemDetailInput,
} from "@/styles/admin/adminStyles";
// img
import profileImg from "@/assets/admin/casual_man.png";

const CreateProblems = () => {
  return (
    <div className="content">
      <span className="title">문제 생성</span>
      {/* 문제 입력 박스 */}
      <div className="problemSection">
        {/* 문제 입력 헤더 */}
        <div className="topSection">
          <div className="imgBg">
            <img src={profileImg} className="img" />
          </div>
          <span className="userName">사용자 이름</span>
          <div className="buttonContainer">
            <button className="inputProblem">문제 입력</button>
            <button className="testCase">테스트 케이스</button>
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
          <div className="bottomSection">
            <ProblemDetailInput
              className="problemDetailInput"
              placeholder="시간 제한"
            />
            <ProblemDetailInput
              className="problemDetailInput"
              placeholder="정답 제출 수"
            />
            <ProblemDetailInput
              className="problemDetailInput"
              placeholder="메모리 제한"
            />
            <ProblemDetailInput
              className="problemDetailInput"
              placeholder="맞힌 사람"
            />

            <ProblemDetailInput
              className="problemDetailInput"
              placeholder="제출"
            />
            <ProblemDetailInput
              className="problemDetailInput"
              placeholder="정답 비율"
            />
          </div>
        </div>
        {/* 문제 입력 컨텐츠 부분 */}
      </div>
      {/* 문제 입력 박스 */}
      <div className="problemInputSection">
        <span className="sectionTitle">문제 입력</span>
        <div className="textareaBg">
          <textarea />
        </div>
      </div>
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
          <li className="listElement">
            <LimitElmentInput />
          </li>
          <li className="listElement">
            <LimitElmentInput />
          </li>
          <li className="listElement">
            <LimitElmentInput />
          </li>
        </div>
      </div>
    </div>
  );
};

export default CreateProblems;

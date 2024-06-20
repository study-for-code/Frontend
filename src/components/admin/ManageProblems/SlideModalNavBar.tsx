// img
import AnswerRateIcon from "@/assets/admin/Percent.png";
import CorrectIcon from "@/assets/admin/check_ring_round.png";
import SubmitIcon from "@/assets/admin/File_dock.png";
import TimeLimitIcon from "@/assets/admin/Clock_fill.png";
import MemoryLimitIcon from "@/assets/admin/File_dock.png";

// types
import { problemListType } from "@/types/aboutAdmin";

// styles
import { ModifyOtherInput } from "@/styles/admin/adminStyles";
import { useContext } from "react";
import { TestCaseModalContext } from "@/pages/Admin/Admin";

interface SlideModalNavBarType {
  modalData: problemListType;
  isModify: boolean;
  inputData: (type: string, value: string | number) => void;
}

const SlideModalNavBar = ({
  modalData,
  isModify,
  inputData,
}: SlideModalNavBarType) => {
  const { timeLimit, memorySize } = modalData;
  const context = useContext(TestCaseModalContext);
  return (
    <div className="slideModalNav">
      <div className="modalRow">
        {/* 제출된 총 횟수 */}
        <div className="row">
          <img src={SubmitIcon} />
          <span>제출된 횟수</span>
        </div>
        <div className="row">
          <span>{modalData.submit}</span>
        </div>
      </div>
      <div className="modalRow">
        {/* 제출된 총 횟수중 맞은 횟수 */}
        <div className="row">
          <img src={CorrectIcon} />
          <span>맞힌 횟수</span>
        </div>
        <div className="row">
          <span>{modalData.answer}</span>
        </div>
      </div>
      <div className="modalRow">
        <div className="row">
          <img src={AnswerRateIcon} />
          <span>정답 비율</span>
        </div>
        <div className="row">
          <span>{modalData.answerRate}%</span>
        </div>
      </div>
      <div className="modalRow">
        {/* 제출된 총 횟수 */}
        <div className="row">
          <img src={TimeLimitIcon} />
          <span>시간 제한</span>
        </div>
        <div className="row">
          {isModify ? (
            <ModifyOtherInput
              ismodify={context.isModalOpen}
              name="timeLimit"
              onChange={(e) => inputData(e.target.name, e.target.value)}
              value={timeLimit}
            />
          ) : (
            <span>{modalData.timeLimit}</span>
          )}
        </div>
      </div>
      <div className="modalRow">
        {/* 제출된 총 횟수 */}
        <div className="row">
          <img src={MemoryLimitIcon} />
          <span>메모리 제한</span>
        </div>
        <div className="row">
          {isModify ? (
            <ModifyOtherInput
              ismodify={context.isModalOpen}
              name="memorySize"
              onChange={(e) => inputData(e.target.name, e.target.value)}
              value={memorySize}
            />
          ) : (
            <span>{modalData.memorySize}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlideModalNavBar;

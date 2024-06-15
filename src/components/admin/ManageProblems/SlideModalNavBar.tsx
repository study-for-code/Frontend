// img
import TagIcon from "@/assets/admin/Status_list.png";
import TimeLimitIncon from "@/assets/admin/Time_fill.png";
import MemoryLimitIcon from "@/assets/admin/Folder_fill.png";
import AnswerRateIcon from "@/assets/admin/Percent.png";

// types
import { problemListType } from "@/types/aboutAdmin";

interface SlideModalNavBarType {
  modalData: problemListType;
}

const SlideModalNavBar = ({ modalData }: SlideModalNavBarType) => {
  return (
    <div className="slideModalNav">
      <div className="modalRow">
        <div className="row">
          <img src={TagIcon} />
          <span>태그</span>
        </div>
        <div className="row">
          <span className="tag">{modalData.algorithmType}</span>
        </div>
      </div>
      <div className="modalRow">
        <div className="row">
          <img src={TimeLimitIncon} />
          <span>시간 제한</span>
        </div>
        <div className="row">
          <span>{modalData.timeLimit}ms</span>
        </div>
      </div>
      <div className="modalRow">
        <div className="row">
          <img src={MemoryLimitIcon} />
          <span>메모리 제한</span>
        </div>
        <div className="row">
          <span>{modalData.memorySize}MB</span>
        </div>
      </div>
      <div className="modalRow">
        <div className="row">
          <img src={AnswerRateIcon} />
          <span>정답 비율</span>
        </div>
        <div className="row">
          <span>{modalData.answerRate}</span>
        </div>
      </div>
    </div>
  );
};

export default SlideModalNavBar;

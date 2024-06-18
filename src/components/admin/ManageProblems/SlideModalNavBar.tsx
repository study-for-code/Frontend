// img
import TagIcon from "@/assets/admin/Status_list.png";
import AnswerRateIcon from "@/assets/admin/Percent.png";
import CorrectIcon from "@/assets/admin/check_ring_round.png";
import SubmitIcon from "@/assets/admin/File_dock.png";

// types
import { problemListType } from "@/types/aboutAdmin";

interface SlideModalNavBarType {
  modalData: problemListType;
}

const SlideModalNavBar = ({ modalData }: SlideModalNavBarType) => {
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
    </div>
  );
};

export default SlideModalNavBar;

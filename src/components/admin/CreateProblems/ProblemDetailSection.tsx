import { ProblemDetailInput } from "@/styles/admin/adminStyles";

interface problemDetailSectionType {
  inputData: (type: string, value: string) => void;
}

const ProblemDetailSection = ({ inputData }: problemDetailSectionType) => {
  return (
    <div className="bottomSection">
      <ProblemDetailInput
        className="problemDetailInput"
        placeholder="문제 이름"
        name="title"
        onChange={(e) => inputData(e.target.name, e.target.value)}
      />
      <ProblemDetailInput
        className="problemDetailInput"
        placeholder="시간 제한"
        name="timeLimit"
        onChange={(e) => inputData(e.target.name, e.target.value)}
      />
      <ProblemDetailInput
        className="problemDetailInput"
        placeholder="메모리 제한"
        name="memorySize"
        onChange={(e) => inputData(e.target.name, e.target.value)}
      />
    </div>
  );
};

export default ProblemDetailSection;

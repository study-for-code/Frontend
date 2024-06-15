interface problemDetailSectionType {
  inputData: (type: string, value: string) => void;
}

const ProblemInputSection = ({ inputData }: problemDetailSectionType) => {
  return (
    <div className="problemInputSection">
      <span className="sectionTitle">문제 입력</span>
      <div className="textareaBg">
        <textarea
          name="inputProblem"
          onChange={(e) => inputData(e.target.name, e.target.value)}
        />
      </div>
    </div>
  );
};

export default ProblemInputSection;

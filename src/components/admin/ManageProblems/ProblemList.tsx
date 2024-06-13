// types
import { problemListType } from "@/types/aboutAdmin";

interface ProblemListType {
  problemList: problemListType[];
  getSelectedData: (data: problemListType) => void;
}

const ProblemList = ({ problemList, getSelectedData }: ProblemListType) => {
  return (
    <div className="lists">
      {problemList.length > 0
        ? problemList.map((problem, i) => (
            <div
              className="listContainer"
              key={i}
              onClick={() => getSelectedData(problem)}
            >
              {/* 문제 요소 */}
              <div>
                📕
                <span style={{ marginLeft: "0.3rem" }}>
                  {problem.subjectNumber} {problem.subjectName}
                </span>
              </div>
              {/* 문제 요소 */}
              <div>
                <span className="type">{problem.algorithmType}</span>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default ProblemList;

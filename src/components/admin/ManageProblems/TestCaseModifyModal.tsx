import { useContext, useEffect, useRef } from "react";
// img
import Close from "@/assets/admin/Close_round.png";
// apis
import { TestCaseModalContext } from "@/pages/Admin/Admin";
// types
import { getTestCaseType } from "@/types/aboutAdmin";

interface TestCaseModifyModalType {
  testcaseList: getTestCaseType[];
  setTestcaseList: React.Dispatch<React.SetStateAction<getTestCaseType[]>>;
}

const TestCaseModifyModal = ({
  testcaseList,
  setTestcaseList,
}: TestCaseModifyModalType) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();

        // 부모 요소를 벗어났을 때 스크롤 조절
        if (
          containerRect.top < 0 ||
          containerRect.bottom > window.innerHeight
        ) {
          window.scrollBy(0, containerRect.top);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // testCase modal
  const modalContext = useContext(TestCaseModalContext);
  const { setIsModalOpen } = modalContext;
  // modal close
  const handleTestCaseModal = () => setIsModalOpen(false);

  // input
  const handleInputChange = (type: string, value: string, index: number) => {
    setTestcaseList((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        [type]: value,
      };
      return newData;
    });
  };

  return (
    <div className="testCaseModifyModal">
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <img
          src={Close}
          style={{ padding: "0.5rem" }}
          onClick={handleTestCaseModal}
        />
      </nav>
      <span className="testCaseTitle">테스트 케이스</span>
      {testcaseList.map((testCaseData, index) => (
        <div key={index} className="testCaseRow">
          <div className="testCaseCol">
            <span className="testCaseInput">입력</span>
            <div className="textareaBg">
              <textarea
                className="textarea"
                value={testCaseData.input}
                onChange={(e) =>
                  handleInputChange("input", e.target.value, index)
                }
              />
            </div>
          </div>
          <div className="testCaseCol">
            <span className="testCaseInput">출력</span>
            <div className="textareaBg">
              <textarea
                className="textarea"
                value={testCaseData.output}
                onChange={(e) =>
                  handleInputChange("output", e.target.value, index)
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestCaseModifyModal;

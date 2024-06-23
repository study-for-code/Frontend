import React, { useEffect, useRef } from "react";
import axios from "axios";

// styles
import { Container } from "@/styles/home/DescriptionStyles";

// atom
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  pageDataState,
  pageState,
  testDataState,
  userSectionState,
} from "@/atom/stats";

// type
import { problemListType, testCaseType } from "@/types/aboutAdmin";

const AlgorithmDescription = () => {
  // 알고리즘 문제 정보, 테스트 케이스 정보, content 섹션 페이지 정보
  const setPage = useSetRecoilState(pageState);
  const [pageData] = useRecoilState<problemListType>(pageDataState);
  const [testData, setTestData] = useRecoilState<testCaseType[]>(testDataState);

  // 문제 풀기 버튼 이동용 UserSection 상태
  const showUserSection = useRecoilValue(userSectionState);

  // 스크롤
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();

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

  // 문제 테스트 케이스 가져오기
  const getTestData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/testcases/${pageData.algorithmId}`
      );
      const data = response.data;
      setTestData(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  // 문제 풀기 버튼 클릭 시 page 변경
  const handlePage = () => {
    setPage("codeIde");
  };

  useEffect(() => {
    getTestData();
  }, [pageData]);

  return (
    <Container ref={containerRef} $showUserSection={showUserSection}>
      <nav className="title">{pageData.algorithmTitle}</nav>
      <div className="problem-details">
        <div className="infoTable">
          <div className="information">
            <div className="info-header">시간 제한</div>
            <div className="info-header">메모리 제한</div>
            <div className="info-header">제출</div>
            <div className="info-header">맞힌 사람</div>
            <div className="info-header">정답 비율</div>
          </div>
          <hr className="divider" />
          <div className="information">
            <div className="info-value">{pageData.timeLimit}ms</div>
            <div className="info-value">{pageData.memorySize}KB</div>
            <div className="info-value">{pageData.submit}</div>
            <div className="info-value">{pageData.answer}</div>
            <div className="info-value">{pageData.answerRate.toFixed(2)}%</div>
          </div>
        </div>
        <div className="content">
          <h2 className="task">문제</h2>
          <p className="description">
            {pageData.explanation &&
              (pageData.explanation.includes("\n") ? (
                pageData.explanation.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
              ) : (
                <React.Fragment>{pageData.explanation}</React.Fragment>
              ))}
          </p>
          {/* <div className="example">
            <pre>0 2 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 1 2</pre>
          </div> */}
        </div>
        <div className="content">
          <h2 className="task">제한 사항</h2>
          <ul>
            {pageData.restrictions?.map((rest, index) => (
              <li key={index}>{rest}</li>
            ))}
          </ul>
        </div>
        {testData?.map((test, index) => (
          <div className="testcase" key={index}>
            <div className="content">
              <h2 className="task">입력</h2>
              <div className="example">
                <pre>{test.input}</pre>
              </div>
            </div>
            <div className="content">
              <h2 className="task">출력</h2>
              <div className="example">
                <pre>{test.output}</pre>
              </div>
            </div>
          </div>
        ))}
        <div className="togoIDE" onClick={handlePage}>
          문제 풀기
        </div>
      </div>
    </Container>
  );
};

export default AlgorithmDescription;

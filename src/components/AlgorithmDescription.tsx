import React, { useEffect, useRef } from "react";
import axios from "axios";

// styles
import { Container } from "@/styles/home/DescriptionStyles";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { pageDataState, pageState, testDataState } from "@/atom/stats";
import { problemListType, testCaseType } from "@/types/aboutAdmin";

// algorithmId : 1
// algorithmTitle : "1-가나다"
// answer : 0
// answerRate : 0
// content : "문제입니다"
// restrictions : (3) [' 11', '22', '']
// submit : 0
// timeLimit : 1

const AlgorithmDescription = () => {
  const setPage = useSetRecoilState(pageState);
  const [pageData, setPageData] =
    useRecoilState<problemListType>(pageDataState);
  const [testData, setTestData] = useRecoilState<testCaseType[]>(testDataState);

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

  const getPageData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/algorithms/1`
      );
      const data = response.data;
      console.log("data : ", data.results[0]);
      setPageData(data.results[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const getTestData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/testcases/1`
      );
      const data = response.data;
      setTestData(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePage = () => {
    setPage("codeIde");
  };

  useEffect(() => {
    getPageData();
    getTestData();
  }, []);

  return (
    <Container ref={containerRef}>
      <nav className="title">{pageData.algorithmTitle}</nav>
      <div className="problem-details">
        <div className="infoTable">
          <div className="information">
            <div className="info-header">시간 제한</div>
            <div className="info-header">메모리 제한</div>
            <div className="info-header">제출</div>
            <div className="info-header">정답</div>
            <div className="info-header">맞힌 사람</div>
            <div className="info-header">정답 비율</div>
          </div>
          <hr className="divider" />
          <div className="information">
            <div className="info-value">{pageData.timeLimit}초</div>
            <div className="info-value">MB</div>
            <div className="info-value">{pageData.submit}</div>
            <div className="info-value"></div>
            <div className="info-value">{pageData.answer}</div>
            <div className="info-value">{pageData.answerRate}%</div>
          </div>
        </div>
        <div className="content">
          <h2 className="task">문제</h2>
          <p className="description">{pageData.content}</p>
          <div className="example">
            <pre>0 2 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 1 2</pre>
          </div>
        </div>
        <div className="restriction">
          <h2 className="task">제한 사항</h2>
          <ul>
            {pageData.restrictions.map((rest, index) => (
              <li key={index}>{rest}</li>
            ))}
          </ul>
        </div>
        {testData.map((test, index) => (
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

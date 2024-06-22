// types
import { problemListType, reviewSelectedUserType } from "@/types/aboutHome";
// styles
import { Container } from "@/styles/home/CodeReviewStyles";

// theme

// img
import GoormThinking from "@/assets/home/goormThinking.jpg";

// libraries
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import * as ace from "ace-builds";
import { useRecoilState } from "recoil";
import { testDataState } from "@/atom/stats";

// type
import { testCaseType } from "@/types/aboutAdmin";
import axios from "axios";
import { useEffect } from "react";

interface CodeReviewType {
  pageData: problemListType;
  userData: reviewSelectedUserType;
}

const CodeReview = ({ pageData, userData }: CodeReviewType) => {
  const { algorithmId } = pageData;
  const { nickname } = userData;
  // 테스트 데이터
  const [testData, setTestData] = useRecoilState<testCaseType[]>(testDataState);
  console.log("pageData: ", pageData);
  console.log("testData: ", testData);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/codes/${algorithmId}`
      );
      console.log("CodeReview: ", res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  // 동적 로드를 가능하게 하기 위해 basePath 설정
  ace.config.set(
    "basePath",
    "https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/"
  );
  return (
    <Container>
      <nav className="contentHeader">
        <div className="problemTitle">{pageData.algorithmTitle}</div>
      </nav>
      {/* header */}
      <div className="header">
        <div className="userRow">
          <img src={GoormThinking} className="profile" />
          <div className="userColumn">
            <span>{nickname}</span>
          </div>
        </div>
        <div className="problemRow">
          <span>메모리: </span>
          <div>
            <span className="data">{pageData.memorySize}</span>
            <span className="unit">MB</span>
          </div>

          <span>시간 제한: </span>
          <div>
            <span className="data">{pageData.timeLimit}</span>
            <span className="unit">ms</span>
          </div>

          <span>사용 언어: </span>
          {/* <span className="data">{pageData.language}</span> */}
        </div>
      </div>
      {/* header */}
      <div>
        <AceEditor
          mode="javascript"
          theme="monokai"
          width="70vw"
          height="70vh"
          fontSize="1.2rem"
          value={`
          /*** [section title] ***/
          // console.log('This code will be folded');
          // console.log('This code will also be folded');
          /*** [next section title] ***/
          // console.log('This code will not be folded');
              `}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
            blockComment: ["/*", "*/"],
          }}
        />
      </div>
      {/* header 부분 끝*/}
    </Container>
  );
};

export default CodeReview;

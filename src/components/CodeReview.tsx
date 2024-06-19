// types
import { TaskListData } from "@/types/aboutHome";
// styles
import { Container } from "@/styles/home/CodeReviewStyles";

// theme
import { theme } from "@/styles/common/ColorStyles";

// img
import GoormThinking from "@/assets/home/goormThinking.jpg";

// libraries
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import * as ace from "ace-builds";

interface CodeReviewType {
  pageData: TaskListData;
}

const CodeReview: React.FC<CodeReviewType> = ({ pageData }) => {
  // 동적 로드를 가능하게 하기 위해 basePath 설정
  ace.config.set(
    "basePath",
    "https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/"
  );
  return (
    <Container>
      <nav className="contentHeader">
        <div className="problemTitle">15888 치킨 배달</div>
      </nav>
      <div className="header">
        <div className="userRow">
          <img src={GoormThinking} className="profile" />
          <div className="userColumn">
            <span>유저 이름</span>
            <span
              style={{
                fontSize: "0.7rem",
                color: `${theme.CategoryFontColor}`,
              }}
            >
              {pageData.language}
            </span>
          </div>
        </div>
        <div className="problemRow">
          <span>풀이 시간: </span>
          <span className="data">{pageData.solveTime}</span>
          <span>메모리: </span>
          <div>
            <span className="data">{pageData.memorySize}</span>
            <span className="unit">MB</span>
          </div>

          <span>실행시간: </span>
          <div>
            <span className="data">{pageData.timeLimit}</span>
            <span className="unit">ms</span>
          </div>

          <span>사용 언어: </span>
          <span className="data">{pageData.language}</span>
        </div>
      </div>
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

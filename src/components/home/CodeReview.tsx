// types
import { problemListType, reviewSelectedUserType } from "@/types/aboutHome";
// styles
import { Container } from "@/styles/home/CodeReviewStyles";

// theme

// img
import GoormThinking from "@/assets/home/goormThinking.jpg";

// libraries

// type
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { codeDataType } from "@/types/aboutCodeReview";
import ChatRoom from "./CodeReview/ChatRoom";

interface CodeReviewType {
  pageData: problemListType;
  userData: reviewSelectedUserType;
}

const CodeReview = ({ pageData, userData }: CodeReviewType) => {
  // 쿠키
  const [cookies] = useCookies(["accessToken"]);
  const { accessToken } = cookies;
  const { algorithmId } = pageData;
  const { nickname, memberId } = userData;
  // 코드 데이터
  const [codeData, setCodeData] = useState<codeDataType>({
    codeId: 0,
    detail: [],
    language: "",
    codeLine: 0,
    reviewId: 0,
  });
  const { codeId, detail, language, codeLine } = codeData;

  const getData = async () => {
    try {
      const config: AxiosRequestConfig = {
        params: {
          memberId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const res = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/codes/${algorithmId}`,
        config
      );
      // console.log("CodeReview: ", res);
      const { language, detail, codeId } = res.data.results[0];
      const codeLines = detail.split("\n");
      setCodeData((prev) => ({
        ...prev,
        codeId: codeId,
        detail: codeLines,
        language: language,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  // 채팅방 생성
  const openChattingRoom = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/review/${codeId}?codeLine=${codeLine}`
      );
      console.log("openChattingRoom: ", res);
      setCodeData((prev) => ({
        ...prev,
        codeLine: res.data.results[0].reviewId,
        reviewId: res.data.results[0].codeLine,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   // console.log("code: ", codeData);
  // }, [codeData]);

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
          <span className="data">{language}</span>
        </div>
      </div>
      {/* header 부분 끝*/}
      {/* 본문 */}
      <div className="codeContainer">
        <pre>
          {detail.map((code, i) => (
            <div
              className="codeLine"
              key={i}
              onClick={() =>
                setCodeData((prev) => ({
                  ...prev,
                  codeLine: i + 1,
                }))
              }
            >
              <span className="line-number">{i + 1}</span>
              <span>{code.replace("\n", "")}</span>
            </div>
          ))}
        </pre>
      </div>
      <button onClick={openChattingRoom}>채팅방 생성</button>
      {/* http://localhost:8008로 메세지 보내기 */}
      <ChatRoom codeData={codeData} memberId={memberId} />

      {/* 본문 */}
    </Container>
  );
};

export default CodeReview;

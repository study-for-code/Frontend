import { useEffect, useState } from "react";

// types
import { problemListType, reviewSelectedUserType } from "@/types/aboutHome";
import {
  codeDataType,
  messagesEntireType,
  reviewListType,
} from "@/types/aboutCodeReview";

// styles
import { Container } from "@/styles/home/CodeReviewStyles";

// img
import GoormThinking from "@/assets/home/goormThinking.jpg";
import Plus from "@/assets/home/plus_white.png";
import ExpandDown from "@/assets/home/Expand_down_stop.png";
import ExpandRight from "@/assets/home/Expand_right_stop.png";

// components
import ChatRoom from "./CodeReview/ChatRoom";

// libraries
import { useCookies } from "react-cookie";
import axios, { AxiosRequestConfig } from "axios";
interface CodeReviewType {
  pageData: problemListType;
  userData: reviewSelectedUserType;
}

const CodeReview = ({ pageData, userData }: CodeReviewType) => {
  // 쿠키
  const [cookies] = useCookies([
    "accessToken",
    "reviewId",
    "codeLine",
    "memberId",
  ]);
  const { accessToken } = cookies;
  const { nickname, memberId } = userData;
  // console.log("memberId: ", userData);
  // console.log("algorithmId: ", pageData);
  // 토글
  const [isToggle, setIsToggle] = useState<boolean[]>([]);
  // 코드 데이터
  const [codeData, setCodeData] = useState<codeDataType>({
    codeId: 0,
    detail: [],
    language: "",
    codeLine: 0,
    reviewId: -1,
  });
  const { detail, language } = codeData;
  // 전체 메세지
  const [messages, setMessages] = useState<messagesEntireType[]>([]);

  // 전체 리뷰 데이터
  const [reviewData, setReviewData] = useState<reviewListType[]>([]);

  // 코드 아이디 가져오기
  const getCodeId = async () => {
    try {
      const config: AxiosRequestConfig = {
        params: {
          memberId: userData.memberId,
        },
      };

      const res = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/codes/${pageData.algorithmId}`,
        config
      );
      console.log("코드 아이디 get: ", res);

      if (res.data.code === 200) {
        const codeLines = res.data.results[0].detail.split("\n");
        setCodeData((prev) => ({
          ...prev,
          codeId: res.data.results[0].codeId,
          detail: codeLines,
        }));

        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_API_ADDRESS}/review/${res.data.results[0].codeId}`
        );

        console.log("리뷰 리스트 가져오기: ", response);

        if (response.data.results.length > 0) {
          const sortedReviews = response.data.results.map(
            (data: reviewListType) => data
          );
          console.log(sortedReviews);
          setReviewData(sortedReviews);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 전체 메세지 가져오기
  const getAllMessages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/messages/${codeData.codeId}/code`
      );
      console.log("getAllMessages: ", res);
      const sort = res.data.results
        .map((data: messagesEntireType) => {
          const date = new Date(data.timestamp);
          const formattedTime = date.toLocaleTimeString("ko-KR", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          });
          return { ...data, timestamp: formattedTime };
        })
        .reverse();
      setMessages(sort);
    } catch (e) {
      console.log(e);
    }
  };

  // 채팅방 생성
  const openChattingRoom = async (index: number) => {
    // 채팅방을 생성할 코드 라인 번호를 설정합니다.
    setCodeData((prev) => ({
      ...prev,
      codeLine: index + 1,
    }));

    try {
      // 채팅방 생성 요청을 보냅니다.
      const res = await axios.post(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/review/${codeData.codeId}?codeLine=${index + 1}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("openChattingRoom: ", res);
      // 채팅방 생성에 성공하면 해당 정보를 업데이트합니다.
      if (res.data.code === 409) {
        reviewData.filter((review) => {
          if (review.codeLine === index + 1) {
            setCodeData((prev) => ({
              ...prev,
              codeLine: index + 1,
              reviewId: index + 1,
            }));
          }
        });
      } else {
        setCodeData((prev) => ({
          ...prev,
          codeLine: res.data.results[0].codeLine,
          reviewId: res.data.results[0].reviewId,
        }));
      }

      // 해당 라인의 채팅방 토글 상태를 변경합니다.
      setIsToggle((prev) => {
        const newToggle = [...prev];
        newToggle[index] = !newToggle[index];
        return newToggle;
      });

      // 모든 메시지를 가져옵니다.
      await getAllMessages();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("codeData: ", codeData);
    console.log("채팅:", messages);
    console.log("reviewData:", reviewData);
  }, [codeData, messages]);

  useEffect(() => {
    getCodeId();
  }, []);

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
          {detail.length > 0 &&
            detail.map((code, i: number) => (
              <div key={i}>
                <div className="codeLine">
                  <img
                    src={
                      reviewData.some((review) => review.codeLine === i + 1)
                        ? isToggle[i]
                          ? ExpandDown
                          : ExpandRight
                        : Plus
                    }
                    width={20}
                    height={20}
                    onClick={() => openChattingRoom(i)}
                  />
                  <span className="line-number">{i + 1}</span>
                  <span>{code.replace("\n", "")}</span>
                </div>

                {isToggle[i] && (
                  <ChatRoom
                    codeData={codeData}
                    memberId={memberId}
                    messages={messages}
                    setMessages={setMessages}
                    getAllMessages={getAllMessages}
                  />
                )}
              </div>
            ))}
        </pre>
      </div>
      {/* http://localhost:8008로 메세지 보내기 */}

      {/* 본문 */}
    </Container>
  );
};

export default CodeReview;

import { useEffect, useRef, useState } from "react";

// libraries
import SockJS from "sockjs-client";
import Stomp, { Client } from "stompjs";
import { useCookies } from "react-cookie";
// types
import {
  codeDataType,
  messagesEntireType,
  reviewListType,
} from "@/types/aboutCodeReview";

//img
import Profile from "@/assets/home/goormThinking.jpg";
import axios from "axios";
interface ChatRoomProps {
  codeData: codeDataType;
  memberId: number;
  messages: messagesEntireType[];
  setMessages: React.Dispatch<React.SetStateAction<messagesEntireType[]>>;
  getAllMessages: () => Promise<void>;
  review: reviewListType;
  refreshAllMessage: () => Promise<void>;
  reviewData: reviewListType[];
}

const ChatRoom = ({
  codeData,
  memberId,
  messages,
  getAllMessages,
  review,
  refreshAllMessage,
}: ChatRoomProps) => {
  // 채팅창 컨트롤
  const chatRef = useRef<HTMLInputElement>(null);

  // 쿠키
  const [cookies] = useCookies([
    "accessToken",
    "nickname",
    "reviewId",
    "codeLine",
  ]);
  const { nickname } = cookies;
  const { reviewId, codeId, codeLine } = codeData;
  console.log("review ChatRoom: ", review);
  // stompjs
  const [stompClient, setStompClient] = useState<Client | null>(null);
  // 유저 입력 메세지
  const [content, setContent] = useState<string>("");

  const [createReviewId, setCreateReviewId] = useState<number>(review.reviewId);

  useEffect(() => {
    // 웹 소켓 연결
    const socket = new SockJS(`${import.meta.env.VITE_WEBSOCKET_ADDRESS}`);
    const client = Stomp.over(socket);

    client.connect({}, () => {
      setStompClient(client);

      // 메시지 구독
      client.subscribe(`/topic/${createReviewId}`, (messageOutput) => {
        const message = JSON.parse(messageOutput.body);
        console.log("Subscribe: ", message);
        refreshAllMessage();
      });
    });

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (stompClient !== null) {
        stompClient.disconnect(() => {
          console.log("Disconnected from STOMP broker.");
        }, {});
      }
    };
  }, []);

  useEffect(() => {
    getAllMessages();
  }, []);

  //메세지 보내기
  const sendMessage = () => {
    if (stompClient !== null && content.trim() !== "") {
      stompClient.send(
        "/client/sendMessage",
        {},
        JSON.stringify({
          memberId,
          codeId,
          reviewId: review.reviewId,
          nickname,
          content,
        })
      );

      setContent("");
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat_room">
      <div className="chat_messages">
        {messages.length > 0 ? (
          messages.map((message: messagesEntireType, index) => {
            if (createReviewId === message.reviewId) {
              return (
                <div key={index} className="chat_message">
                  <div className="chat_message_container">
                    <img src={Profile} width={25} height={25} />
                    <div>
                      <div className="profile_container">
                        <span className="user">{message.nickname}</span>
                        <span className="timestamp">{message.timestamp}</span>
                      </div>
                      {message.content}
                    </div>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div></div>
        )}
      </div>
      <input
        ref={chatRef}
        className="chat"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
    </div>
  );
};

export default ChatRoom;

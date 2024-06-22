import { useEffect, useRef, useState } from "react";

// libraries
import SockJS from "sockjs-client";
import Stomp, { Client } from "stompjs";
import { useCookies } from "react-cookie";
import axios from "axios";
// types
import { codeDataType, messagesEntireType } from "@/types/aboutCodeReview";

//img
import Profile from "@/assets/home/goormThinking.jpg";
interface ChatRoomProps {
  codeData: codeDataType;
  memberId: number;
}

const ChatRoom = ({ codeData, memberId }: ChatRoomProps) => {
  // 채팅창 컨트롤
  const chatRef = useRef<HTMLInputElement>(null);

  // 쿠키
  const [cookies] = useCookies(["nickname"]);
  const { nickname } = cookies;
  const { reviewId, codeId } = codeData;
  // stompjs
  const [stompClient, setStompClient] = useState<Client | null>(null);
  // 전체 메세지
  const [messages, setMessages] = useState<messagesEntireType[]>([]);
  // 유저 입력 메세지
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const socket = new SockJS("http://localhost:8008/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      console.log("is Connected!");
      setStompClient(client);

      // 메시지 구독
      client.subscribe(`/topic/${reviewId}`, (messageOutput) => {
        const message = JSON.parse(messageOutput.body);
        console.log("Received: ", message);

        getReviews();
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

  // 전체 메세지 가져오기
  const getReviews = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCAL_API_ADDRESS}/messages/${reviewId}/review`
      );
      console.log("getReviews: ", res.data.results);
      const sort = res.data.results.map((data: messagesEntireType) => {
        const date = new Date(data.timestamp);
        const formattedTime = date.toLocaleTimeString("ko-KR", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
        return { ...data, timestamp: formattedTime };
      });
      const reverse = sort.reverse();
      setMessages(reverse);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getReviews();
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
          reviewId,
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
        {messages.map((message: messagesEntireType, index) => (
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
        ))}
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

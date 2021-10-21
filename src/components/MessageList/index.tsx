import { useState, useEffect } from "react";

import { api } from "../../services/api";
import io from "socket.io-client";

import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";

interface MessageData {
  id: string;
  text: string;
  user: {
    avatar_url: string;
    name: string;
  };
}

const messagesQueue: MessageData[] = [];

const socket = io("http://localhost:4000");
socket.on("new_message", (newMessage) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevState) =>
          [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );

        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    api.get<MessageData[]>("messages/last3").then((response) => {
      setMessages(response.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map((item) => {
          return (
            <li className={styles.message} key={item.id}>
              <p className={styles.messageContent}>{item.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={item.user.avatar_url} alt={item.user.name} />
                </div>
                <span>{item.user.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

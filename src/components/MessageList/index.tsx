import { useState, useEffect } from "react";

import { api } from "../../services/api";

import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";

interface IMessageData {
  id: string;
  text: string;
  user: {
    avatar_url: string;
    name: string;
  };
}

export function MessageList() {
  const [messages, setMessages] = useState<IMessageData[]>([]);

  useEffect(() => {
    api.get<IMessageData[]>("messages/last3").then((response) => {
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

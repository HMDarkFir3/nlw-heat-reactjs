import { useState, FormEvent } from "react";

import { useAuth } from "../../hooks/useAuth";

import { api } from "../../services/api";

import styles from "./styles.module.scss";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";

export function SendMessageForm() {
  const [message, setMessage] = useState("");

  const { signOut, user } = useAuth();

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    await api.post("/messages", { message }).then(() => {
      setMessage("");
    });
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size={32} />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>

        <strong className={styles.userName}>{user?.name}</strong>

        <span className={styles.userGithub}>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form className={styles.sendMessageForm} onSubmit={handleSendMessage}>
        <label htmlFor="message">Mensagem</label>

        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
}

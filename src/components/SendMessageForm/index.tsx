import { useAuth } from "../../hooks/useAuth";

import styles from "./styles.module.scss";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";

export function SendMessageForm() {
  const { signOut, user } = useAuth();

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={() => signOut()}>
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

      <form className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>

        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento"
        />

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
}

import React from "react";
import { auth, provider } from "../../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./Auth.module.css";
import { useTranslation } from "react-i18next";

export default function Auth() {
  const [user, loading] = useAuthState(auth);
  const { t } = useTranslation();

  const handleLogin = () => {
    provider.setCustomParameters({ prompt: 'select_account' });
    signInWithPopup(auth, provider);
  };

  if (loading) return <div className={styles.container}>{t('loading') || 'Загрузка...'}</div>;
  return (
    <div className={styles.container}>
      {user ? (
        <>
          {user.photoURL && (
            <img src={user.photoURL} alt="avatar" className={styles.avatar} />
          )}
          <span className={styles.username}>{user.displayName}</span>
          <button className={styles.button} onClick={() => signOut(auth)}>
            {t('auth_sign_out')}
          </button>
        </>
      ) : (
        <button className={styles.button} onClick={handleLogin}>
          {t('auth_sign_in_google')}
        </button>
      )}
    </div>
  );
}



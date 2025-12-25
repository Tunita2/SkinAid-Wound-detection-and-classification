// src/components/profile/Settings.tsx
import { useState } from "react";

import styles from "../../pages/ProfilePage.module.css";
import { FaShieldAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ChangePasswordModal from "../auth/ChangePasswordModal";

const Settings = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.settingsWrapper}>
      <div className={styles.settingsCard}>
        <div className={styles.cardHeader} style={{ marginTop: "1.5rem" }}>
          <h3>
            <FaShieldAlt className={styles.cardHeaderIcon} />
            <span>{t("settings.security_title")}</span>
          </h3>
        </div>

        {/* Item 4: Change Password */}
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <h4>{t("settings.password_title")}</h4>
            <p>{t("settings.password_desc")}</p>
          </div>
          <button
            className={styles.languageSelect}
            onClick={() => setIsModalOpen(true)}
          >
            {t("settings.password_button")}
          </button>
        </div>
      </div>
      {/* --- RENDER MODAL --- */}
      {isModalOpen && (
        <ChangePasswordModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Settings;

import { useState } from "react";
import { motion } from "framer-motion";
import { FiHome, FiSearch, FiPlusCircle, FiHeart, FiUser } from "react-icons/fi";
import styles from './userFooter.module.css';

const UserFooter = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const icons = [
    { icon: <FiHome size={22} />, key: "Home" },
    { icon: <FiSearch size={22} />, key: "Event" },
    { icon: <FiPlusCircle size={24} />, key: "Gallery" },
    { icon: <FiHeart size={22} />, key: "Bookings" },
    { icon: <FiUser size={22} />, key: "Profile" },
  ];

  return (
    <motion.div
      className={styles.footerWrapper}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <motion.div
        className={styles.footer}
        whileInView={{ boxShadow: "0 4px 24px hsla(0, 0.00%, 0.00%, 0.12)" }}
        initial={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)" }}
      >
        {icons.map(({ icon, key }) => (
          <motion.button
            key={key}
            className={`${styles.footerIcon} ${activeTab === key ? styles.active : ""}`}
            onClick={() => setActiveTab(key)}
            whileTap={{
              scale: 0.85,
              y: activeTab === key ? 0 : 4,
            }}
            whileHover={{ scale: 1.05 }}
            animate={
              activeTab === key
                ? {
                  y: [0, -6, 2, 0],
                  scale: [1, 1.1, 0.97, 1],
                  transition: { duration: 0.5, ease: "easeInOut" },
                }
                : {}
            }
          >
            <div className={styles.iconContent}>
              {icon}
              <span>{key}</span>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default UserFooter;
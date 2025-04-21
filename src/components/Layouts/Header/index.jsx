import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBell, FiMenu, FiX, FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { FaReact } from "react-icons/fa";
import styles from './Header.module.css';
import Logo from '/assets/kv-logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { icon: <FiHome size={18} />, label: "Home", key: "home" },
    { icon: <FiUser size={18} />, label: "Profile", key: "profile" },
    { icon: <FiSettings size={18} />, label: "Settings", key: "settings" },
    { icon: <FiLogOut size={18} />, label: "SignOut", key: "signOut" },
  ];

  return (
    <>
      <motion.header
        className={styles.mobileHeader}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className={styles.logo}>
          <img src={Logo} alt="logo" size={10} style={{
            width: '50px',
            height: '50px',
            marginBottom: '0px',
          }} color="#61DBFB" />
        </div>
        <div className={styles.headerIcons}>
          <motion.button
            className={styles.iconButton}
            whileTap={{ scale: 0.9 }}
          >
            <FiBell size={20} />
          </motion.button>
          <motion.button
            className={styles.iconButton}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.menuOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          >
            <motion.div
              className={styles.menuContainer}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.menuHeader}>
                <div className={styles.menuLogo}>
                  <FaReact size={24} color="#61DBFB" />
                  <span>React App</span>
                </div>
                <motion.button
                  className={styles.closeButton}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMenu}
                >
                  <FiX size={24} />
                </motion.button>
              </div>
              <div className={styles.menuItems}>
                {menuItems.map((item) => (
                  <motion.div
                    key={item.key}
                    className={styles.menuItem}
                    whileHover={{ backgroundColor: "#f5f5f5" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={styles.menuItemIcon}>{item.icon}</div>
                    <div className={styles.menuItemLabel}>{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
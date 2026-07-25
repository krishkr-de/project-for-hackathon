import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
    filter: "blur(10px)",
  },

  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },

  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    filter: "blur(10px)",
  },
};

const pageTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
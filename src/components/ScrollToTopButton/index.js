import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <></>
    // <AnimatePresence>
    //   {show && (
    //     <motion.button
    //       onClick={scrollToTop}
    //       initial={{ opacity: 0, y: 40, scale: 0.8 }}
    //       animate={{ opacity: 1, y: 0, scale: 1 }}
    //       exit={{ opacity: 0, y: 40, scale: 0.8 }}
    //       transition={{ duration: 0.3 }}
    //       whileHover={{ scale: 1.1 }}
    //       whileTap={{ scale: 0.95 }}
    //       className="fixed bottom-6 right-6 z-50
    //                  bg-[#ED553B]
    //                  text-white
    //                  p-3
    //                  rounded-full
    //                  shadow-lg
    //                  hover:bg-[#d9432b]
    //                  transition"
    //     >
    //       <ArrowUp size={20} />
    //     </motion.button>
    //   )}
    // </AnimatePresence>
  );
};

export default ScrollToTopButton;

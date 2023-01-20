import { motion } from 'framer-motion';

const AnimatedLi = (props) => {
  const liVariants = {
    hover: {
      scale: 1.1,
    },
    pressed: {
      scale: 0.9,
    },
    rest: {
      scale: 1,
    }
  };

  return (
    <motion.li      
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
      variants={liVariants}
      className={`p-4 ${props.className}`}
      onClick={props.onClick}
    >
      {props.text}
    </motion.li>
  );
};
export default AnimatedLi
import { motion } from 'framer-motion';

const AnimatedButton = (props) => {
  const buttonVariants = {
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
    <motion.button
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
      variants={buttonVariants}
      className={`text-xl text-cC ${props.className}`}
      onClick={props.onClick}
    >
      {props.text}
    </motion.button>
  );
};
export default AnimatedButton
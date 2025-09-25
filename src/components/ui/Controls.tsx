"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  visible: boolean;
  onDrawAgainAction: () => void;
};

// Soft "douce grøn" (gentle gray-green) background
const DOUCE_GREEN_BG = "oklch(0.86 0.06 160)";

export default function Controls({ visible, onDrawAgainAction }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="mt-0 flex items-center justify-center"
        >
          <motion.button
            type="button"
            onClick={onDrawAgainAction}
            // Same vibe as "Tryk for at trække" (pill, shadow, ring, attention pulse)
            className="px-5 py-2.5 rounded-full text-black shadow-lg ring-1 ring-white/20 select-none"
            style={{ backgroundColor: DOUCE_GREEN_BG }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.985 }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop" }}
          >
            Træk igen
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

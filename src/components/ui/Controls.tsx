"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  visible: boolean;
  onDrawAgainAction: () => void;
  onShareAction: () => void;
};

export default function Controls({ visible, onDrawAgainAction, onShareAction }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="mt-6 flex items-center justify-center gap-3"
        >
          <button
            onClick={onDrawAgainAction}
            className="rounded-lg bg-primary text-primary-foreground px-4 py-2 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-ring"
          >
            Træk igen
          </button>
          <button
            onClick={onShareAction}
            className="rounded-lg border border-border px-4 py-2 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-ring"
          >
            Del
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

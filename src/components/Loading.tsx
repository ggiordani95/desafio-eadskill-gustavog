"use client";

import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
      <motion.h2
        className="mt-4 text-lg font-semibold text-gray-700"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Carregando...
      </motion.h2>
    </div>
  );
}

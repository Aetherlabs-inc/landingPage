import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <div className="flex items-center justify-center w-full min-h-[90vh]">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center"
            >
                <div className="w-10 h-10 border-t-2 border-black dark:border-white rounded-full animate-spin"></div>

                <p className="text-gray-500 mt-4">Please wait while we load the content</p>
            </motion.div>
        </div >
    );
};

export default LoadingScreen;

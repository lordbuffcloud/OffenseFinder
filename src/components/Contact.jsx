import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { Oval } from 'react-loader-spinner';
import { AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [sirenAudio, setSirenAudio] = useState(null);

  const playSiren = () => {
    if (sirenAudio) {
      sirenAudio.play();
      setTimeout(() => {
        sirenAudio.pause();
        sirenAudio.currentTime = 0;
      }, 3000);
    }
  };

  const chatRef = useRef(null);
  const formRef = useRef();
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audio = new Audio("/siren.wav");
    setSirenAudio(audio);
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleSendText = () => {
    const smsUrl = 'sms:937-619-9137';
    window.location.href = smsUrl;
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-secondary p-8 rounded-2xl'
      >
        <p className={styles.heroSubText}>Offense Finder</p>
        <h3 className={styles.sectionHeadText}>Welcome to OffenseFinder, an AI chatbot designed to to help identify potential criminal offenses based on the facts provided. My knowledge covers the Uniform Code of Military Justice 🌟, state laws 🏛️, federal statutes 🇺🇸, and Air Force regulations🔬. Please DO NOT enter any PII or CUI.</h3>

        <AnimatePresence>
          {chatHistory.map((chat, index) => (
            <motion.div key={index} initial="hidden" animate="visible">
              <div className="flex flex-col bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-blue-500">User</div>
                  <p className="text-gray-700 text-base">{chat.user}</p>
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-red-500">Charges</div>
                  <ul className="text-gray-700 text-base">
                    {chat.bot.split('•').map((charge, index) => {
                      if (charge.trim() !== '') {
                        return <li key={index}>{charge.trim()}</li>
                      }
                      return null;
                    })}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={chatRef} />
        </AnimatePresence>

        <button
          onClick={handleSendText}
          className='bg-secondary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
        >
          Send Text
        </button>

        {errorMessage && (
          <p className="text-red-500 mt-4">{errorMessage}</p>
        )}
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(ChatBot, "ChatBot");


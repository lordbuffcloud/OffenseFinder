import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const ChatBot = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    OffenderActions: "",
  });
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const prompt = "Based on the laws applicable to the Ohio Revised Code, Uniform code of Military Justice, United States Code, and the WRIGHT PATTERSON AIR FORCE BASE INSTRUCTION 31-218, provide the laws, regulations or violations of an offense or subject actions. Provide the applicable references to the laws, codes and regulations and provide the recommended charges based on if they were a civilian or military member, and if the charges if they were in exclusive or concurrent jurisdiction. The actions of the offender are : ";
  
  const handleInputChange = (event) => {
    setForm({OffenderActions: event.target.value});
  };
  
  const handleChatSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const combinedInput = `${prompt} ${form.OffenderActions}`;
    const response = await query({ question: combinedInput });
    setChatHistory([...chatHistory, { user: form.OffenderActions, bot: response }]);
    setForm({OffenderActions: ""});
    setIsLoading(false);
  };

  const query = async (data) => {
    const response = await fetch(
      "http://localhost:3000/api/v1/prediction/720a83bb-be53-4d3b-a7a3-32f880249457",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const result = await response.json();
    return result;
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div 
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-secondary p-8 rounded-2xl'
      >
        <p className={styles.heroSubText}>Offense Finder</p>
        <h3 className={styles.sectionHeadText}>Charge Assistant: Please enter the actions of the suspect/subject below and I will generate possible charges based on the current UCMJ, ORC, USC, and WPAFB Instruction 31-218.</h3>
        
        <div className="mt-4 w-full max-w-md">
          {chatHistory.map((chat, index) => (
            <motion.div key={index} className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-blue-500">User</div>
                <p className="text-gray-700 text-base">{chat.user}</p>
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-red-500">Charges</div>
                <p className="text-gray-700 text-base">{chat.bot}</p>
              </div>
            </motion.div>
          ))}
        
          <form
            ref={formRef}
            onSubmit={handleChatSubmit}
            className='mt-12 flex flex-col gap-8'
          >
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Enter Offense(s)</span>
              <input
                type='text'
                name='name'
                value={form.OffenderActions}
                onChange={handleInputChange}
                placeholder="stole a car"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white-100 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            <button
              type='submit'
              className='bg-secondary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
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

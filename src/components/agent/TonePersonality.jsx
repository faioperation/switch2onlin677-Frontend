import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateTone } from "../../api/agentApi";

const tones = [
  {
    id: "friendly",
    title: "Friendly & Warm",
    desc: "Conversational and welcoming",
  },
  {
    id: "professional",
    title: "Professional",
    desc: "Formal and business-like",
  },
  {
    id: "sales",
    title: "Sales-Oriented",
    desc: "Persuasive and promotional",
  },
];

const TonePersonality = () => {

  const [selected, setSelected] = useState("friendly");

  const mutation = useMutation({
    mutationFn: updateTone,
    onSuccess: () => {
      alert("Tone updated successfully!");
    },
  });

  const handleSelect = (tone) => {
    setSelected(tone);
    mutation.mutate(tone);
  };

  return (

    <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-6">

      <h3 className="text-white text-lg font-medium mb-4">
        Tone & Personality
      </h3>

      <p className="text-sm text-gray-400 mb-4">
        Communication Style
      </p>

      <div className="space-y-3">

        {tones.map((tone) => (

          <div
            key={tone.id}
            onClick={()=>handleSelect(tone.id)}
            className={`p-4 rounded-lg border cursor-pointer transition mt-4
            ${
              selected === tone.id
                ? "border-green-500 bg-[#1f2a23]"
                : "border-[#2A2A2A]"
            }`}
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-white text-sm font-medium">
                  {tone.title}
                </p>

                <p className="text-xs text-gray-400">
                  {tone.desc}
                </p>

              </div>

              <div
                className={`w-4 h-4 rounded-full border
                ${
                  selected === tone.id
                    ? "bg-green-500 border-green-500"
                    : "border-gray-500"
                }`}
              />

            </div>

          </div>

        ))}

      </div>

      <button
        className="btn-primary  md:mt-12"
      >
        Save Scripts
      </button>

    </div>

  );
};

export default TonePersonality;
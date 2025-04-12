import { useState, useEffect } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { SEND_MESSAGE, MESSAGE_SENT } from "../graphql/subscriptions/operations";
import { MessageConversationProps } from "../types";
import { IoMdSend } from "react-icons/io";


export default function MessageConversation({messages: initialMessages,currentUserId,chatPerfil,conversationId,}: MessageConversationProps & { conversationId: string }) {
  
  const [messages, setMessages] = useState(initialMessages);
  const [content, setContent] = useState("");

  const { data: subData } = useSubscription(MESSAGE_SENT, {
    variables: { conversationId },
  });

  useEffect(() => {
    if (subData?.messageSent) {
      setMessages((msgs) => [...msgs, subData.messageSent]);
    }
  }, [subData]);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (err) => console.error(err),
    });

 
  const handleSend = () => {
    if (!content.trim()) return;
    sendMessage({
      variables: {
        conversationId,
        sender_id: currentUserId,
        content,
      },
    });
    setContent("");
  };

  return (
    <div className="flex flex-col w-full  h-full px-12 mt-[120px] space-y-4 overflow-y-auto">
      <div
        className="fixed flex items-center w-full pb-4 bg-black border-b border-gray-700 top-4"
      >
        <img
          src={chatPerfil?.imageUrl}
          className="object-cover w-12 h-12 mr-4 rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-bold">{chatPerfil?.username}</h3>
        </div>
      </div>

      <div className="w-full ">
        {messages.map((message) => {
          const isSent = message.sender_id === currentUserId;
          return (
            <div
              key={message.id}
              className={`flex ${isSent ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg md:max-w-xs max-w-[200px] text-sm md:text-base break-words ${
                  isSent ? "bg-[#fe7541] text-white" : "bg-gray-700 text-white"
                }`}
              >
                <p>{message.content}</p>
                <span className="block mt-1 text-xs text-right text-gray-300">
                  {new Date(message.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 flex items-center w-screen pb-4 bg-black border-b border-gray-700 ">
        <input
          type="text"
          value={content}
          placeholder="Escribe un mensaje..."
          onChange={(e) => setContent(e.target.value)}
          className="w-[68%] px-4 py-2 text-white bg-gray-700 rounded-xl"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-[#fe7541] ml-2 rounded-xl"
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
}

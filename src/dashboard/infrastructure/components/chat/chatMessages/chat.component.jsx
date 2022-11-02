import React from "react";
import { ChatMessage, StackMessages } from "./chatMessages.component";
import { useComments } from "../../../hooks/useComments";

export const Chat = ({ getAllCommentsUseCase, commentsStore }) => {
  const [comments] = useComments({ getAllCommentsUseCase, commentsStore });

  return (
    <StackMessages data={comments} ariaLabel="chat-list">
      {(messageData) => <ChatMessage messageData={messageData}></ChatMessage>}
    </StackMessages>
  );
};

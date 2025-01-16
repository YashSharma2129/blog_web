import { useState, useCallback } from 'react';

export const useComments = () => {
  const [comments, setComments] = useState([]);

  // Add new comment
  const addComment = useCallback((text) => {
    const newComment = {
      id: Date.now(),
      text,
      replies: []
    };
    setComments(prev => [...prev, newComment]);
  }, []);

  // Add reply to comment
  const addReply = useCallback((parentId, replyText) => {
    const addReplyToComment = (comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), {
            id: Date.now(),
            text: replyText,
            replies: []
          }]
        };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => addReplyToComment(reply))
        };
      }
      return comment;
    };

    setComments(prev => prev.map(comment => addReplyToComment(comment)));
  }, []);

  return {
    comments,
    addComment,
    addReply
  };
};

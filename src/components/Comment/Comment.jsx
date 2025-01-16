import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, ChevronDown, ChevronUp, User, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Comment = ({ comment, onAddReply, depth = 0 }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      onAddReply(comment.id, replyText);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  const maxDepth = 3;
  const hasReplies = comment.replies?.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "relative",
        depth > 0 && "ml-4 pl-4 border-l-2 border-l-muted",
      )}
    >
      <div className="bg-card rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="h-4 w-4 text-primary" />
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Anonymous</span>
              <span className="text-muted-foreground text-xs flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date().toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm text-foreground/90">{comment.text}</p>

            <div className="flex items-center gap-2">
              {depth < maxDepth && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplyInput(!showReplyInput)}
                  className="h-8 px-2 text-xs"
                >
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              )}

              {hasReplies && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-8 px-2 text-xs"
                >
                  {isExpanded ? (
                    <ChevronUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ChevronDown className="h-3 w-3 mr-1" />
                  )}
                  {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showReplyInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 px-4"
          >
            <div className="flex gap-2">
              <Input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 text-sm h-9"
              />
              <Button size="sm" onClick={handleSubmitReply} className="h-9">
                Reply
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && comment.replies?.map((reply) => (
          <motion.div
            key={reply.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-2"
          >
            <Comment
              comment={reply}
              onAddReply={onAddReply}
              depth={depth + 1}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onAddReply: PropTypes.func.isRequired,
  depth: PropTypes.number,
};

export default Comment;
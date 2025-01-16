import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Share2, MessageCircle, Clock, User, ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Comment from '../Comment/Comment';
import ShareDialog from '../ShareDialog/ShareDialog';

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    liked: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 }
    }
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        text: commentText,
        replies: []
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  const handleAddReply = (parentId, replyText) => {
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

    setComments(comments.map(comment => addReplyToComment(comment)));
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      exit="exit"
      variants={variants}
      whileHover={{ y: -2 }}
      className="transform-gpu"
    >
      <Card className="mb-4 hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <CardHeader className="space-y-2 group">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>User {post.userId}</span>
            </div>
          </div>
          <CardDescription className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <motion.p 
            className="text-gray-600 mb-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {post.body}
          </motion.p>

          <motion.div 
            className="flex gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              animate={liked ? "liked" : ""}
            >
              <Button
                variant={liked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="flex items-center gap-1 relative overflow-hidden group"
              >
                <Heart 
                  className={`h-4 w-4 transition-all duration-300 ${
                    liked ? 'fill-current text-red-500 scale-110' : 'group-hover:scale-110'
                  }`}
                />
                <span className="relative z-10">
                  {liked ? 'Liked' : 'Like'}
                </span>
                {likeCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full px-1.5 min-w-[20px] text-center"
                  >
                    {likeCount}
                  </motion.span>
                )}
              </Button>
            </motion.button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowShareDialog(true)}
              className="flex items-center gap-1"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1"
            >
              <MessageCircle className="h-4 w-4" />
              Comments ({comments.length})
            </Button>
          </motion.div>

          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden mt-4"
              >
                <div className="flex gap-2 mb-4">
                  <Input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1"
                  />
                  <Button onClick={handleAddComment}>
                    Comment
                  </Button>
                </div>

                {comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    onAddReply={handleAddReply}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <ShareDialog
            open={showShareDialog}
            onOpenChange={setShowShareDialog}
            postTitle={post.title}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Post;
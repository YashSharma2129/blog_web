import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCcw } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";
import { usePosts } from '@/hooks/usePosts';
import Post from '../Post/Post';
import CreatePostDialog from '../CreatePostDialog/CreatePostDialog';

const Posts = () => {
    const { posts, loading, error, hasMore, fetchPosts, createPost } = usePosts();
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const { ref, inView } = useInView();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    useEffect(() => {
        if (inView && hasMore && !loading) {
            fetchPosts();
        }
    }, [inView, hasMore, loading, fetchPosts]);

    const handleCreatePost = async (postData) => {
        const success = await createPost(postData);
        if (success) {
            setShowCreateDialog(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-6 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 rounded-lg shadow-sm"
            >
                <h1 className="text-3xl font-bold">Posts</h1>
                <div className="flex gap-2">
                    <Button 
                        onClick={fetchPosts} 
                        disabled={loading}
                        variant="outline"
                        className="group"
                    >
                        <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-300'}`} />
                        Refresh
                    </Button>
                    <Button
                        onClick={() => setShowCreateDialog(true)}
                        variant="default"
                        className="flex items-center gap-1 hover:scale-105 transition-transform"
                    >
                        <Plus className="h-4 w-4" />
                        Create Post
                    </Button>
                </div>
            </motion.div>

            {error && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-destructive/15 text-destructive p-4 rounded-lg mb-4 flex items-center justify-between"
                >
                    <span>{error}</span>
                    <Button variant="outline" size="sm" onClick={fetchPosts}>
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Retry
                    </Button>
                </motion.div>
            )}

            <AnimatePresence mode="popLayout">
                <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                >
                    {posts.map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Post post={post} />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {loading && (
                <div className="space-y-4 mt-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="p-4 rounded-lg border">
                            <Skeleton className="h-6 w-2/3 mb-4" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>
                    ))}
                </div>
            )}

            <div ref={ref} className="h-10" />
            <CreatePostDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
                onCreatePost={handleCreatePost}
                loading={loading}
            />
        </div>
    );
};

export default Posts;
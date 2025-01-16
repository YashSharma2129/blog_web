import { useState, useCallback } from 'react';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch posts with pagination
  const fetchPosts = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setPosts(prev => [...prev, ...data]);
      setPage(prev => prev + 1);
      setError(null);
    } catch (error) {
      setError(`Failed to fetch posts: ${error.message}`);
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  // Create new post
  const createPost = async (postData) => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...postData, userId: 1 }),
      });
      const data = await response.json();
      setPosts([{ ...data, id: Date.now() }, ...posts]);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    error,
    hasMore,
    fetchPosts,
    createPost
  };
};

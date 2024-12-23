import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Track the current page for pagination
  const [loading, setLoading] = useState(false); // To handle loading state

  const getPosts = async () => {
    if (loading) return; // Prevent multiple simultaneous fetches
    setLoading(true); // Set loading state while fetching data

    try {
      const response = await fetch(`${SummaryApi.getPosts.url}?page=${page}`, {
        method: SummaryApi.getPosts.method,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('This is posts to show on home page:', data.data);
      
      // Append new posts to the existing ones
      setPosts(prevPosts => [...prevPosts, ...data.data]);
      setPage(prevPage => prevPage + 1); // Move to the next page for future fetches
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false); // Reset loading state after fetching
    }
  };

  useEffect(() => {
    getPosts(); // Fetch the first batch of posts when the component mounts
  }, []);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop; // How far the user has scrolled
    const windowHeight = window.innerHeight; // Height of the visible window
    const fullHeight = document.documentElement.offsetHeight; // Total height of the document
    
    // Check if the user is near the bottom
    if (windowHeight + scrollTop >= fullHeight - 100) {
      console.log("Reached the bottom! Load more content.");
      getPosts(); // Trigger action to fetch next set of posts
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
  }, []);

  return (
    <div className="flex justify-center scrollbar-none bg-gray-100">
      <div className="w-full lg:w-[50%] p-4">
        <div className="space-y-4">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <Link to={`/question/${post._id}`}>
                <h2 className="text-lg font-semibold">{post.post}</h2>
                {post.image && (
                  <div className="w-full flex items-center justify-center">
                    <img src={post.image} alt="Post image" className="w-24 h-auto rounded-lg" />
                  </div> 
                )}
                <p className="text-gray-700">{post.description}</p>
                <span className="text-sm text-gray-500">
                  Posted on: {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown date'}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

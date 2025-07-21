import React, { useEffect, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPosts } from "../store/postsSlice";
import NewsCard from "./NewsCard";

const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error, hasMore, skip } = useAppSelector(
    (state: any) => state.posts,
  );
  const [loadingMore, setLoadingMore] = useState(false);

  const loadPosts = useCallback(async () => {
    if (hasMore && !loading && !loadingMore) {
      setLoadingMore(true);
      setTimeout(async () => {
        await dispatch(fetchPosts(skip));
        setLoadingMore(false);
      }, 1000);
    }
  }, [dispatch, hasMore, loading, skip, loadingMore]);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts(0));
    }
  }, [dispatch, posts.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadPosts]);

  if (error && posts.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div style={{ color: "#000" }}>Error: {error}</div>
        <button
          onClick={() => dispatch(fetchPosts(0))}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            border: "1px solid #000",
            backgroundColor: "#fff",
            color: "#000",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#000", marginBottom: "30px" }}>
        News Feed
      </h1>

      {posts.map((post: any) => (
        <NewsCard key={post.id} post={post} />
      ))}

      {(loading || loadingMore) && (
        <div style={{ textAlign: "center", padding: "20px", color: "#000" }}>
          Loading...
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div style={{ textAlign: "center", color: "#000", padding: "20px" }}>
          All news loaded
        </div>
      )}

      {hasMore && posts.length > 0 && !loading && !loadingMore && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <button
            onClick={loadPosts}
            style={{
              padding: "10px 20px",
              border: "1px solid #000",
              backgroundColor: "#fff",
              color: "#000",
              cursor: "pointer",
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList;

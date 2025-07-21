import React from "react";
import { Post } from "../store/postsSlice";

interface NewsCardProps {
  post: Post;
}

const NewsCard: React.FC<NewsCardProps> = ({ post }) => {
  const truncateText = (text: string) => {
    const words = text.split(" ");
    if (words.length <= 30) {
      return text;
    }
    return words.slice(0, 30).join(" ") + "...";
  };

  return (
    <div
      style={{
        border: "1px solid #000",
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: "#fff",
      }}
    >
      <h3
        style={{
          margin: "0 0 8px 0",
          fontSize: "18px",
          color: "#000",
        }}
      >
        {post.title}
      </h3>

      <p
        style={{
          margin: "0 0 12px 0",
          color: "#000",
          lineHeight: "1.5",
        }}
      >
        {truncateText(post.body)}
      </p>

      <div style={{ marginBottom: "8px" }}>
        {post.tags.map((tag) => (
          <span
            key={tag}
            style={{
              border: "1px solid #000",
              padding: "2px 8px",
              marginRight: "4px",
              fontSize: "12px",
              color: "#000",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        style={{
          fontSize: "14px",
          color: "#000",
        }}
      >
        Likes: {post.reactions.likes} | Dislikes: {post.reactions.dislikes}
      </div>
    </div>
  );
};

export default NewsCard;

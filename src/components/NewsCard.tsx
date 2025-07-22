import React from "react";
import { Typography, Space } from "antd";
import { Post } from "../store/postsSlice";

const { Title, Paragraph, Text } = Typography;

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
      <Title
        level={4}
        style={{
          margin: "0 0 8px 0",
          color: "#000",
        }}
      >
        {post.title}
      </Title>

      <Paragraph
        style={{
          margin: "0 0 12px 0",
          color: "#000",
          lineHeight: "1.5",
        }}
      >
        {truncateText(post.body)}
      </Paragraph>

      <Space wrap style={{ marginBottom: "8px" }}>
        {post.tags.map((tag) => (
          <Text
            key={tag}
            code
            style={{
              padding: "2px 8px",
              fontSize: "12px",
              color: "#000",
              backgroundColor: "#fff",
            }}
          >
            {tag}
          </Text>
        ))}
      </Space>

      <div>
        <Text
          style={{
            fontSize: "14px",
            color: "#000",
          }}
        >
          Likes: {post.reactions.likes} | Dislikes: {post.reactions.dislikes}
        </Text>
      </div>
    </div>
  );
};

export default NewsCard;

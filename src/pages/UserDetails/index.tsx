import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

interface IUser {
  id: number;
  avatar: string;
  name: string;
}

interface IPost {
  user_id: number;
  id: number;
  img_url: string;
  description: string;
}

const UserDetails: React.FC = () => {
  const { id } = useParams();
  const { data: user } = useFetch<IUser>(`users/${id}`);
  const { data: posts } = useFetch<IPost[]>("posts");

  if (!user || !posts) {
    return <p>Carregando...</p>;
  }

  return (
    <ul>
      <li>ID: {user.id}</li>
      <li>Name: {user.name}</li>
      {posts.map(
        (post) =>
          post.user_id === user.id && (
            <li>
              <img src={post.img_url} alt="post-img" width={200} />
              <p>{post.description}</p>
            </li>
          )
      )}
    </ul>
  );
};

export default UserDetails;

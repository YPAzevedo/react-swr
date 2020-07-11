import React, { useCallback, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { mutate as mutateGlobal, cache } from "swr";

import { GrEdit, GrLike, GrSend } from "react-icons/gr";
import { useFetch } from "../../../../hooks/useFetch";
import api from "../../../../services/api";

import {
  PostItem,
  PostHeader,
  ActionButtons,
  Caption,
  CaptionEdit,
} from "./styles";

interface IUser {
  id: number;
  avatar: string;
  name: string;
}

interface IPost {
  user_id: number;
  id: number;
  img_url: string;
  likes: number;
  description: string;
}

const Post: React.FC<{ post: IPost }> = ({ post }) => {
  const [isEditing, setEditing] = useState(false);
  const [descriptionText, setDescriptionText] = useState(post.description);
  const { data: user } = useFetch<IUser>(`/users/${post.user_id}`);
  const posts: IPost[] = cache.get('posts');

  const handleEditPost = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const updatedPost: IPost = { ...post, description: descriptionText }
      api.put(`posts/${post.id}`, updatedPost);
      // mutates the cached data for the useFetch on this component
      // meaning the users lsit
      // mutate(updatedUsers, false)
      setEditing(false);
      // this mutates the call for other calls that you specify
      // meaning this call will mutate the cached data for users/:id call  specified.
      const newPosts = posts.map(post => post.id === updatedPost.id ? updatedPost : post)
      // mutated the global chache of the posts call so theres no need to refetch for the updated version.
      mutateGlobal('posts', newPosts)
      mutateGlobal(`posts/${post.id}`, updatedPost);
    },
    [descriptionText, post, posts]
  );

  const hadleLikePost = useCallback(() => {
      const updatedPost: IPost = { ...post, likes: post.likes+1 }
      api.put(`posts/${post.id}`, updatedPost);
      // this mutates the call for other calls that you specify
      // meaning this call will mutate the cached data for users/:id call  specified.
      const newPosts = posts.map(post => post.id === updatedPost.id ? updatedPost : post)
      // mutated the global chache of the posts call so theres no need to refetch for the updated version.
      mutateGlobal('posts', newPosts)
      mutateGlobal(`posts/${post.id}`, updatedPost);
    },
    [post, posts]
  );

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <PostItem key={user.id}>
      <PostHeader>
        <Link to={`/users/${user.id}`}>
          <img src={user.avatar} alt="user-avatar" />
          <span>{user.name}</span>
        </Link>
      </PostHeader>
      <img src={post.img_url} alt="random-unsplash" width={400} />
      <ActionButtons>
        <button type="button" onClick={hadleLikePost}>
          <GrLike />
          <strong>{post.likes}</strong>
        </button>
        <button type="button" onClick={() => setEditing(!isEditing)}>
          <GrEdit />
        </button>
      </ActionButtons>
      <Caption>
        {isEditing ? (
          <CaptionEdit onSubmit={handleEditPost}>
            <textarea
              name="description"
              value={descriptionText}
              onChange={(e) => setDescriptionText(e.target.value)}
            />
            <button type="submit">
              <GrSend />
            </button>
          </CaptionEdit>
        ) : (
          <p>{post.description}</p>
        )}
      </Caption>
    </PostItem>
  );
};

export default Post;

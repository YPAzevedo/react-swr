import React from 'react';
import { useFetch } from '../../hooks/useFetch';

import Post from './components/Post'

interface IPost {
  user_id: number;
  id: number,
  img_url: string,
  likes: number,
  description: string;
}

const FeedList: React.FC = () => {
  const { data: posts } = useFetch<IPost[]>('posts');

  if (!posts) {
    return <p>Carregando...</p>
  }

  return (
    <ul>
      {posts.map(post => (
        <Post post={post} />
      ))}
    </ul>
  );
}

export default FeedList;
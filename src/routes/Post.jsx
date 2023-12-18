import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogFetch from '../axios/config.js';

import './Home.css';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(0)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await blogFetch.get(`/posts/${id}`);

        if (response.status >= 200 && response.status < 300) {
          setStatus(response.status);
          setPost(response.data);
        } else {
          
          throw new Error(`Erro ao buscar o post - Status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className='post'>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      {status >= 200 && status < 300 ? <Link to="/" className='btn'>Voltar</Link> : <p>Carregando...</p>}
    </div>
  );
};

export default Post;

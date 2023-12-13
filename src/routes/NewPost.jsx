import React from "react";
import blogFetch from "../axios/config";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./NewPost.css";

const NewPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [titleError, setTitleError] = useState();
  const [bodyError, setBodyError] = useState();

  const createPost = async (e) => {
    e.preventDefault();

    const title = formData.title;
    const body = formData.body;

    if (!title) {
      setTitleError("Campo obrigatório!");
      return;
    }
    if (!body) {
      setBodyError("Campo obrigatório!");
      return;
    }

    setTitleError("");
    setBodyError("");

    

    const post = { title, body, userId: 1 };

    await blogFetch.post("/posts", {
      body: post,
    });

    navigate("/");
  };
  const handleData = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    console.log(formData);
  };

  return (
    <div className="new-post">
      <h2>Inserir um novo post</h2>
      <form onSubmit={(e) => createPost(e)}>
        <div className="form-control">
          <label htmlFor="title">Título: </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o título"
            onChange={(e) => {
              handleData(e);
              setTitleError("");
            }}
          />
          {titleError && <span className="error-message">{titleError}</span>}
        </div>
        <div className="form-control">
          <label htmlFor="body">Conteúdo: </label>
          <textarea
            name="body"
            id="body"
            placeholder="Digite o conteúdo"
            onChange={(e) => {
              handleData(e);
              setBodyError("");
            }}
          ></textarea>
          {bodyError && <span className="error-message">{bodyError}</span>}
        </div>
        <input type="submit" value="Criar Post" className="btn" />
      </form>
    </div>
  );
};

export default NewPost;

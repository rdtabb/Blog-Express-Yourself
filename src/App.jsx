// Hooks and router:
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom'
// Static components:
import Header from "./components/fixed/Header";
import Nav from "./components/fixed/Nav";
import Footer from "./components/fixed/Footer";
// Routed components:
import Missing from "./components/routed/Missing";
import About from "./components/routed/About";
import PostPage from "./components/routed/PostPage";
import NewPost from "./components/routed/NewPost";
import EditPost from "./components/routed/EditPost";
import Home from "./components/routed/Home";
// Date formatting
import { format } from 'date-fns'
import api from './api/posts'

const App = () => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
      } catch (err) {
        if (err.response) {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(`Error: ${err.message}`)
        }
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    const filteredResults = posts.filter((post) => 
    ((post.title).toLowerCase()).includes(search.toLowerCase())
    || ((post.body).toLowerCase()).includes(search.toLowerCase())
    )
    setSearchResult(filteredResults.reverse())
  }, [posts, search])

  const setAndNavigate = (items) => {
    setPosts(items)
    localStorage.setItem("posts", JSON.stringify(items))
    navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const post = {
      id,
      title: `${postTitle}`,
      datetime: `${format(new Date(), 'MMMM dd, yyyy pp')}`,
      body: `${postBody}`
    }
    try {
      const reponse = await api.post('/posts', post)
      const newPosts = [...posts, reponse.data]
      setPostBody('')
      setPostTitle('')
      setAndNavigate(newPosts)
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const newList = posts.filter(post => 
        post.id != id
      )
      setAndNavigate(newList)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleEdit = async (id) => {
    const updatedPost = {
      id,
      title: `${editTitle}`,
      datetime: `${format(new Date(), 'MMMM dd, yyyy pp')}`,
      body: `${editBody}`
    }
    try {
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map(post => 
        post.id === id ? {...response.data } : post
      ))
      setEditTitle('')
      setEditBody('')
      navigate('/')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  const handleToggle = (e) => {
    const button = document.querySelector('.header__toggle')
    const navigation = document.querySelector('.nav__list')
    const visibility = button.getAttribute('aria-expanded')
    if (visibility === 'true') {
      button.setAttribute('aria-expanded', 'false')
      navigation.setAttribute('aria-expanded', 'false')
    } else {
      button.setAttribute('aria-expanded', 'true')
      navigation.setAttribute('aria-expanded', 'true')
    }
  }

  return (
    <>
      <div className="container">
        <Header 
          handleToggle={handleToggle}
        />
        <Nav
          search={search}
          setSearch={setSearch}
        />
        <Routes>
          <Route path="/" element={<Home 
            posts={searchResult}
          />} />
          <Route path="/post" element={<NewPost
            handleSubmit={handleSubmit}
            setPostTitle={setPostTitle}
            setPostBody={setPostBody}
            postTitle={postTitle}
            postBody={postBody}
          />} />
          <Route path="/edit/:id" element={<EditPost
            handleEdit={handleEdit}
            posts={posts}
            setEditTitle={setEditTitle}
            setEditBody={setEditBody}
            editTitle={editTitle}
            editBody={editBody}
          />} />
          <Route path="/post/:id" element={<PostPage
            handleDelete={handleDelete}
            posts={posts}
          />} />
          <Route path="/about" element={<About/>}/>
          <Route path="*" element={<Missing/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

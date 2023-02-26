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

const App = () => {
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("posts")) || [])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate()

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const post = {
      id,
      title: `${postTitle}`,
      datetime: `${format(new Date(), 'MMMM dd, yyyy pp')}`,
      body: `${postBody}`
    }
    const newPostsList = [...posts, post]
    setAndNavigate(newPostsList)
  }

  const handleDelete = (id) => {
    const newList = posts.filter(post => 
      post.id != id
    )
    setAndNavigate(newList)
  }

  const handleEdit = (id) => {
    const updatedPost = {
      id,
      title: `${editTitle}`,
      datetime: `${format(new Date(), 'MMMM dd, yyyy pp')}`,
      body: `${editBody}`
    }
    setPosts(posts.map(post => 
      post.id === id ? {...updatedPost } : post
    ))
    setEditTitle('')
    setEditBody('')
    navigate('/')
  }

  const handleToggle = (e) => {
    const button = document.querySelector(".header__toggle");
    const navigation = document.querySelector(".nav__list");
    const visibility = button.getAttribute("aria-expanded");
    if (visibility === "true") {
      button.setAttribute("aria-expanded", "false");
      navigation.setAttribute("aria-expanded", "false");
    } else {
      button.setAttribute("aria-expanded", "true");
      navigation.setAttribute("aria-expanded", "true");
    }
  };

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

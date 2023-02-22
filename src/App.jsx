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
import Home from "./components/routed/Home";
import { format } from 'date-fns'

const App = () => {
  // const [posts, setPosts] = useState([
  //   {
  //     id: 1,
  //     title: "My First Post",
  //     datetime: "July 01, 2021 11:17:36 AM",
  //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
  //   },
  //   {
  //     id: 2,
  //     title: "My 2nd Post",
  //     datetime: "July 01, 2021 11:17:36 AM",
  //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
  //   },
  //   {
  //     id: 3,
  //     title: "My 3rd Post",
  //     datetime: "July 01, 2021 11:17:36 AM",
  //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
  //   },
  //   {
  //     id: 4,
  //     title: "My Fourth Post",
  //     datetime: "July 01, 2021 11:17:36 AM",
  //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
  //   }
  // ])
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setPosts(JSON.parse(localStorage.getItem("posts")))
  }, [])

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
    console.log(post)
    const newPosts = [...posts, post]
    setAndNavigate(newPosts)
  }

  const handleDelete = (id) => {
    const newList = posts.filter(post => 
      post.id != id
    )
    setAndNavigate(newList)
  }

  return (
    <>
      <div className="container">
        <Header />
        <Nav
          search={search}
          setSearch={setSearch}
        />
        <Routes>
          <Route path="/" element={<Home 
            posts={posts.filter((post) => ((post.title).toLowerCase())
              .includes(search.toLowerCase())
            )} 
          />} />
          <Route path="/post" element={<NewPost
            handleSubmit={handleSubmit}
            setPostTitle={setPostTitle}
            setPostBody={setPostBody}
            postTitle={postTitle}
            postBody={postBody}
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

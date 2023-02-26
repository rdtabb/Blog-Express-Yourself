import Feed from "./homeInner/Feed"

const Home = ({ posts }) => {
  return (
    <main className="home">
        {posts.length ? (
          <Feed posts={posts} />
        ) : (
          <p className="home__empty">Your feed is empty! Go to the New Post page to create the new Post!</p>
        )}
    </main>
  )
}

export default Home

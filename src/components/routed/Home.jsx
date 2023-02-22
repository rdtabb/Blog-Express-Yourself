import Feed from "./homeInner/Feed"

const Home = ({ posts }) => {
  return (
    <main className="home">
        {posts.length ? (
          <Feed posts={posts} />
        ) : (
          <p>Your feed is empty</p>
        )}
    </main>
  )
}

export default Home

import { useParams, Link } from "react-router-dom"

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams()
  const post = posts
    .find(post => 
      (post.id).toString() === id
      )

  return (
    <main className="post-page">
        <article className="post">
          {post &&
            <div className="item">
              <div className="item__heading">
                <h2 className="item__header post__title">{post.title}</h2>
                <p className="item__date post__date">{post.datetime}</p>
              </div>
              <p className="post__body">{post.body}</p>
              <button 
                onClick={() => handleDelete([post.id])} 
                className="post__delete"
              >Delete</button>
            </div>
          }
          {!post &&
            <>
              <h2 className="item__title">
                Post is either deleted or it doesn't exist
              </h2>
              <p>
                <Link to='/'>Visit homepage</Link>
              </p>
            </>
          }
        </article>
    </main>
  )
}

export default PostPage

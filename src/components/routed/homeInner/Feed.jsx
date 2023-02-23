import { Link } from "react-router-dom"

const Feed = ({posts}) => {
  return (
    <ul className="feed">
        {posts.map((post) => (
            <li className="item" key={post.id}>
                <Link className="feed__link" to={`/post/${post.id}`}>
                    <div className="item__heading">
                        <h2 className="item__header">{post.title}</h2>
                        <p className="item__date">{post.datetime}</p>
                        <img src="../../../public/icon-edit.png" alt="" />
                    </div>
                </Link>
                <p>{post.body}</p>
            </li>
        ))}
    </ul>
  )
}

export default Feed

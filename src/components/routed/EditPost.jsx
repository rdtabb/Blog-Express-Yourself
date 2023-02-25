import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({
  posts,
  handleEdit,
  editBody,
  setEditBody,
  editTitle,
  setEditTitle,
}) => {
    const { id } = useParams()
    const post = posts.find(post => (post.id).toString() === id)

    useEffect(() => {
        if (post) {
            setEditBody(post.body)
            setEditTitle(post.title)
        }
    }, [post, setEditBody, setEditTitle])

    return (
        <main className="new-post">
            {editTitle && 
                <div className="item">
                    <h2 className="new-post__heading">Edit post</h2>
                    <form onSubmit={(e) => e.preventDefault()} className="new-post__form">
                        <label className="title-label" htmlFor="new-post__title">Title</label>
                        <input 
                            required 
                            id="new-post__title" 
                            className="new-post__title"
                            placeholder="Set your title" 
                            type="text" 
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label className="body-label" htmlFor="new-post__body">Post</label>
                        <textarea 
                            id="new-post__body"
                            className="new-post__body edit-post__body"
                            placeholder="Text of your post"
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button 
                            className="new-post__submit" 
                            type="submit"
                            onClick={() => handleEdit(post.id)}
                        >
                                Submit new post
                        </button>
                    </form>
                </div>
            }
            {!editTitle &&
                <>
                <h2 className="item__title">
                    Post is either deleted or it doesn't exist
                </h2>
                <p>
                    <Link to='/'>Visit homepage</Link>
                </p>
                </>
            }
        </main>
    );
};

export default EditPost;

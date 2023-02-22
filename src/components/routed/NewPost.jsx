const NewPost = ({ 
  postBody, postTitle, setPostBody, setPostTitle, handleSubmit 
}) => {
  return (
    <main className="new-post">
        <div className="item">
          <h2 className="new-post__heading">Create new post</h2>
            <form onSubmit={handleSubmit} className="new-post__form">
              <label className="title-label" htmlFor="new-post__title">Title</label>
              <input 
                required 
                id="new-post__title" 
                className="new-post__title"
                placeholder="Set your title" 
                type="text" 
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
              <label className="body-label" htmlFor="new-post__body">Post</label>
              <input 
                type="textarea" 
                id="new-post__body"
                className="new-post__body"
                placeholder="Text of your post"
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
              />
              <button className="new-post__submit" type="submit">Submit new post</button>
            </form>
        </div>
    </main>
  )
}

export default NewPost

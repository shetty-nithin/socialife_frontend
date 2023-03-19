import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
    //temp data
    const posts = [
        {
            id: 1,
            name: "nithin shetty",
            userId: 1,
            profilePhoto: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 2,
            name: "nithin shetty",
            userId: 2,
            profilePhoto: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 3,
            name: "nithin shetty",
            userId: 3,
            profilePhoto: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 4,
            name: "nithin shetty",
            userId: 4,
            profilePhoto: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 5,
            name: "nithin shetty",
            userId: 5,
            profilePhoto: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 6,
            name: "nithin shetty",
            userId: 6,
            profilePhoto: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
    ]
    return(
        <div className="posts">
            {posts.map(post => (
                <Post post={post} key={post.id}/>
            ))}
        </div>
    )
}

export default Posts;
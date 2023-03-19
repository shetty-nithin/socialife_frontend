import { useContext } from "react";
import "./stories.scss";
import {AuthContext} from "../../context/authContext"

const Stories = () => {

    const {currentUser} = useContext(AuthContext);
    // temp data
    const stories = [
        {
            id: 8,
            name: "nithin shetty",
            img: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 7,
            name: "nithin shetty",
            img: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 1,
            name: "nithin shetty",
            img: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 2,
            name: "nithin shetty",
            img: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 3,
            name: "nithin shetty",
            img: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 4,
            name: "nithin shetty",
            img: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 5,
            name: "nithin shetty",
            img: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
    ]
    return(
        <div className="stories">
            <div className="story">
                <img src={currentUser.profilePhoto} alt="" />
                <span>{currentUser.name}</span>
                <button>+</button>
            </div>
            {stories.map(story => (
                <div className="story" key={story.id}>
                    <img src={story.img} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    )
}

export default Stories;
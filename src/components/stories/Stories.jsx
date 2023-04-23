import { useContext } from "react";
import "./stories.scss";
import {AuthContext} from "../../context/authContext"

const Stories = () => {

    const {currentUser} = useContext(AuthContext);
    // temp data
    const stories = [
        {
            id: 8,
            name: "",
            img: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 7,
            name: "",
            img: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 1,
            name: "",
            img: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 2,
            name: "",
            img: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 3,
            name: "",
            img: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 4,
            name: "",
            img: "https://images.pexels.com/photos/3314294/pexels-photo-3314294.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            id: 5,
            name: "",
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
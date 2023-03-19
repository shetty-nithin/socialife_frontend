import Posts from "../../components/posts/Posts"
import Stories from "../../components/stories/Stories"
import "./homePage.scss"

const HomePage = () => {
    return (
        <div className="homePage">
            <Stories/>
            <Posts/>
        </div>
    )
}

export default HomePage
import Posts from "../../components/posts/Posts";
import Stories from "../../components/stories/Stories";
import Share from "../../components/share/Share";
import "./homePage.scss"

const HomePage = () => {
    return (
        <div className="homePage">
            <Stories/>
            <Share/>
            <Posts/>
        </div>
    )
}

export default HomePage
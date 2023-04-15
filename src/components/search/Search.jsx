import { makeRequest } from "../../axios";
import "./search.scss";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Search = ({ searchInput }) => {
    const {isLoading, error, data} = useQuery({
        queryKey: [searchInput],
        queryFn: () => makeRequest.get("/users?name="+searchInput.searchInput, {withCredentials: true})
        .then((res) => {
            return res.data;
        })
    });

    return (
        <div className="searchList">
            {error 
                ?   "Something went wrong!"
                :   isLoading
                        ?   "loading..."
                        :   (data.length === 0)
                            ?   "No Result"
                            :   data.map(user => (
                                    <Link key={user.id} to={`profile/${user.id}`} style={{textDecoration:"none"}}>
                                        <div className="searchUser">
                                            <img src={"/upload/"+user.profilePhoto} alt="" />
                                            <span>{user.name}</span>
                                        </div>
                                    </Link>
                                ))
            }
        </div>
    )
}

export default Search;
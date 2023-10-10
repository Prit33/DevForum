import { BiEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from 'axios'
import { URL } from "../url"

function Comment({ c, post }) {
    const { user } = useContext(UserContext)

    const deleteComment = async (id) => {
        try {
            await axios.delete(URL + '/api/comments/' + id,{withCredentials:true})
                .then((res) => {
                    console.log('comment deleted')
                })
            window.location.reload(true)

        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-600">@{c.author}</h3>
                <div className="flex justify-center items-center space-x-4">
                    <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
                    <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>

                    {/* {user?._id === post?.userId ?
                        <div className="flex items-center justify-center space-x-2">
                            <p className="cursor-pointer" onClick={() => deleteComment(c._id)}><MdDelete /></p>
                        </div>
                        : ""} */}
                    {c.author === user.username || user._id === c.userId ? <p className="cursor-pointer" onClick={() => deleteComment(c._id)}><MdDelete /></p> : ""}
                </div>
            </div>
            <p className="px-4 mt-2">{c.comment}</p>
        </div>
    )
}

export default Comment
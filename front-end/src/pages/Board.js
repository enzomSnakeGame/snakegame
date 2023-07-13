import BoardComponent from "../components/BoardComponent.js"

export default function BoardPage({socket}){
    return(
        <>
            <BoardComponent socket = {socket}/>
        </>
    )
}
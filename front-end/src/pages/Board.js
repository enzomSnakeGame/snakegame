import BoardComponent from "../components/BoardComponent.js"
import PageNotFound from "../components/PageNotFound.js"

export default function BoardPage({socket}){
    if(sessionStorage.length == 0){
        return (
            <PageNotFound />
        )
    }else{
        return(
            <>             
            <BoardComponent socket = {socket}/>
            </>
        )
    }
}

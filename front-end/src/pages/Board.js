import BoardComponent from "../components/BoardComponent.js"
import PageNotFound from "../components/PageNotFound.js"

export default function BoardPage(){
    if(sessionStorage.length == 0){
        return (
            <PageNotFound />
        )
    }else{
        return(
            <>             
            <BoardComponent/>
            </>
        )
    }
}
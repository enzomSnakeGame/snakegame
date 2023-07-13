import HomeComponent from  "../components/HomeComponent.js"
import PageNotFound from "../components/PageNotFound.js"

export default function HomePage(){
    if(sessionStorage.length == 0){
        return (
            <PageNotFound />
        )
    }else{
        return(
            <>             
                <HomeComponent/>
            </>
        )
    }
    
}
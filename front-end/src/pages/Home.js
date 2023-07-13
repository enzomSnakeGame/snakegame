import HomeComponent from  "../components/HomeComponent.js"
import PageNotFound from "../components/PageNotFound.js"

import '../Styles/home.css'
// Import the CSS file


export default function HomePage({socket}){
    if(sessionStorage.length == 0){
        return (
            <PageNotFound />
        )
    }else{
        return(
            <>             
                <HomeComponent socket = {socket}/>
            </>
        )
    }
}
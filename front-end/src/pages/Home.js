import HomeComponent from  "../components/HomeComponent.js"

export default function HomePage({socket}){
    return(
        <>             <HomeComponent socket = {socket}/>
        </>
    )
}
import Navbar from "../components/NavBar.js"
import HomeComponent from  "../components/HomeComponent.js"

export default function HomePage(){
    return(
        <>             
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <header>
                <Navbar/>
            </header>
            <HomeComponent/>
        </div>
        </>
    )
}
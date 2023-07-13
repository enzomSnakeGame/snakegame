import Header from "../components/Header"
import LoginComponent from "../components/LoginComponent.js"

export default function LoginPage(){
    return(
        <>
        <div>
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'white' }}>
                <div className="max-w-md w-full space-y-8">
                    <Header
                        heading="Login to your account"
                        paragraph="Don't have an account yet? "
                        linkName="Signup"
                        linkUrl="/signup"
                        />
                    <LoginComponent/>
                </div>
            </div>
        </div>
        </>
    )
}
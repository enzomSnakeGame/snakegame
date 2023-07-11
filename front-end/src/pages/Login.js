import Header from "../components/Header"
import LoginComponent from "../components/LoginComponent.js"

export default function LoginPage(){
    return(
        <>
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <LoginComponent/>
        </>
    )
}
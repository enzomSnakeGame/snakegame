import Header from "../components/Header";
import SignupComponent from "../components/SignupComponent";

export default function SignupPage(){
    return(
        <>
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <SignupComponent/>
        </>
    )
}
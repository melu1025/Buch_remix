import { Heading } from "@chakra-ui/react";
import LoginComponent from "~/component/auth/login";

export default function Login() {
    return (
      <div>
        <Heading>Login</Heading>
        <main>
          <LoginComponent/>
        </main>
      </div>
    );
  }

//  export function links() {
//    return [{ rel: 'stylesheet', href: newCreateStyle}];
//  }
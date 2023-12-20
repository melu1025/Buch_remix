import { Heading } from "@chakra-ui/react";
import Login from "~/component/auth/login";

export default function Create() {
    return (
      <div>
        <Heading>Login</Heading>
        <main>
          <Login/>
        </main>
      </div>
    );
  }

//  export function links() {
//    return [{ rel: 'stylesheet', href: newCreateStyle}];
//  }
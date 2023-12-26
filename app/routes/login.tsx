
import LoginComponent from "~/component/auth/login";
import HorizontalBar from "~/component/bar";
import barstyle from'~/component/bar.css';
import '~/component/auth/login.css';

export default function Login() {
    return (
      <div>
        <HorizontalBar title={'Login'} subtitle={'Melde dich bitte an'}></HorizontalBar>
        <main>
          <LoginComponent/>
        </main>
      </div>
    );
  }

 export function links() {
    return [{ rel: 'stylesheet', href: barstyle}];
 }
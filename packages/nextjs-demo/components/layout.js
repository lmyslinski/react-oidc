import { OidcProvider } from '@axa-fr/react-oidc';
import { useRouter } from 'next/router'

const configuration = {
  client_id: '452838147726-ja27ntbpa0o38r8stmsqaiohasaog1bg.apps.googleusercontent.com',
  redirect_uri: 'https://react-oidc-token-error.vercel.app/#authentication/callback',
  scope: 'openid profile email',
  authority: 'https://accounts.google.com/'
};

const onEvent=(configurationName, eventName, data )=>{
    console.log(`oidc:${configurationName}:${eventName}`, data);
  }

export default function Layout({ children }) {
    const router = useRouter()
    const withCustomHistory= () => {
        return {
            replaceState: (url) => {
                router.replace({
                    pathname: url,
                }).then(() => {
                        window.dispatchEvent(new Event('popstate'));
                    }
                )
            }
        };
    };
  return (
    <>
    <OidcProvider configuration={configuration} onEvent={onEvent} withCustomHistory={withCustomHistory} >
      <main>{children}</main>
      </OidcProvider>
    </>
  )
}
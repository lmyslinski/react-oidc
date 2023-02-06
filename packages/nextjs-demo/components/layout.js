import { OidcProvider } from '@axa-fr/react-oidc';
import { useRouter } from 'next/router'

const configuration = {
  client_id: '452838147726-avih7dhh8ss319agjodp09embk95ojif.apps.googleusercontent.com',
  redirect_uri: 'https://react-oidc-token-error.vercel.app/authentication/callback',
  scope: 'openid profile email',
  authority: 'https://accounts.google.com/'
};

export const configurationJumpcloud = {
  client_id: "b04e9bc0-2f43-4777-9bd6-ddf8636e7ac5",
  redirect_uri: "https://react-oidc-token-error.vercel.app/authentication/callback",
  scope: "openid offline offline_access",
  authority: "https://oauth.id.jumpcloud.com/",
  authority_configuration: {
    authorization_endpoint: "https://oauth.id.jumpcloud.com/oauth2/auth",
    token_endpoint: "https://oauth.id.jumpcloud.com/oauth2/token",
    userinfo_endpoint: "https://oauth.id.jumpcloud.com/userinfo",
    end_session_endpoint:
      "https://oauth.id.jumpcloud.com/oauth2/sessions/logout",
    revocation_endpoint:
      "https://oauth.id.jumpcloud.com/oauth2/sessions/revocation",
    check_session_iframe:
      "https://oauth.id.jumpcloud.com/oauth2/sessions/checksession",
    issuer: "https://oauth.id.jumpcloud.com/",
  },
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
    <OidcProvider configuration={configurationJumpcloud} onEvent={onEvent} withCustomHistory={withCustomHistory} >
      <main>{children}</main>
      </OidcProvider>
    </>
  )
}
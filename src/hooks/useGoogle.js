import { useEffect } from 'react';
import { loadGapiInsideDOM, loadClientAuth2 } from 'gapi-script';
import { API_KEY } from '~utils/getSecrets';

export default function useGoogle() {
  const clientId = 'TODO:';
  const scopes = 'TODO:';
  const discoveryUrl = 'TODO: your discoveryUrl here';

  useEffect(() => {
    const loadGapi = async () => {
      await loadGapiInsideDOM();
    };
    loadGapi();
  }, []);

  const f = () => {
    const SCOPE = 'TODO: your scope here';
    const handleClientLoad = () =>
      window.gapi.load('gapiclient:auth2', initClient);

    const initClient = () => {
      const discoveryUrl = 'TODO: your discoveryUrl here';
      window.gapi.client.init({
        clientId: 'TODO: your client id here',
        discoveryDocs: [discoveryUrl],
        scope: SCOPE,
      });
      console.log('Google loaded');
    };

    const script = document.createElement('script');

    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = handleClientLoad;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  };
}

import { useEffect } from 'react';
import { loadGapiInsideDOM } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { API_KEY } from '~utils/getSecrets';
import { setGapi } from '~redux/googleSlice';

export default function useGoogle() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadGapi = async () => {
      const newGapi = await loadGapiInsideDOM();
      dispatch(setGapi(newGapi));
    };
    loadGapi();
  }, [dispatch]);

  // useEffect(() => {
  //   const SCOPE = 'TODO: your scope here';
  //   const handleClientLoad = () =>
  //     window.gapi.load('gapiclient:auth2', initClient);

  //   const initClient = () => {
  //     const discoveryUrl = 'TODO: your discoveryUrl here';
  //     window.gapi.client.init({
  //       clientId: 'TODO: your client id here',
  //       discoveryDocs: [discoveryUrl],
  //       scope: SCOPE,
  //     });
  //     console.log('Google loaded');
  //   };

  //   const script = document.createElement('script');

  //   script.src = 'https://apis.google.com/js/api.js';
  //   script.async = true;
  //   script.defer = true;
  //   script.onload = handleClientLoad;

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
}

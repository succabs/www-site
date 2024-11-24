import { getCookie, type CookieConsentConfig } from 'vanilla-cookieconsent';

document.documentElement.classList.add('cc--darkmode');

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    gtag: (...args: any[]) => void;
  }
}

export const config: CookieConsentConfig = {
  onFirstConsent: () => {
    logConsent();
},
onChange: () => {
    logConsent();
    console.log(getCookie());

},
  guiOptions: {
    consentModal: {
      layout: 'box inline',
      position: 'bottom left',
    },
    preferencesModal: {
      layout: 'box',
      position: 'right',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    functionality: {},
    analytics: {
      enabled: true,
      services: {
        ga: {
          label: 'Google Analytics',
          onAccept: () => {
            // Grant consent to the Google Analytics service
            console.log('ga4 granted');

            window.gtag('consent', 'update', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              analytics_storage: 'granted',
            });
          },
          onReject: () => {
            // Don't enable Google Analytics
            console.log('ga4 rejected');
          },
          cookies: [
            {
              name: /^_ga/,
            },
          ],
        },
      },
    },
  },
  language: {
    default: 'en',
    autoDetect: 'browser',
    translations: {
      en: {
        consentModal: {
          title: "Hello traveller, it's cookie time!",
          description:
          'We use cookies to enhance your browsing experience and to analyze our traffic. By clicking the "Accept all" button, you consent to our use of cookies.', 
         acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Manage preferences',
          footer:
            '<a href="#link">Privacy Policy</a>\n<a href="#link">Terms and conditions</a>',
            
        },
        preferencesModal: {
          title: 'Consent Preferences Center',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close modal',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Cookie Usage',
              description:
              'We use cookies to enhance your browsing experience and to analyze our traffic. You can change your preferences here.', 
            },
            {
              title:
                'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
              description:
              'These cookies are strictly necessary for the website to function properly. They do not store any personally identifiable information.',
              linkedCategory: 'necessary',
              cookieTable: {
                caption: 'Cookie table',
                headers: {
                    name: 'Cookie',
                    domain: 'Domain',
                    desc: 'Description'
                },
                body: [
                    {
                        name: 'cc_cookie',
                        domain: location.hostname,
                        desc: 'to store consent status',
                    },
                ]
            }
            },
            {
              title: 'Functionality Cookies',
              description:
              'No functional cookies in use yet :)',
              linkedCategory: 'functionality',
            },
            {
              title: 'Analytics Cookies',
              description:
              'These cookies help us to improve our website by collecting and reporting information on how you use it. Link to Google Analytics Privacy Policy: <a href="https://business.safety.google/privacy/" target="_blank"><b>Google Policy</b></a>',
              linkedCategory: 'analytics',
              cookieTable: {
                caption: 'Cookie table',
                headers: {
                    name: 'Cookie',
                    domain: 'Domain',
                    desc: 'Description'
                },
                body: [
                    {
                        name: '_ga*',
                        domain: location.hostname,
                        desc: 'to store and count pageviews',
                    },
                ]
            }
            },
            {
              title: 'More information',
              description:
                'For any query in relation to our policy on cookies and your choices, please <a class="cc__link" href="#contact">contact us</a>.',
            },
          ],
        },
      },
    },
    
  },  
};

function logConsent() {
  // Ensure CookieConsent is loaded
  if (getCookie() === undefined) {
    console.error("CookieConsent is not available.");
    return;
  }

  // Retrieve all the fields
  const cookie = getCookie();

  // Prepare the consent data to send
  const userConsent = {
    consentId: cookie.consentId,
    accepted: cookie.categories,
    consentTimestamp: cookie.consentTimestamp,
    lastConsentTimestamp: cookie.lastConsentTimestamp,
  };

  // Send consent data to your backend
  fetch("/store-consent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userConsent),
  });
}

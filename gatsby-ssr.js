const React = require("react")

const PostBodyComponents = [
  <noindex key="app-sumo-callback-tracker">
    <script
      src="https://widget.callbacktracker.com/tracker/d0e6002932efa641a047bba3a311f4a16d343a6b"
      charSet="UTF-8"
      async="async"
      type="text/javascript"
    />
  </noindex>,
  <script
    type="text/javascript"
    src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
  />,

  <script
    dangerouslySetInnerHTML={{
      __html: `
          window.cookieconsent.initialise({
              container: document.getElementById("cookieconsent"),
              palette:{
               popup: {background: "#1aa3ff"},
               button: {background: "#e0e0e0"},
              },
              revokable: true,
              onStatusChange: function(status) {
               console.log(this.hasConsented() ?
                'enable cookies' : 'disable cookies');
              },
              "position": "bottom-left",
              "theme": "classic",
              "domain": "https://austinlaw.netlify.app/",
              "secure": true,
              "content": {
                "header": 'Cookies used on the website!',
                "message": 'We use cookies to ensure that we give you the best experience on our website. If you continue to use this website we will assume that you are happy with it',
                "dismiss": 'Got it!',
                "allow": 'Allow cookies',
                "deny": 'Decline',
                "link": 'Privacy Policy',
                "href": 'https://austinlaw.netlify.app/privacy-policy/',
                "close": '&#x274c;',
                "policy": 'Cookie Policy',
                "target": '_blank',
                }
             });
        `
    }}
  />,

  <script type="text/javascript" src="src/html.js" />
]

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents(PostBodyComponents)
}

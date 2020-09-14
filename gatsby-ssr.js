import React from "react";
export function onRenderBody(
  { setHeadComponents, setPostBodyComponents }) {
setHeadComponents([


      
]);

setPostBodyComponents([
    <script
    type="text/javascript"
    src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
  />,

<script
     dangerouslySetInnerHTML={{
        __html:`
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
     
     <script
     type="text/javascript"
     src="src/html.js"
   />,

   <div dangerouslySetInnerHTML={{__html: `
<div class="fb-customerchat"
  attribution=setup_tool
  page_id="203836909648652"
  theme_color="#21dbec"
  logged_in_greeting="Hi! If you have questions... I'm here"
  logged_out_greeting="Hi! If you have questions... I'm here">
</div>
`}}/>

        
]);

}
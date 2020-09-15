import React from 'react'
import './Footer.css'
import FormEnquiry from '../components/FormEnquiry'
import { MapPin, Smartphone, Clock, Facebook, Twitter, Linkedin, Youtube } from 'react-feather'
import Fade from 'react-reveal/Fade';
import YelpTestimonials from './YelpTestimonials'
const address= "The Traub Law Office, P.C. 8701 Shoal Creek Blvd Suite 401, Austin, TX 78757"

export default () => (
 <Fade> 
  <div>
    <section className="section">
      <div className="container">
      <YelpTestimonials />  
      </div>
    </section>
    <footer className="footer">
    <div className="taCenter"> 
        <br />       
        <h2>
        Request a Free Consultation
        </h2>
        <h3>Please fill out the form below to receive a free consultation or call us at (512) 246-9191.
</h3></div>  
    <section className="section Contact--Section1">
      <div className="container Contact--Section1--Container">

        <div>       
          <div className="Contact--Details">
            <h2>Office Location</h2> 
              <a
                className="Contact--Details--Item"
                href={`https://www.google.com.au/maps/search/${encodeURI(
                  address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin /> {address}
              </a>
            
             <a className="Contact--Details--Item" href={`tel:${"512246-9191"}`}>
                <Smartphone />  (512) 246-9191
              </a>
             <a className="Contact--Details--Item" href={`#`}>
                <Clock /> 9 a.m. to 5 p.m. Monday - Friday
              </a>
              <span style={{fontSize: '1.4rem', fontWeight: '600', fontStyle: 'italic', color: '#497070'}}>After Office Hours Appointments Available Upon Request</span>
           <br /> <br />
           <h2>Follow Us</h2> 

          </div>
          <div className="social">
          <a className="Contact--Details--Item" href="https://www.facebook.com/Austin-Accident-Attorney-203836909648652/" target="_blank"
                rel="noopener noreferrer">
          <Facebook /> 
          </a>
          <a className="Contact--Details--Item" href="https://twitter.com/AustinAttorney" target="_blank"
                rel="noopener noreferrer">
          <Twitter /> 
          </a>
          <a className="Contact--Details--Item" href="https://www.linkedin.com/in/andrewtraub" target="_blank"
                rel="noopener noreferrer">
          <Linkedin /> 
          </a>
          <a className="Contact--Details--Item" href="https://www.youtube.com/c/AndrewTraub/" target="_blank"
                rel="noopener noreferrer">
          <Youtube /> 
          </a></div>
          <br />
          <div>
            <h2>Leave A Review</h2>
            <a href="https://www.yelp.com/biz/the-traub-law-office-austin-2"
            target="_blank"
            rel="noopener noreferrer">
            <img src="/images/yelpReviews.png" alt="yelp review" width="200px" />  
            </a>
          </div>

        </div>

        <div>
        <FormEnquiry />
        </div>
      </div>
    </section>

      <div className="copyright taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved. &nbsp;
        </span>
        <span>
        <a href="/sitemap/">Sitemap</a>  <a href="/privacy-policy/">Privacy Policy</a>  <a href="/terms-of-use/">Terms of Use</a>  <a href="/submit-articles/">Submit Articles</a> <a href="/referrals/">Lawyer Referrals</a>
        </span>
      </div>
      <div className="disclaimer taCenter"> 
      <span>While most of our clients hail from Austin, Round Rock, Cedar Park, Georgetown, and Pflugerville in Travis and Williamson Counties, we have also worked with clients in Dallas, Houston, and San Antonio. Other clients have come from Lakeway, Jollyville, Anderson Mill, Kyle, and Leander. If your accident was in Texas, we can help you.
      The information on this website is for general information purposes only. Nothing on this site should be taken as legal advice for any individual case or situation. This information is not intended to create, and receipt or viewing does not constitute, an attorney-client relationship.</span></div>
    </footer>
  </div>
</Fade>  
)

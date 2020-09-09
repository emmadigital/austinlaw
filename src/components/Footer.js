import React from 'react'
import './Footer.css'
import FormSimpleAjax from '../components/FormSimpleAjax'
import { MapPin, Smartphone, Mail, Clock, Facebook, Twitter, Linkedin, Youtube } from 'react-feather'

const address= "The Traub Law Office, P.C. 8701 Shoal Creek Blvd Suite 401, Austin, TX 78757"

export default () => (
  <div>
  
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
              <a className="Contact--Details--Item" href={`mailto:${"andrew@austinaccidentlawyer.com"}`}>
                <Mail /> andrew@austinaccidentlawyer.com
              </a>
              <a className="Contact--Details--Item" href={`#`}>
                <Clock /> 9 a.m. to 5 p.m. Monday - Friday
              </a>
              <span style={{fontSize: '1.4rem', fontWeight: '600', fontStyle: 'italic', color: '#497070'}}>After Office Hours Appointments Available Upon Request</span>
           <br /> <br />
           <h2>Follow Us</h2> 

          </div>
          <div className="social">
          <a className="Contact--Details--Item" href="https://www.facebook.com/Austin-Accident-Attorney-203836909648652/">
          <Facebook /> 
          </a>
          <a className="Contact--Details--Item" href="https://twitter.com/AustinAttorney">
          <Twitter /> 
          </a>
          <a className="Contact--Details--Item" href="https://www.linkedin.com/in/andrewtraub">
          <Linkedin /> 
          </a>
          <a className="Contact--Details--Item" href="https://www.youtube.com/c/AndrewTraub/">
          <Youtube /> 
          </a></div>
        </div>

        <div>
          <FormSimpleAjax name="Enquiry" />
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
    </footer>
  </div>
)

import React from 'react'
import './Form.css'

class FormEnquiry extends React.Component {

  render() {
  
    return (
     
      <form
          className="Form"
          name="enquiry" 
          method="POST" 
          action="/thank-you/" 
          data-netlify="true"
        >
          <h2>Your Information</h2>

          <div className="Form--Group">
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="First Name"
                name="firstname"
                required
              />
              <span>First Name</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Last Name"
                name="lastname"
                required
              />
              <span>Last Name</span>
            </label>
           
          </div>
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="email"
              placeholder="Email Address"
              name="emailAddress"
              required
            />
            <span>Email address</span>
          </label>
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputPhone"
              type="phone"
              placeholder="Phone"
              name="phone"
              required
            />
            <span>Phone Number (512) 246-9191</span>
          </label>

          <label className="Form--Label has-arrow">
            <select
              className="Form--Input Form--Select"
              name="type"
              defaultValue="Type of Enquiry"
              required
            >
              <option disabled hidden>
                Type of Case
              </option>
              <option>Injury Case</option>
              <option>Accident Case</option>
              <option>Insurance Claim</option>
              <option>Other</option>
            </select>
          </label>
 
 
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Describe your case"
              name="message"
              rows="10"
              required
            />
            <span>Describe your case</span>
          </label>
 
        
          <input type="hidden" name="form-name" value="enquiry" />
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="Enquire"
          />
        </form>
    );
  }
}

export default FormEnquiry
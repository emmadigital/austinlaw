import React from 'react'
import './Form.css'

class FormConsultation extends React.Component {

  render() {
  
    return (
      <form
          className="Form"
          name="consultation" 
          method="POST" 
          action="/thank-you/" 
          data-netlify="true"
        >
       <h2>To Schedule Your Free Initial Consultation Call Us at (512) 246-9191 or Fill out the Form Below. </h2> 
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Name"
                name="name"
                required
              />
              <span>Name (E.g. John Smith)</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Street Address"
                name="address"
                required
              />
              <span>Street Address (E.g. 8701 Shoal Creek Blvd)</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Appartment, suite, etc"
                name="house"
                required
              />
              <span>Appartment, suite, etc</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="City"
                name="city"
                required
              />
              <span>E.g. Austin </span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="ZIP / Postal Code"
                name="zip"
                required
              />
              <span>E.g. 78757</span>
            </label>  
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
          <h3>Meeting Date and Time</h3>

          <div className="Form--Group">
         <label className="Form--Label">
              <input
                className="Form--Input Form--InputDate"
                type="date"
                placeholder="Meeting Date"
                name="date"
                required
              />
              <span></span>
            </label>

            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="time"
                placeholder=""
                name="time"
                required
              />
              <span></span>
            </label>
            </div>
            <h3>Saturday or Sunday</h3>
            <p>If you need to meet on a Saturday or Sunday, please call our office at (512) 246-9191.</p>
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
 
        
          <input type="hidden" name="form-name" value="consultation" />
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="Request Case Evaluation"
          />
        </form>
    );
  }
}

export default FormConsultation
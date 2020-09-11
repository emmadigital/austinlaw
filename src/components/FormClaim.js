import React from 'react'
import './Form.css'

class FormClaim extends React.Component {

  render() {
  
    return (
      <form
          className="Form"
          name="claim" 
          method="POST" 
          action="/thank-you/" 
          data-netlify="true"
        >
           <h1>Biographical Information</h1> 
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
            <h4>Date of Birth</h4>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputDate"
                type="date"
                placeholder="Date of Birth"
                name="dob"
                required
              />
              <span></span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Street Address"
                name="address"
                required
              />
              <span>Street Address (E.g. 42 Wallaby Way)</span>
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
            <div className="Form--Group">
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="City"
                name="city"
                required
              />
              <span>City (E.g. Austin) </span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="State/Province"
                name="state"
                required
              />
              <span>State (E.g. Texas) </span>
            </label>
            </div>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="ZIP / Postal Code"
                name="zip"
                required
              />
              <span>ZIP (E.g. 78757)</span>
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
          <h2>How did you hear about us?</h2>
          <label className="Form--Label has-arrow">
            <select
              className="Form--Input Form--Select"
              name="type"
              defaultValue="How Did You Hear About Us"
              required
            >
              <option disabled hidden>
              How Did You Hear About Us
              </option>
              <option>Referral</option>
              <option>Google</option>
              <option>Yelp</option>
              <option>Avvo</option>
              <option>BBB</option>
              <option>Lawyers.com</option>
              <option>Existing Client</option>
              <option>Other</option>
            </select>
          </label>
          <h2>Accident Details</h2>
          <div className="Form--Group">
         <label className="Form--Label">
              <input
                className="Form--Input Form--InputDate"
                type="date"
                placeholder="Accident Date"
                name="accidentDate"
                required
              />
              <span></span>
            </label>

            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="time"
                placeholder="Accident Time"
                name="accidentTime"
                required
              />
              <span></span>
            </label>
            </div>

 
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Accident Address"
              name="accidentAddress"
              rows="10"
              required
            />
            <span>Accident Address</span>
          </label>

          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Injuries that you sustained from the accident"
              name="accidentInjuries"
              rows="10"
              required
            />
            <span>Injuries that you sustained from the accident E.g. neck, lower back, anxiety</span>
          </label>

          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Briefly describe the incident"
              name="accidentDescription"
              rows="10"
              required
            />
            <span>Briefly describe the incident</span>
          </label>
          <p>Was a police report filed?</p>  
          <fieldset>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="policeReport"
                value="yes"
                defaultChecked
              />
              <span>Yes</span>
            </label>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="policeReport"
                value="no"
              />
              <span>No</span>
            </label>
          </fieldset>

          <p>Was EMS called?</p>  
          <fieldset>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="ems"
                value="yes"
                defaultChecked
              />
              <span>Yes</span>
            </label>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="ems"
                value="no"
              />
              <span>No</span>
            </label>
          </fieldset>

          <p>Did you go to the emergency room/hospital?</p> 
          <fieldset>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="hospitalised"
                value="yes"
                defaultChecked
              />
              <span>Yes</span>
            </label>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="hospitalised"
                value="no"
              />
              <span>No</span>
            </label>
          </fieldset>
          <p>List any hospitals, doctors, chiropractors or other medical providers who have treated you in relation to this accident. Please include addresses or contact information if you have it.</p>
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Briefly describe the incident"
              name="treatment"
              rows="10"
              required
            />
            <span>Treatment after accident</span>
          </label>
        
          <h3>Insurance Information</h3>
          <p>Do you have auto insurance?</p>  

          <fieldset>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="autoInsurance"
                value="yes"
                defaultChecked
              />
              <span>Yes</span>
            </label>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="autoInsurance"
                value="no"
              />
              <span>No</span>
            </label>
          </fieldset>

          <p>Did the person who hit you have insurance?</p> 
          <fieldset>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="guiltyInsurance"
                value="yes"
                defaultChecked
              />
              <span>Yes</span>
            </label>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="guiltyInsurance"
                value="no"
              />
              <span>No</span>
            </label>
          </fieldset>

          <h2>Additional Information</h2>
          <p>Do you have any child support liens, judgements, or owe any other court-ordered debts?</p>  
          <fieldset>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="additionalInfo"
                value="yes"
                defaultChecked
              />
              <span>Yes</span>
            </label>
            <label className="Form--Label Form--Radio">
              <input
                className="Form--RadioInput"
                type="radio"
                name="additionalInfo"
                value="no"
              />
              <span>No</span>
            </label>
          </fieldset>
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Is there anything else you think we should know about your case?              "
              name="moreAboutCase"
              rows="10"
              required
            />
            <span>Other essential details</span>
          </label>
          <input type="hidden" name="form-name" value="claim" />
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="Send Message"
          />
        </form>
    );
  }
}

export default FormClaim
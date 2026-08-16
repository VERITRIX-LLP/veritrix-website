"use client";

import { FormEvent, useState } from "react";
import { Arrow } from "./icons";

export function HomeEnquiry() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <section className="cta-band home-enquiry">
      <div className="home-enquiry-copy">
        <p className="eyebrow">Start a conversation</p>
        <h2>Have something in mind? Let’s talk about what you’re building.</h2>
        <p>
          Tell us a little about your idea, the problem you want to solve, or where
          you need support. It does not need to be perfectly planned—we can begin
          with a conversation.
        </p>
      </div>

      <form className="home-enquiry-form" onSubmit={submit}>
        <p className="home-enquiry-note">Preview only — enquiries are not sent or stored yet.</p>

        <label>
          Name
          <input name="name" autoComplete="name" required />
        </label>

        <label>
          Work email
          <input name="email" type="email" autoComplete="email" required />
        </label>

        <label className="home-enquiry-wide">
          What can we help with?
          <select name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            <option>Web Design &amp; Development</option>
            <option>Custom Software Development</option>
            <option>Mobile App Development</option>
            <option>AI &amp; Business Automation</option>
            <option>UI/UX &amp; Product Design</option>
            <option>E-commerce Development</option>
            <option>Maintenance &amp; Technical Support</option>
          </select>
        </label>

        <label className="home-enquiry-wide">
          Tell us a little about it
          <textarea name="message" rows={4} required />
        </label>

        <label className="home-enquiry-consent home-enquiry-wide">
          <input type="checkbox" required />
          <span>
            I agree that VERITRIX may use these details to respond to my enquiry.
            <small> Privacy policy content is pending legal approval.</small>
          </span>
        </label>

        <button className="button home-enquiry-submit" type="submit">
          Send your enquiry <Arrow />
        </button>

        <p
          className={`home-enquiry-status ${submitted ? "home-enquiry-status-success" : ""}`}
          aria-live="polite"
        >
          {submitted
            ? "Form preview complete. Nothing was sent or stored yet."
            : "Complete the form to preview the confirmation."}
        </p>
      </form>
    </section>
  );
}

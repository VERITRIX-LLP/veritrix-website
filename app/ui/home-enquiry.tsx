"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { Arrow } from "./icons";

export function HomeEnquiry() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Project enquiry from ${String(data.get("name") ?? "Website visitor")}`;
    const body = [
      `Name: ${String(data.get("name") ?? "")}`,
      `Email: ${String(data.get("email") ?? "")}`,
      `Phone: ${String(data.get("phone") ?? "")}`,
      `Service: ${String(data.get("service") ?? "")}`,
      "",
      "Enquiry:",
      String(data.get("message") ?? ""),
    ].join("\n");

    window.location.href = `mailto:veritrixtekstudiollp@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="cta-band home-enquiry" id="contact">
      <div className="home-enquiry-copy">
        <p className="eyebrow">Start a conversation</p>
        <h2>Have something in mind? Let’s talk about what you’re building.</h2>
        <p>
          Tell us a little about your idea, the problem you want to solve, or where
          you need support. It does not need to be perfectly planned—we can begin
          with a conversation.
        </p>
        <div className="home-enquiry-details" aria-label="VERITRIX contact details">
          <p><span>Email</span><a href="mailto:veritrixtekstudiollp@gmail.com">veritrixtekstudiollp@gmail.com</a></p>
          <p><span>Phone</span><a href="tel:+919421975439">+91 94219 75439</a></p>
          <p><span>Office</span>401, Krystal Square, E Ward, Nagala Park, Kolhapur 416002, Maharashtra, India</p>
          <p><span>Business hours</span>10:00 AM–5:00 PM IST</p>
        </div>
      </div>

      <form className="home-enquiry-form" onSubmit={submit}>
        <label>
          Name
          <input name="name" autoComplete="name" required />
        </label>

        <label>
          Work email
          <input name="email" type="email" autoComplete="email" required />
        </label>

        <label className="home-enquiry-wide">
          Phone
          <input name="phone" type="tel" autoComplete="tel" required />
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
            I confirm that I am at least 18 years old and agree that VERITRIX may
            use these details to respond to my enquiry. Read our{" "}
            <Link href="/legal/privacy">Privacy Policy</Link>.
          </span>
        </label>

        <button className="button home-enquiry-submit" type="submit">
          Send your enquiry <Arrow />
        </button>

        <p className="home-enquiry-status">
          This opens a prepared message in your email app for you to review and send.
        </p>
      </form>
    </section>
  );
}

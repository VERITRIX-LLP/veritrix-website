import type { Metadata } from "next";
import { PageHero } from "../../ui/sections";

type LegalPageProps = {
  params: Promise<{ slug?: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: undefined },
    { slug: ["privacy"] },
    { slug: ["cookies"] },
    { slug: ["terms"] },
  ];
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  return slug?.[0] === "privacy"
    ? { title: "Privacy Policy" }
    : { title: "Legal Information" };
}

function PrivacyPolicy() {
  return (
    <>
      <PageHero eyebrow="Legal information" title="Privacy Policy">
        <p className="legal-updated">Last updated: 17 August 2026</p>
        <p>
          This policy explains how VERITRIX TEK STUDIO LLP collects, uses,
          stores and protects personal information when you visit our website
          or contact us.
        </p>
      </PageHero>

      <article className="legal-policy">
        <section>
          <h2>1. About this policy</h2>
          <p>
            VERITRIX TEK STUDIO LLP is responsible for the personal information
            described in this policy. You can contact us at:
          </p>
          <address>
            <strong>VERITRIX TEK STUDIO LLP</strong><br />
            401, Krystal Square, E Ward, Nagala Park<br />
            Kolhapur 416002, Maharashtra, India<br />
            Email: <a href="mailto:veritrixtekstudiollp@gmail.com">veritrixtekstudiollp@gmail.com</a><br />
            Phone: <a href="tel:+919421975439">+91 94219 75439</a>
          </address>
        </section>

        <section>
          <h2>2. Information we collect</h2>
          <p>When you contact us or submit an enquiry, we may collect:</p>
          <ul>
            <li>Your name, email address and phone number.</li>
            <li>Whether your enquiry is for an individual project or an organisation.</li>
            <li>Your organisation name, when relevant.</li>
            <li>Your message and any images or files you choose to upload.</li>
            <li>Information contained in later correspondence with us.</li>
          </ul>
          <p>
            Please do not submit passwords, identity documents, financial
            information, health information or other sensitive personal data
            through our forms or future chatbot.
          </p>
          <p>
            Our hosting and security providers may also process basic technical
            information such as IP address, browser and device information,
            pages visited and access timestamps.
          </p>
        </section>

        <section>
          <h2>3. How we use information</h2>
          <p>We may use personal information to:</p>
          <ul>
            <li>Respond to enquiries and understand what you need.</li>
            <li>Communicate about potential or ongoing work and arrange consultations.</li>
            <li>Maintain appropriate business records.</li>
            <li>Protect our website, systems and users.</li>
            <li>Improve our services, internal processes and understanding of enquiry patterns.</li>
            <li>Meet legal, regulatory or professional obligations.</li>
          </ul>
          <p>Submitting an enquiry does not create a client relationship or contract.</p>
        </section>

        <section>
          <h2>4. Cloud storage and internal analysis</h2>
          <p>
            Enquiry information may be stored using cloud platforms and service
            providers used by VERITRIX. We may use it for internal analysis,
            including understanding common needs and improving our services.
          </p>
          <p>
            We do not sell personal information, publish your details or disclose
            them for unrelated purposes. Where practical, analysis will use
            aggregated or de-identified information.
          </p>
        </section>

        <section>
          <h2>5. Uploaded files</h2>
          <p>
            Only upload files that are necessary for your enquiry and that you
            have the right to share. Uploading a file does not transfer ownership
            to VERITRIX. We may remove files that are unsafe, unlawful, irrelevant
            or unsuitable for our systems.
          </p>
        </section>

        <section>
          <h2>6. Consent and choices</h2>
          <p>
            Where consent is requested, it allows us to use your information to
            respond to your enquiry. You may withdraw consent by contacting us,
            although this does not affect processing that occurred beforehand.
          </p>
          <p>
            If we introduce newsletters, we will request separate, optional
            consent and provide a way to unsubscribe.
          </p>
        </section>

        <section>
          <h2>7. When information may be shared</h2>
          <p>
            We may share information with trusted providers that support hosting,
            cloud storage, communications, security or other necessary business
            operations. They may use it only to provide those services to us.
          </p>
          <p>
            We may also disclose information where required by law, to protect
            legal rights or safety, or in connection with a legitimate business
            restructuring. We do not sell personal information.
          </p>
        </section>

        <section>
          <h2>8. International processing</h2>
          <p>
            Some service providers may store or process information outside India.
            When this occurs, we will take reasonable steps to use reputable
            providers and appropriate contractual or technical safeguards.
          </p>
        </section>

        <section>
          <h2>9. Retention</h2>
          <p>
            We retain personal information only for as long as reasonably needed
            for the purposes described in this policy, including responding to
            enquiries, maintaining business records and meeting legal obligations.
            Information may then be deleted, anonymised or securely archived.
          </p>
        </section>

        <section>
          <h2>10. Age requirement</h2>
          <p>
            Our enquiry forms are intended only for people aged 18 or older. We
            do not knowingly collect information from children. If you believe a
            person under 18 has submitted information, please contact us so we
            can review and delete it where appropriate.
          </p>
        </section>

        <section>
          <h2>11. Future analytics, chatbot and advertising tools</h2>
          <p>
            Google Analytics, a functional chatbot, newsletters and advertising
            tools are not active at the date shown above. Before introducing them,
            we will update this policy and implement any notices or consent choices
            that are required.
          </p>
          <p>
            If a chatbot is introduced, messages may be recorded to respond and
            improve the service. Users should not provide sensitive information
            through it.
          </p>
        </section>

        <section>
          <h2>12. Maps and external services</h2>
          <p>
            Our website may link to an external map service, such as Google Maps,
            to help visitors find our office. When you open an external service,
            that provider&apos;s privacy terms apply. VERITRIX is not responsible for
            the privacy practices of external websites or services.
          </p>
        </section>

        <section>
          <h2>13. Security</h2>
          <p>
            We use reasonable administrative, technical and organisational
            safeguards appropriate to the information we handle. No website,
            transmission method or storage system can be guaranteed completely secure.
          </p>
        </section>

        <section>
          <h2>14. Your rights</h2>
          <p>
            Subject to applicable law, you may ask to access or correct your
            personal information, request deletion, withdraw consent or raise a
            concern about how it is used. We may need to verify your identity
            before completing a request.
          </p>
        </section>

        <section>
          <h2>15. Questions or complaints</h2>
          <p>
            Contact us using the email, phone number or postal address in section
            1. We will review privacy questions and complaints and respond within
            a reasonable period.
          </p>
        </section>

        <section>
          <h2>16. Changes to this policy</h2>
          <p>
            We may update this policy as our website, services or legal obligations
            change. The current version and its last-updated date will be published
            on this page.
          </p>
        </section>
      </article>
    </>
  );
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;

  if (slug?.[0] === "privacy") {
    return <PrivacyPolicy />;
  }

  return (
    <>
      <PageHero eyebrow="Legal information" title="Policy content is being prepared.">
        <p>
          The requested legal page will be published after its content has been
          reviewed and approved.
        </p>
      </PageHero>
      <section className="section">
        <div className="empty-state">
          <span className="empty-number">—</span>
          <div>
            <h3>Being prepared with care.</h3>
            <p>Cookie, terms and general legal information remain under review.</p>
          </div>
        </div>
      </section>
    </>
  );
}

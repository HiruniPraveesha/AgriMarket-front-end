import React from "react";
import MainHeader from "../components/Header-main";
import MainFooter from "../components/Footer-main";

const PrivacyPolicyPage = () => {
  return (
    <div>
      <MainHeader />
      <div className="container mt-5">
        <h1>Privacy Policy</h1>
        <p>
          This privacy policy applies to the use of the Agrimarket website. We
          take the privacy of our visitors seriously and are committed to
          safeguarding your information. This policy explains how we collect,
          use, and protect your personal data.
        </p>
        <h2>Information Collection and Use</h2>
        <p>
          We may collect personal information, such as your name and email
          address, when you subscribe to our newsletter or fill out a contact
          form. This information is used to communicate with you and provide
          relevant updates about our services.
        </p>
        <h2>Cookies</h2>
        <p>
          Our website may use cookies to enhance your browsing experience.
          Cookies are small files stored on your computer that track website
          activity. You can disable cookies in your browser settings, but please
          note that some features of the site may not function properly if
          cookies are disabled.
        </p>
        <h2>Data Security</h2>
        <p>
          We implement security measures to protect your personal information
          from unauthorized access, alteration, disclosure, or destruction.
          However, please be aware that no method of transmission over the
          internet or electronic storage is completely secure, and we cannot
          guarantee absolute security.
        </p>
        <h2>Third Party Links</h2>
        <p>
          Our website may contain links to third-party websites. Please note
          that we have no control over the content and practices of these sites,
          and we cannot be held responsible for their privacy policies or
          actions.
        </p>
        <h2>Changes to this Policy</h2>
        <p>
          We reserve the right to update or change this privacy policy at any
          time. Any changes will be posted on this page, and the effective date
          will be updated accordingly.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns about our privacy policy, please
          contact us at privacy@agrimarket.com.
        </p>
      </div>
      <MainFooter />
    </div>
  );
};

export default PrivacyPolicyPage;

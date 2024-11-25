import FooterTwo from "@/layouts/footers/FooterTwo";
import HeaderTwo from "@/layouts/headers/HeaderTwo";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <HeaderTwo />
      <div className="page-content-wrapper py-3">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h6>PRIVACY POLICY</h6>
              <p>
                By using or accessing Matematch, you agree to the practices and
                policies outlined in this Privacy Policy. You consent to our
                collection, use, and sharing of your information as detailed
                below. Your privacy and security are our top priorities.
              </p>
              <h6>WHAT DATA WE COLLECT AND WHY WE COLLECT IT</h6>
              <p>
                Like most platforms, we automatically gather certain technical
                data (such as device type, browser information, and operating
                system) and store it securely. This data does not directly
                identify individuals and is used to improve our website, analyze
                trends, and better understand our user community. Some of this
                automatically-collected data may be linked to personally
                identifiable information to enhance user experience.
              </p>
              <h6>PERSONALLY IDENTIFIABLE INFORMATION</h6>
              <p>
                When you create an account on Matematch, we may collect
                personally identifiable information, such as your name, age,
                gender, email address, and other details necessary to provide
                our matchmaking services. You can update or modify this
                information in your profile settings at any time. If you choose
                to delete your account, your data will be removed, although we
                may retain an archived copy as required by law or for legitimate
                business purposes.
              </p>
              <p>
                To maintain your privacy, we do not access your personal content
                or messages unless it is required to address technical issues or
                if legally obligated. Some of your information may be shared
                with trusted service providers to assist us in delivering
                Matematch services but only for these purposes, and they cannot
                use your information for any other reason.
              </p>
              <p>
                We will never rent or sell your personally identifiable
                information to third parties, except as detailed in this Privacy
                Policy.
              </p>
              <h6>USE OF INFORMATION</h6>
              <p>
                We primarily use your personal information to provide you with
                matchmaking services, facilitate communication between matches,
                and notify you of updates or new features. We may also use your
                contact information to respond to your inquiries or to send you
                information about Matematch. You can opt out of marketing
                communications at any time by contacting us.
              </p>
              <p>
                If you contact Matematch support, we may retain a record of your
                correspondence to better assist you. Your email address and the
                details you provide will be used only to address your concerns
                and improve our service. We will only share your information as
                necessary to comply with legal requirements or protect our
                rights, as outlined in the “Complying with Legal Obligations”
                section.
              </p>
              <h6>STORAGE AND SECURITY OF INFORMATION</h6>
              <p className="mb-0">
                Matematch uses secure data networks protected by
                industry-standard security measures, such as firewalls and
                encryption. We regularly review and update our security
                protocols to safeguard your data, and only authorized personnel
                have access to your information. Your privacy and safety are
                always at the forefront of our practices.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterTwo />
    </>
  );
};

export default PrivacyPolicy;

import FooterTwo from "@/layouts/footers/FooterTwo";
import HeaderTwo from "@/layouts/headers/HeaderTwo";
import React from "react";

const Terms = () => {
  return (
    <>
      <HeaderTwo />
      <div className="page-content-wrapper py-3">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h6>TERMS AND CONDITIONS</h6>
              <p>
                Welcome to Matematch. By accessing or using our platform, you
                agree to be bound by these Terms and Conditions. Please read
                them carefully before using our services. If you do not agree
                with any part of these terms, you may not use our platform.
              </p>
              <h6>ACCEPTANCE OF TERMS</h6>
              <p>
                By creating an account or using any part of Matematch, you
                acknowledge that you have read, understood, and agree to be
                bound by these Terms and Conditions, as well as our Privacy
                Policy. We reserve the right to update or modify these terms at
                any time without prior notice. Your continued use of Matematch
                after any changes constitutes acceptance of those changes.
              </p>
              <h6>ELIGIBILITY AND ACCOUNT CREATION</h6>
              <p>
                You must be at least 18 years old to use Matematch. By creating
                an account, you confirm that you meet this age requirement. You
                agree to provide accurate, current, and complete information
                during registration and to update such information to keep it
                accurate, current, and complete.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account. You agree to immediately notify Matematch of any
                unauthorized use of your account or any other breach of
                security.
              </p>
              <h6>USER CONDUCT AND RESPONSIBILITIES</h6>
              <p>
                You agree not to use Matematch for any unlawful purpose or in
                any way that could damage, disable, overburden, or impair our
                services. You must not attempt to gain unauthorized access to
                any part of the platform, other user accounts, or computer
                systems or networks connected to Matematch.
              </p>
              <p>
                You are solely responsible for your interactions with other
                users. While we strive to maintain a safe environment, Matematch
                does not conduct criminal background checks on users and makes
                no representations about the conduct of users.
              </p>
              <h6>INTELLECTUAL PROPERTY RIGHTS</h6>
              <p>
                All content on Matematch, including but not limited to text,
                graphics, logos, button icons, images, audio clips, digital
                downloads, and data compilations, is the property of Matematch
                or its content suppliers and is protected by international
                copyright laws.
              </p>
              <h6>TERMINATION</h6>
              <p className="mb-0">
                Matematch reserves the right to suspend or terminate your
                account and access to our services at any time, without notice,
                for conduct that we believe violates these Terms and Conditions
                or is harmful to other users, us, or third parties, or for any
                other reason at our sole discretion.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterTwo />
    </>
  );
};

export default Terms;

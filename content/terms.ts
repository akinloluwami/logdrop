import { parse } from "marked";

const terms = parse(
  `
Subject to these Terms of Service (this "Agreement"), LogDrop ("LogDrop," "we," "us," and/or "our") provides access to LogDrop's API monitoring and logging tool and related services (collectively, the "Services"). By using or accessing the Services, you acknowledge that you have read, understand, and agree to be bound by this Agreement.

If you are entering into this Agreement on behalf of a company, business, or other legal entity, you represent that you have the authority to bind such entity to this Agreement. In such a case, the term "you" shall refer to that entity. If you do not have such authority, or if you do not agree with this Agreement, you must not accept this Agreement and may not use the Services.

**1. Acceptance of Terms**

By signing up and using the services provided by LogDrop (referred to as the "Service"), you are agreeing to be bound by the following terms and conditions ("Terms of Service"). The Service is owned and operated by LogDrop ("Us," "We," or "Our").

**2. Description of Service**

LogDrop provides an API monitoring and logging tool for users to monitor and manage APIs effectively ("the Product"). The Product is accessible at logdrop.co and other domains and subdomains controlled by Us (collectively, "the Website").

**3. Fair Use**

You are responsible for your use of the Service and for any content that you post or transmit through the Service. You may not use the Service for any malicious purpose, including but not limited to:

- Phishing 
- Scam activities

We reserve the right to suspend or terminate your access to the Service if we determine, in our sole discretion, that you have violated these Terms of Service.

**4. Intellectual Property Rights**

You acknowledge and agree that the Service and its entire contents, features, and functionality, including but not limited to all information, software, code, text, displays, graphics, photographs, video, audio, design, presentation, selection, and arrangement, are owned by Us, our licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.


**5. Refund and Cancellation Policy**

a. **Refunds:** We offer a 7-day, no-questions-asked refund policy. If you are not satisfied with our services within the first 7 days of your subscription or service plan, you can request a refund. Refunds requested within this period will be processed promptly.

b. **Cancellation:** You may cancel your subscription or service plan at any time. To initiate a cancellation, please follow the instructions provided on the Website or contact our support team.


**6. Changes to these Terms**

We reserve the right to revise and update these Terms of Service from time to time in our sole discretion. All changes are effective immediately when we post them and apply to all access to and use of the Website thereafter. Your continued use of the Website following the posting of revised Terms of Service means that you accept and agree to the changes.

**7. Contact Information**

Questions or comments about the Website or these Terms of Service may be directed to our support team at support@logdrop.com.

**8. Disclaimer of Warranties**

THE SERVICE AND ITS CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE WARRANTY OF TITLE, MERCHANTABILITY, NON-INFRINGEMENT OF THIRD PARTIES’ RIGHTS, AND FITNESS FOR A PARTICULAR PURPOSE.


---

By using LogDrop, you acknowledge that you have read these Terms of Service, understood them, and agree to be bound by them. If you do not agree to these Terms of Service, you are not authorized to use the Service. We reserve the right to change these Terms of Service at any time, so please review them frequently.

Thank you for using LogDrop!


**Last updated: September 16, 2023**


`
);

export { terms };

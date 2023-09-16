import { parse } from "marked";

const privacy = parse(
  `
## Welcome to LogDrop

LogDrop, hosted at the "Site," offers an API monitoring and logging tool (referred to as "LogDrop," "we," "us," and/or "our"). Our mission is to provide you with a platform for managing and monitoring APIs, and we prioritize the protection of your personal data. This Privacy Policy details how we collect, handle, and disclose personal information through our platform.

## Applicability

This Privacy Policy pertains to both our valued customers and site visitors. Customers are responsible for creating and enforcing their unique terms, conditions, and privacy policies to ensure compliance with applicable laws and regulations.

## Changes to this Privacy Policy

As our platform and business evolve, this Privacy Policy may undergo periodic updates. Your continued use of the platform following any modifications to this Privacy Policy indicates your consent to the revised terms.

## Data Collection

We collect data directly from you when you explicitly provide it on our Site. It's important to note that we do not employ third-party cookies on our Site.

## How We Use Your Information

Your information is used for the following purposes:

- Providing our Services.
- Enhancing our Platform.
- Understanding your usage patterns on our platform.
- Communicating with you as needed.

## Contact Information

For any privacy-related questions or concerns, please reach out to us at privacy@logdrop.com.

**Last updated: September 16, 2023**
`
);

export { privacy };

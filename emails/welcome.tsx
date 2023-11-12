import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Head } from "@react-email/head";
import { Font } from "@react-email/font";

export default function Welcome({ name }) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Poppins"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "(https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Hi {name},
      </Text>
      <Text>
        I'm Akinkunmi, the creator of LogDrop. I am thrilled to welcome you
        onboard!
      </Text>
      <Text>Ready to dive into data? Let's keep it short and sweet:</Text>
      <ul>
        <li>
          <Text>Follow the easy integration steps on the onboarding page</Text>
        </li>
        <li>
          <Text>Make your first API request</Text>
        </li>
        <li>
          <Text>Explore the dashboard and visualize your data</Text>
        </li>
      </ul>
      <br />
      <Text>
        If you have any questions or feedback, feel free to reply to this email.
        I would love to hear from you.
      </Text>
      <br />

      <Text>
        Cheers,
        <br />
        Akinkunmi
      </Text>
    </Html>
  );
}

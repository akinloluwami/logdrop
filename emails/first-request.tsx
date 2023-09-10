import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import { Img } from "@react-email/img";
import { Text } from "@react-email/text";
import { Head } from "@react-email/head";
import { Font } from "@react-email/font";

export default function FirstRequest() {
  return (
    <Html>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        You logged your first request!🎉
      </Text>

      <Text>Congrats on logging your first request to LogDrop!</Text>
      <Text>You can now explore the dashboard and visualize your data.</Text>
      <br />

      <Text>
        Cheers,
        <br />
        Akinkunmi
      </Text>
    </Html>
  );
}

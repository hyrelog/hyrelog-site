import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components";
import * as React from "react";

export interface WaitlistThanksEmailProps {
  name?: string;
}

export function WaitlistThanksEmail({ name }: WaitlistThanksEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>You are on the HyreLog waitlist</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Text style={p}>Hi {name?.trim() ? name : "there"},</Text>
            <Text style={p}>
              Thanks for joining the HyreLog waitlist. We will share launch updates, early-access
              availability, and pricing changes as we move through beta.
            </Text>
            <Text style={p}>- The HyreLog team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#f6f9fc", fontFamily: "sans-serif" };
const container = { margin: "0 auto", padding: "24px", maxWidth: "560px" };
const section = {
  backgroundColor: "#fff",
  padding: "24px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};
const p = { fontSize: "16px", lineHeight: "24px", color: "#1a1a1a", margin: "0 0 16px" };

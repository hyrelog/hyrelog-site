import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export interface NewsletterConfirmProps {
  confirmUrl: string;
}

export function NewsletterConfirmEmail({ confirmUrl }: NewsletterConfirmProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Confirm your subscription to HyreLog</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Text style={p}>Thanks for subscribing to HyreLog.</Text>
            <Text style={p}>
              Confirm your email to receive updates on audit logging and compliance.
            </Text>
            <Button style={button} href={confirmUrl}>
              Confirm your email
            </Button>
            <Text style={small}>If you didn't request this, you can ignore this email.</Text>
            <Text style={p}>— The HyreLog team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#f6f9fc", fontFamily: "sans-serif" };
const container = { margin: "0 auto", padding: "24px", maxWidth: "560px" };
const section = { backgroundColor: "#fff", padding: "24px", borderRadius: "8px", border: "1px solid #e5e7eb" };
const p = { fontSize: "16px", lineHeight: "24px", color: "#1a1a1a", margin: "0 0 16px" };
const button = {
  backgroundColor: "#2563eb",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  padding: "12px 24px",
  textDecoration: "none",
  display: "inline-block",
  marginBottom: "16px",
};
const small = { fontSize: "14px", color: "#6b7280", margin: "0 0 16px" };

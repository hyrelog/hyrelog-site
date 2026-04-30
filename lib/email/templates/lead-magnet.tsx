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

export interface LeadMagnetEmailProps {
  title: string;
  downloadUrl: string;
}

export function LeadMagnetEmail({ title, downloadUrl }: LeadMagnetEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your download: {title}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Text style={p}>
              Here's your download link for the <strong>{title}</strong>.
            </Text>
            <Button style={button} href={downloadUrl}>
              Download now
            </Button>
            <Text style={small}>
              This link is for your use only. If you didn't request this, you can ignore this email.
            </Text>
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

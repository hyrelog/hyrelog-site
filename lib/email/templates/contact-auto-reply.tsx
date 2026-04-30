import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components";
import * as React from "react";

export interface ContactAutoReplyProps {
  name: string;
}

export function ContactAutoReplyEmail({ name }: ContactAutoReplyProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>We received your message</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Text style={p}>Hi {name},</Text>
            <Text style={p}>
              Thanks for reaching out. We've received your message and will get back to you soon.
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

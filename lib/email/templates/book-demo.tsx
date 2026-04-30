import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export interface BookDemoEmailProps {
  name: string;
  email: string;
  company?: string;
  message?: string;
  meta?: Record<string, string>;
}

export function BookDemoEmail({
  name,
  email,
  company = "—",
  message,
  meta,
}: BookDemoEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Waitlist request: {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Waitlist request</Heading>
          <Section style={section}>
            <Text style={label}>Name</Text>
            <Text style={value}>{name}</Text>
            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>
            <Text style={label}>Company</Text>
            <Text style={value}>{company}</Text>
          </Section>
          {message ? (
            <>
              <Hr style={hr} />
              <Heading as="h2" style={h2}>
                Message
              </Heading>
              <Section style={messageSection}>
                <Text style={messageText}>{message}</Text>
              </Section>
            </>
          ) : null}
          {meta && Object.keys(meta).length > 0 ? (
            <>
              <Hr style={hr} />
              <Text style={metaText}>
                {Object.entries(meta)
                  .map(([k, v]) => `${k}: ${String(v).slice(0, 200)}`)
                  .join(" | ")}
              </Text>
            </>
          ) : null}
          <Hr style={hr} />
          <Text style={footer}>- HyreLog waitlist form</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#f6f9fc", fontFamily: "sans-serif" };
const container = { margin: "0 auto", padding: "24px", maxWidth: "560px" };
const h1 = { fontSize: "20px", fontWeight: "600", color: "#1a1a1a", margin: "0 0 16px" };
const h2 = { fontSize: "16px", fontWeight: "600", color: "#1a1a1a", margin: "0 0 8px" };
const section = { marginBottom: "16px" };
const label = { fontSize: "12px", color: "#6b7280", margin: "0 0 2px", fontWeight: "600" };
const value = { fontSize: "14px", color: "#1a1a1a", margin: "0 0 12px" };
const hr = { borderColor: "#e5e7eb", margin: "20px 0" };
const messageSection = {
  backgroundColor: "#fff",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #e5e7eb",
};
const messageText = { whiteSpace: "pre-wrap" as const, fontFamily: "sans-serif", fontSize: "14px", margin: 0 };
const metaText = { fontSize: "11px", color: "#6b7280", margin: 0 };
const footer = { fontSize: "12px", color: "#6b7280", marginTop: "24px" };

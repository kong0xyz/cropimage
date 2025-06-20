import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerificationCodeEmailProps {
  code: string;
}

export const VerificationCodeEmail = ({ code }: VerificationCodeEmailProps) => (
  <Html>
    <Head />
    <Preview>您的注册验证码：{code}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={`${process.env.NEXT_PUBLIC_APP_URL}/logo.png`}
            width="120"
            height="36"
            alt="Logo"
            style={logo}
          />
        </Section>
        <Heading style={h1}>验证您的邮箱地址</Heading>
        <Text style={heroText}>
          感谢您注册我们的服务！请使用以下验证码完成注册：
        </Text>
        
        <Section style={codeContainer}>
          <Text style={codeText}>{code}</Text>
        </Section>
        
        <Text style={text}>
          此验证码将在 <strong>10分钟</strong> 后过期。如果您没有请求此验证码，请忽略此邮件。
        </Text>
        
        <Text style={text}>
          为了您的账户安全，请不要将此验证码分享给任何人。
        </Text>
        
        <Section style={footerSection}>
          <Text style={footerText}>
            如果您有任何问题，请联系我们的客服团队。
          </Text>
          <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}/contact`}
            style={footerLink}
          >
            联系客服
          </Link>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const logoContainer = {
  marginTop: "32px",
};

const logo = {
  margin: "0 auto",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "40px",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const heroText = {
  color: "#484848",
  fontSize: "16px",
  lineHeight: "28px",
  margin: "0 0 30px",
  textAlign: "center" as const,
};

const codeContainer = {
  background: "#f6f9fc",
  borderRadius: "8px",
  margin: "0 0 30px",
  padding: "24px",
  textAlign: "center" as const,
};

const codeText = {
  color: "#1a1a1a",
  fontSize: "32px",
  fontWeight: "700",
  letterSpacing: "6px",
  lineHeight: "40px",
  margin: "0",
  fontFamily: "monospace",
};

const text = {
  color: "#484848",
  fontSize: "16px",
  lineHeight: "28px",
  margin: "0 0 20px",
};

const footerSection = {
  borderTop: "1px solid #e6ebf1",
  marginTop: "40px",
  paddingTop: "20px",
};

const footerText = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 10px",
  textAlign: "center" as const,
};

const footerLink = {
  color: "#556cd6",
  fontSize: "14px",
  textDecoration: "underline",
  textAlign: "center" as const,
  display: "block",
}; 
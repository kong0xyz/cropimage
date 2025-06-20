import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
  name: string;
  verificationUrl: string;
}

export const VerificationEmail = ({
  name = "用户",
  verificationUrl = "https://example.com/verify",
}: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>验证您的邮箱地址</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src="/logo.png"
            width="120"
            height="36"
            alt="Next Maker"
            style={logo}
          />
        </Section>
        <Section style={content}>
          <Text style={heading}>验证您的邮箱地址</Text>
          <Text style={paragraph}>
            您好 {name}，
          </Text>
          <Text style={paragraph}>
            感谢您注册 Next Maker！为了完成注册，请点击下面的按钮验证您的邮箱地址：
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={verificationUrl}>
              验证邮箱
            </Button>
          </Section>
          <Text style={paragraph}>
            如果按钮无法点击，您也可以复制以下链接到浏览器中打开：
          </Text>
          <Text style={link}>
            <Link href={verificationUrl} style={linkStyle}>
              {verificationUrl}
            </Link>
          </Text>
          <Text style={paragraph}>
            此链接将在 24 小时后失效。如果您没有注册 Next Maker 账户，请忽略此邮件。
          </Text>
          <Text style={footer}>
            最好的祝愿，
            <br />
            Next Maker 团队
          </Text>
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
  textAlign: "center" as const,
  marginBottom: "32px",
};

const logo = {
  margin: "0 auto",
};

const content = {
  padding: "0 48px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
  textAlign: "center" as const,
  marginBottom: "32px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
  marginBottom: "16px",
};

const buttonContainer = {
  textAlign: "center" as const,
  marginTop: "32px",
  marginBottom: "32px",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 24px",
  fontWeight: "600",
};

const link = {
  fontSize: "14px",
  color: "#484848",
  marginBottom: "16px",
};

const linkStyle = {
  color: "#067df7",
  textDecoration: "underline",
};

const footer = {
  fontSize: "14px",
  color: "#898989",
  marginTop: "32px",
};

export default VerificationEmail; 
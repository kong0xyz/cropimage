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

interface ResetPasswordEmailProps {
  name: string;
  resetUrl: string;
}

export const ResetPasswordEmail = ({
  name = "用户",
  resetUrl = "https://example.com/reset-password",
}: ResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>重置您的密码</Preview>
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
          <Text style={heading}>重置您的密码</Text>
          <Text style={paragraph}>
            您好 {name}，
          </Text>
          <Text style={paragraph}>
            我们收到了您重置 Next Maker 账户密码的请求。点击下面的按钮设置新密码：
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={resetUrl}>
              重置密码
            </Button>
          </Section>
          <Text style={paragraph}>
            如果按钮无法点击，您也可以复制以下链接到浏览器中打开：
          </Text>
          <Text style={link}>
            <Link href={resetUrl} style={linkStyle}>
              {resetUrl}
            </Link>
          </Text>
          <Text style={paragraph}>
            此链接将在 1 小时后失效。如果您没有请求重置密码，请忽略此邮件，您的密码不会被更改。
          </Text>
          <Text style={securityNote}>
            <strong>安全提醒：</strong>如果您经常收到此类邮件，可能有人在尝试访问您的账户。建议您立即登录并更改密码。
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
  backgroundColor: "#dc2626",
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

const securityNote = {
  fontSize: "14px",
  color: "#dc2626",
  backgroundColor: "#fef2f2",
  padding: "12px",
  borderRadius: "6px",
  marginBottom: "16px",
  border: "1px solid #fecaca",
};

const footer = {
  fontSize: "14px",
  color: "#898989",
  marginTop: "32px",
};

export default ResetPasswordEmail; 
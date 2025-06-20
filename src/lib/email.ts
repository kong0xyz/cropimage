import { ResetPasswordEmail } from "@/components/emails/reset-password-email";
import { VerificationEmail } from "@/components/emails/verification-email";
import { VerificationCodeEmail } from "@/components/emails/verification-code-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailOptions {
  to: string;
  subject: string;
  react?: React.ReactNode;
}

export async function sendEmail({ to, subject, react }: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to,
      subject,
      react,
    });

    if (error) {
      console.error("邮件发送失败:", error);
      throw new Error("邮件发送失败");
    }

    return data;
  } catch (error) {
    console.error("邮件发送错误:", error);
    throw error;
  }
}

export async function sendVerificationEmail({
  to,
  name,
  verificationUrl,
}: {
  to: string;
  name: string;
  verificationUrl: string;
}) {
  const verificationEmail = VerificationEmail({ name, verificationUrl });

  return sendEmail({
    to,
    subject: "验证您的邮箱地址",
    react: verificationEmail,
  });
}

export async function sendResetPasswordEmail({
  to,
  name,
  resetUrl,
}: {
  to: string;
  name: string;
  resetUrl: string;
}) {
  const resetPasswordEmail = ResetPasswordEmail({ name, resetUrl });

  return sendEmail({
    to,
    subject: "重置您的密码",
    react: resetPasswordEmail,
  });
}

export async function sendVerificationCodeEmail({
  to,
  code,
}: {
  to: string;
  code: string;
}) {
  const verificationCodeEmail = VerificationCodeEmail({ code });

  return sendEmail({
    to,
    subject: "您的注册验证码",
    react: verificationCodeEmail,
  });
}

import { createAuthClient } from "better-auth/react";
import { stripeClient } from "@better-auth/stripe/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [
    stripeClient({
      subscription: true,
    }),
  ],
});

// 导出基本方法
export const {
  useSession,
  signIn,
  signUp,
  signOut,
  getSession,
  updateUser,
  changePassword,
  resetPassword,
  forgetPassword,
  sendVerificationEmail,
  verifyEmail,
  linkSocial,
  unlinkAccount,
  listAccounts,
  deleteUser,
  // Stripe 订阅相关方法
  subscription,
} = authClient;

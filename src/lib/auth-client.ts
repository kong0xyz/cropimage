import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
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
  sendVerificationEmail,
  verifyEmail,
  linkSocial,
  unlinkAccount,
  listAccounts,
  deleteUser,
} = authClient;

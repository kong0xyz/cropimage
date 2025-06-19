import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
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
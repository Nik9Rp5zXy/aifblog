"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-sm text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
    >
      <LogOut className="w-5 h-5" />
      <span>Çıkış Yap</span>
    </button>
  );
}

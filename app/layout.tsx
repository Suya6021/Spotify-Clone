import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

import UserProvider from "@/providers/UserProvider";
import ModelProvider from "@/providers/ModelProvider";
import getSongsByUserID from "@/action/getSongsByUserID";


const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify-Clone",
  description: "Listen to your favorite music for free",
};
export const revalidate=0;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const UserSong=await getSongsByUserID();
  return (
    <html lang="en">
      <body className={font.className}>
       
          <UserProvider>
            <ModelProvider />
            <Sidebar songs={UserSong}>{children}</Sidebar>
          </UserProvider>
        
      </body>
    </html>
  );
}

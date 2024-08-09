import { Inter, Lato } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import Sidebar from "@/components/Sidebar";
import News from "@/components/News";
import SesssionWrapper from "@/components/SesssionWrapper";
import CommentModal from "@/components/CommentModal";
import ProfileModal from "@/components/ProfileModal";
import MobileAdminHeader from "@/components/MobileAdminHeader";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ['100', '300', '400', '700', '900']
})

export const metadata = {
  title: "X Clone",
  description: "An X clone website built with Next js and Firebase",
};

export default function RootLayout({ children }) {
  return (
    <SesssionWrapper>
    <html lang="en">
      <body className={lato.variable}>
          <Provider>
            <div className="flex justify-between max-w-6xl mx-auto">
              <div className="hidden sm:inline border-r h-screen sticky top-0"><Sidebar/></div>

              <div className="max-w-2xl flex-1">
                {children}
                <MobileAdminHeader/>
              </div>

                <div className="lg:flex-col p-3 h-screen border-l dark:border-gray-500 hidden lg:flex w-[24rem]">
                  <div className='sticky top-0 py-2'>
                    <input type="text" className="bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-800 rounded-3xl text-sm w-full px-4 py-2" />
                  </div>
                  <News/>
                </div>
            </div>
            <CommentModal/>   
            <ProfileModal/>     
          </Provider>
      </body>
    </html>
    </SesssionWrapper>
  );
}

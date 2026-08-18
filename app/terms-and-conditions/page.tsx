import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import TermsPage from "./components/TermsPage";

import "../components/styles/terms-page.css";

export const metadata: Metadata = {
  title: "Terms and Conditions - Karhari Media",
  description:
    "Read Karhari Media's Terms and Conditions for music distribution, YouTube MCN, Content ID and revenue collection services.",
};

export default function TermsAndConditions() {
  return (
    <main className="km-terms-page min-h-screen">
      <Navbar />
      <TermsPage />
    </main>
  );
}

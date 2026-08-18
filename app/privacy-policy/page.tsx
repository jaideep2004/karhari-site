import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";

import "../components/styles/terms-page.css";

export const metadata: Metadata = {
  title: "Privacy Policy - Karhari Media",
  description:
    "Learn how Karhari Media collects, uses and safeguards your personal data in accordance with Indian data protection laws.",
};

export default function PrivacyPolicy() {
  return (
    <main className="km-terms-page min-h-screen">
      <Navbar />
      <PrivacyPolicyPage />
    </main>
  );
}

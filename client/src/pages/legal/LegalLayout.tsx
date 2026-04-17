import { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

interface LegalLayoutProps {
  title: string;
  updated: string;
  children: ReactNode;
}

export default function LegalLayout({ title, updated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-[#06091a] text-gray-200">
      <div className="container max-w-3xl mx-auto py-12 px-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>

        <h1
          className="text-3xl sm:text-4xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h1>
        <p className="text-gray-500 text-sm mb-10" style={{ fontFamily: "var(--font-body)" }}>
          Редакция от {updated}
        </p>

        <article className="legal-prose" style={{ fontFamily: "var(--font-body)" }}>
          {children}
        </article>

        <footer className="mt-16 pt-8 border-t border-white/5 text-gray-500 text-xs text-center" style={{ fontFamily: "var(--font-body)" }}>
          Crypto Intelligence Academy — образовательная платформа. Не является индивидуальной инвестиционной
          рекомендацией в понимании ст. 3 Закона РК «О рынке ценных бумаг».
        </footer>
      </div>
    </div>
  );
}

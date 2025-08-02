"use client";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import CreatedBy from "./CreatedBy";

export default function Footer() {
  const { theme } = useTheme();
  const { t, isRTL } = useLanguage();

  const footerClasses =
    theme === "dark"
      ? "bg-gray-900 border-t border-gray-700"
      : "bg-white border-t border-gray-200";

  const textClasses = theme === "dark" ? "text-gray-300" : "text-gray-600";

  const linkClasses =
    theme === "dark"
      ? "text-blue-400 hover:text-blue-300"
      : "text-blue-600 hover:text-blue-700";

  return (
    <footer
      className={`py-8 transition-all duration-300 ${footerClasses}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className={`text-sm ${textClasses}`}>{t("footer.description")}</p>
          <div className="mt-2 flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <span className={`text-xs ${textClasses}`}>
              {t("footer.poweredBy")}
            </span>

            <span className={`text-xs ${textClasses}`}>•</span>
            <a
              href="https://open-platform.theguardian.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-medium ${linkClasses}`}
            >
              The Guardian
            </a>
            <span className={`text-xs ${textClasses}`}>•</span>
            <a
              href="https://developer.nytimes.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-medium ${linkClasses}`}
            >
              NYT API
            </a>
          </div>
          <CreatedBy />
        </div>
      </div>
    </footer>
  );
}

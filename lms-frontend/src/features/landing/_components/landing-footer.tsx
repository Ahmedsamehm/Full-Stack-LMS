import BrandLogo from './brand-logo'

import { footerLinks } from '../_data/landing.mock'

export default function LandingFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border px-4 sm:px-6 lg:px-8 pb-8 pt-12 sm:pb-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <BrandLogo />
            <p className="text-sm text-muted-foreground">
              &copy; {year} EduPro. All rights reserved.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <span className="text-sm text-muted-foreground cursor-default">
                    {link.label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

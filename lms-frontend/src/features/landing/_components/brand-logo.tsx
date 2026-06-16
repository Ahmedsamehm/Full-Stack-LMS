import { Link } from '@tanstack/react-router'
import { GraduationCap } from 'lucide-react'

export default function BrandLogo() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 no-underline!  shrink-0"
    >
      <GraduationCap className="h-7 w-7 text-primary" />
      <span className="text-lg font-bold text-foreground">EduPro</span>
    </Link>
  )
}

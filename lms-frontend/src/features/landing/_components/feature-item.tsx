import { Check } from 'lucide-react'

interface FeatureItemProps {
  text: string
}

export default function FeatureItem({ text }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-3 w-3 text-primary" />
      </span>
      <span className="text-base text-muted-foreground">{text}</span>
    </div>
  )
}

interface CourseAboutProps {
  description: string
}

export default function CourseAbout({ description }: CourseAboutProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-foreground mb-4">About This Course</h2>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </section>
  )
}

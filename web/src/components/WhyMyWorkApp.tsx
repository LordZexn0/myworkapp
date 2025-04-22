'use client'

type Props = {
  heading: string
  description: string
  bullets?: string[]
  imageUrl?: string
}

export default function WhyMyWorkApp({
  heading,
  description,
  bullets = [],
  imageUrl,
}: Props) {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {heading}
          </h2>
          <p className="text-gray-600 text-lg">{description}</p>

          {bullets.length > 0 && (
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {bullets.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Image */}
        <div className="flex-1">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Why MyWorkApp"
              className="rounded-xl shadow-lg"
            />
          )}
        </div>
      </div>
    </section>
  )
}

  
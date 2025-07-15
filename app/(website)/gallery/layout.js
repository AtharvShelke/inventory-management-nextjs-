export const metadata = {
  title: "Gallery | Enrich Kitchen Studio",
  description: "Browse our gallery of completed kitchen design and remodeling projects by Enrich Kitchen Studio.",
  alternates: { canonical: "https://www.enrichfurniture.com/gallery" },
};

export default function GalleryLayout({ children }) {
  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.enrichfurniture.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Gallery",
                  "item": "https://www.enrichfurniture.com/gallery"
                }
              ]
            })
          }}
        />
      </head>
      {children}
    </>
  );
} 
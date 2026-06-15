/**
 * Reusable Schema Components
 * Use these to add structured data to your pages
 */

interface SchemaProps {
  schema: object | object[]
}

export function StructuredData({ schema }: SchemaProps) {
  const schemaString = JSON.stringify(schema, null, 0)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaString }}
    />
  )
}

// Convenience components for specific schema types
export function ArticleSchema({ schema }: { schema: object }) {
  return <StructuredData schema={schema} />
}

export function FAQSchema({ schema }: { schema: object }) {
  return <StructuredData schema={schema} />
}

export function HowToSchema({ schema }: { schema: object }) {
  return <StructuredData schema={schema} />
}

export function OrganizationSchema({ schema }: { schema: object }) {
  return <StructuredData schema={schema} />
}

export function WebSiteSchema({ schema }: { schema: object }) {
  return <StructuredData schema={schema} />
}

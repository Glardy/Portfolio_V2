// src/components/Markdown.jsx
// Rendu Markdown minimal sans dépendance externe.
// Supporte : titres h2/h3, paragraphes, listes, gras, code inline.

export default function Markdown({ content }) {
  if (!content) return null

  const lines = content.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="mt-8 mb-3 text-xl font-bold tracking-tight text-zinc-900">
          {inline(line.slice(3))}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="mt-6 mb-2 text-base font-semibold text-zinc-800">
          {inline(line.slice(4))}
        </h3>
      )
    } else if (line.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(<li key={i}>{inline(lines[i].slice(2))}</li>)
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 ml-5 list-disc space-y-1 text-sm text-zinc-600">
          {items}
        </ul>
      )
      continue
    } else if (line.trim() !== '') {
      elements.push(
        <p key={i} className="my-3 text-sm leading-7 text-zinc-600">
          {inline(line)}
        </p>
      )
    }

    i++
  }

  return <div>{elements}</div>
}

function inline(text) {
  const parts = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    const codeMatch = remaining.match(/`(.+?)`/)

    const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity
    const codeIdx = codeMatch ? remaining.indexOf(codeMatch[0]) : Infinity

    if (boldMatch && boldIdx <= codeIdx) {
      if (boldIdx > 0) parts.push(remaining.slice(0, boldIdx))
      parts.push(<strong key={key++} className="font-semibold text-zinc-900">{boldMatch[1]}</strong>)
      remaining = remaining.slice(boldIdx + boldMatch[0].length)
    } else if (codeMatch && codeIdx < boldIdx) {
      if (codeIdx > 0) parts.push(remaining.slice(0, codeIdx))
      parts.push(<code key={key++} className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">{codeMatch[1]}</code>)
      remaining = remaining.slice(codeIdx + codeMatch[0].length)
    } else {
      parts.push(remaining)
      break
    }
  }

  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts
}

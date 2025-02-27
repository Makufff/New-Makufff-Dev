export default function getPlaceholderImage(text: string) {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/svg" width="300" height="200" viewBox="0 0 300 200">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#666" text-anchor="middle" dy=".3em">
        ${text}
      </text>
    </svg>
  `)}`
} 
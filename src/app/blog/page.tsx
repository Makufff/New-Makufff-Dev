import Link from "next/link"
import { getSortedPostsData } from "@/lib/markdown"

function getStatusColor(status: string | undefined) {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-300'
    case 'archived':
      return 'bg-gray-100 text-gray-800 border-gray-300'
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 border-blue-300'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}

function getStatusText(status: string | undefined) {
  switch (status) {
    case 'active':
      return 'Active'
    case 'archived':
      return 'Archived'
    case 'in-progress':
      return 'In Progress'
    default:
      return 'Unknown'
  }
}

export default async function Blog() {
  const blogPosts = await getSortedPostsData()

  return (
    <div className="min-h-screen bg-[#E2E2E2] text-[#222222] font-['Chicago']">
      <header className="bg-[#CCCCCC] border-b-2 border-[#999999] p-2 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold px-4 py-1 bg-white border-2 border-[#999999] rounded shadow-inner hover:bg-[#DDDDDD]">
            ← Home
          </Link>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white border-2 border-[#999999] p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 bg-[#CCCCCC] p-2 rounded border border-[#999999]">
            Latest Articles
          </h2>
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="group">
                <div className="bg-[#F5F5F5] p-4 rounded-lg border-2 border-[#999999] hover:shadow-md transition-all duration-200 hover:translate-x-1 hover:-translate-y-1">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold mb-2 bg-[#CCCCCC] px-3 py-1 rounded inline-block">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 font-mono">{post.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(post.status)}`}>
                          {getStatusText(post.status)}
                        </span>
                      </div>
                    </div>
                    <p className="mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex justify-between items-center mt-2">
                      <Link 
                        href={`/blog/${post.id}`} 
                        className="inline-block px-4 py-2 bg-[#DDDDDD] text-[#222222] border-2 border-[#999999] rounded shadow group-hover:bg-[#CCCCCC]"
                      >
                        Read More →
                      </Link>
                      {post.projectUrl && (
                        <a 
                          href={post.projectUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-block px-4 py-2 bg-[#4A90E2] text-white border-2 border-[#2171C7] rounded shadow hover:bg-[#357ABD] transition-colors"
                        >
                          Visit Project →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-[#CCCCCC] border-t-2 border-[#999999] p-4 mt-8">
        <div className="max-w-4xl mx-auto text-center font-mono text-sm">
          <p>© 2025 Tanapat Chamted. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}


import { getPostData } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

interface PageProps {
  params: { id: string };
}

async function MarkdownContent({ content }: { content: string }) {
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .use(remarkGfm)
    .process(content)
  
  return (
    <div 
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: processedContent.toString() }} 
    />
  )
}

export default async function BlogPost({ params }: PageProps) {
  try {
    const post = await getPostData(params.id);
    if (!post) return notFound();

    return (
      <div className="min-h-screen bg-[#E2E2E2] text-[#222222] font-['Chicago']">
        {/* Header */}
        <header className="bg-[#CCCCCC] border-b-2 border-[#999999] p-2 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/blog" className="text-xl font-bold px-4 py-1 bg-white border-2 border-[#999999] rounded shadow-inner hover:bg-[#DDDDDD]">
              ← Back
            </Link>
            <div className="flex items-center gap-2">
              {post.status && (
                <span className={`px-3 py-1 rounded-full text-sm border ${
                  post.status === 'active' ? 'bg-green-100 text-green-800 border-green-300' :
                  post.status === 'archived' ? 'bg-gray-100 text-gray-800 border-gray-300' :
                  'bg-blue-100 text-blue-800 border-blue-300'
                }`}>
                  {post.status}
                </span>
              )}
              {post.projectUrl && (
                <a 
                  href={post.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1 bg-[#4A90E2] text-white border-2 border-[#2171C7] rounded shadow hover:bg-[#357ABD] transition-colors"
                >
                  Visit Project →
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto p-6">
          <article className="bg-white border-2 border-[#999999] rounded-lg shadow-lg">
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4 bg-[#CCCCCC] p-3 rounded border border-[#999999]">
                {post.title}
              </h1>
              <div className="text-gray-600 mb-6 font-mono border-b-2 border-[#CCCCCC] pb-4">
                Published on {post.date}
              </div>
              
              {/* Render Image if Exists */}
              {post.image && post.image.trim() !== "" && (
                <Image 
                  src={post.image} 
                  alt={post.title || "Blog post image"}
                  width={800}
                  height={400}
                  layout="responsive"
                  className="rounded-lg border-2 border-[#999999] mb-6"
                />
              )}

              {/* Replace the SanitizedContent with MarkdownContent */}
              <MarkdownContent content={post.rawContent} />
            </div>
          </article>
        </main>

        {/* Footer */}
        <footer className="bg-[#CCCCCC] border-t-2 border-[#999999] p-4 mt-8">
          <div className="max-w-4xl mx-auto text-center font-mono text-sm">
            <p>© 2024 Tanapat Chamted. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error("Error in BlogPost:", error);
    return notFound();
  }
}

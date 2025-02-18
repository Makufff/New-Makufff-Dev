import { getAllPosts } from "@/lib/posts"
import Link from "next/link"
import Image from "next/image"
import { BlogPost } from "@/lib/markdown"

// Define BlogCard component with proper typing
function BlogCard({ post }: { post: Omit<BlogPost, 'content' | 'rawContent'> }) {
  return (
    <Link href={`/blog/${post.id}`} className="block">
      <div className="border-2 border-[#999999] rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
        {post.image && (
          <div className="relative h-48">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-600 text-sm mb-2">{new Date(post.date).toLocaleDateString()}</p>
          <p className="text-gray-700">{post.excerpt}</p>
          {post.status && (
            <span className={`inline-block px-2 py-1 mt-2 text-sm rounded-full ${
              post.status === 'active' ? 'bg-green-100 text-green-800 border-green-300' :
              post.status === 'archived' ? 'bg-gray-100 text-gray-800 border-gray-300' :
              'bg-blue-100 text-blue-800 border-blue-300'
            } border`}>
              {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default async function BlogPage() {
  try {
    const posts = await getAllPosts();
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">No blog posts available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <div className="text-center py-8">
          <p className="text-gray-600">Unable to load blog posts at this time.</p>
          <p className="text-sm text-gray-500 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }
}

// Force static generation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour


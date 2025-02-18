import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

export interface BlogPost {
  rawContent: string
  id: string
  title: string
  date: string
  excerpt: string
  image: string
  content: string
  status?: 'active' | 'archived' | 'in-progress'
  projectUrl?: string
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function getAllPostIds(): Promise<string[]> {
  const response = await fetch(`${baseUrl}/api/posts`)
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }
  const posts = await response.json()
  return posts.map((post: BlogPost) => post.id)
}

export async function getPostData(id: string): Promise<BlogPost> {
  const response = await fetch(`${baseUrl}/api/posts/${id}`, { next: { revalidate: 3600 } })
  if (!response.ok) {
    throw new Error('Failed to fetch post')
  }
  const { content, ...metadata } = await response.json()

  // Process markdown content using unified
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content)

  const contentHtml = processedContent.toString()

  return {
    id,
    content: contentHtml,
    ...metadata
  }
}

export async function getSortedPostsData(): Promise<Omit<BlogPost, 'content'>[]> {
  const response = await fetch(`${baseUrl}/api/posts`, { next: { revalidate: 3600 } })
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }
  const posts = await response.json()
  return posts.sort((a: BlogPost, b: BlogPost) => (a.date < b.date ? 1 : -1))
} 
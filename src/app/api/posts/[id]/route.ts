import { NextResponse } from 'next/server'
import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'posts')

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const files = fs.readdirSync(postsDirectory)
  return files.map((filename) => ({
    id: filename.replace(/\.md$/, '')
  }))
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const resolvedParams = await params
    const fullPath = path.join(postsDirectory, `${resolvedParams.id}.md`)

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    console.log(fileContents);
    
    const { data, content } = matter(fileContents)

    const processedContent = await remark()
      .use(html, { 
        sanitize: false,
        allowDangerousHtml: true
      })
      .use(remarkGfm)
      .process(content)

    const contentHtml = processedContent.toString()

    return NextResponse.json({
      ...data,
      content: contentHtml,
      rawContent: content
    })
  } catch (error) {
    console.error('Error reading post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
} 
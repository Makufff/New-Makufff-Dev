import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function GET() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      ...(matterResult.data as { 
        title: string
        date: string
        excerpt: string
        status: 'active' | 'archived' | 'in-progress'
        projectUrl?: string 
      })
    }
  })

  return NextResponse.json(allPostsData)
} 
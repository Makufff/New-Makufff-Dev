import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getAllPosts() {
  try {
    const postsDirectory = path.join(process.cwd(), 'posts');
    
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn('Posts directory not found, creating empty directory');
      fs.mkdirSync(postsDirectory, { recursive: true });
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md')) // Only process markdown files
      .map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        
        return {
          id,
          title: matterResult.data.title || 'Untitled',
          date: matterResult.data.date || new Date().toISOString(),
          excerpt: matterResult.data.excerpt || '',
          content: matterResult.content,
          image: matterResult.data.image || '',
          status: matterResult.data.status || 'active',
        };
      });

    // Sort posts by date
    return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
  } catch (error) {
    console.error("Error reading posts:", error);
    return [];
  }
} 
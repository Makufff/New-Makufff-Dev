"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stepAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
}

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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#E2E2E2] text-[#222222] font-['Chicago']">
      <header className="bg-[#CCCCCC] border-b-2 border-[#999999] p-2 sticky top-0 z-10">
        <nav className="max-w-4xl mx-auto flex justify-between items-center">
          <motion.h1 className="text-2xl font-bold step-fade-in" {...stepAnimation}>
            Tanapat Chamted
          </motion.h1>
          <div className="space-x-2">
            <Button variant="secondary" className="bg-[#DDDDDD] text-[#222222] border border-[#999999] step-pulse">
              <Link href="/">Home</Link>
            </Button>
            <Button variant="secondary" className="bg-[#DDDDDD] text-[#222222] border border-[#999999] step-pulse">
              <Link href="/blog">Blog</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <motion.div
          className="flex flex-col md:flex-row gap-6 mb-6"
          {...stepAnimation}
          transition={{ delay: 0.2, ...stepAnimation.transition }}
        >
          <Card className="bg-white border-2 border-[#999999] md:w-1/3">
            <CardContent className="p-4">
              <motion.div className="step-zoom" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Image
                  src="/profile.jpg?height=300&width=300"
                  alt="Tanapat Chamted"
                  width={300}
                  height={300}
                  className="rounded-lg border-2 border-[#999999] mb-4"
                />
              </motion.div>
              <h2 className="text-xl font-bold mb-2">Tanapat Chamted</h2>
              <p className="mb-2">AI/ML Enthusiast & Developer</p>
              <p className="mb-2">
                <strong>Email:</strong>
                <a href="mailto:makufff.tanapat@gmail.com" className="ml-2">
                  makufff.tanapat@gmail.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong> 098 018 0495
              </p>
              <p>
                <strong>Website:</strong> makufff.dev
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-2 border-[#999999] md:w-2/3">
            <CardHeader>
              <CardTitle className="text-xl bg-slate-300 px-2 rounded-md">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                eiei
              </p>
              <div className="mt-4">
                <h3 className="font-bold mb-2 bg-slate-300 px-2 rounded-md">Education</h3>
                <p>
                  <strong>King Mongkut&apos;s Institute of Technology Ladkrabang</strong>
                </p>
                <p>BS in Information Technology</p>
                <p>Jul 2024 - Present</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Card className="mb-6 bg-white border-2 border-[#999999]">
            <CardHeader>
              <CardTitle className="text-xl  bg-slate-300 px-2 rounded-md">Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Fridayz VPS",
                    role: "Co-Founder & Full Stack Developer",
                    period: "2024 - Present",
                    details: [
                      "Designed and developed static website using NextJS",
                      "Developing web application with NextJS, Xen Orchestra, and PostgreSQL",
                    ],
                  },
                  {
                    title: "V89 Technology",
                    role: "ComputerVision & LLM Intern",
                    period: "Aug 2024 – Oct 2024",
                    details: [
                      "Implemented deep learning model for object recognition",
                      "Compressed and implemented YOLO model for CPU",
                      "Applied computer vision models in Web Applications",
                    ],
                  },
                ].map((job, index) => (
                  <motion.div
                    key={index}
                    className="border-2 border-[#999999] p-4 rounded-lg step-highlight"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h3 className="font-bold mb-2">{job.title}</h3>
                    <p className="text-sm mb-1">{job.role}</p>
                    <p className="text-sm mb-2">{job.period}</p>
                    <ul className="list-disc pl-5 text-sm">
                      {job.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 bg-white border-2 border-[#999999]">
            <CardHeader>
              <CardTitle className="text-xl bg-slate-300 px-2 rounded-md">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Image Captioning & Raspberry Pi",
                    description: "Electronic classroom with synchronized drawing",
                    tools: "Python, FastAPI, Huggingface",
                    status: "active",
                    projectUrl: "https://github.com/yourusername/image-captioning"
                  },
                  {
                    title: "Camera Workflow",
                    description: "Automated photo editing with Adobe Lightroom",
                    tools: "Lua, Google API",
                    status: "in-progress",
                    projectUrl: "https://github.com/yourusername/camera-workflow"
                  },
                  {
                    title: "Flashboi",
                    description: "AI-powered flashcard generation from PDFs",
                    tools: "Python, Together AI, Llama-index",
                    status: "archived",
                    projectUrl: "https://github.com/yourusername/flashboi"
                  },
                ].map((project, index) => (
                  <motion.div
                    key={index}
                    className="border-2 border-[#999999] p-4 rounded-lg step-highlight bg-[#F5F5F5]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg bg-[#CCCCCC] px-3 py-1 rounded inline-block">
                        {project.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(project.status)}`}>
                        {getStatusText(project.status)}
                      </span>
                    </div>
                    <p className="text-sm mb-3">{project.description}</p>
                    <p className="text-xs italic mb-4">Tools: {project.tools}</p>
                    <div className="flex justify-between items-center mt-2">
                      
                      {project.projectUrl && (
                        <a 
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold inline-block px-4 py-2 bg-[#ffffff] text-green-500 border-2 border-green-500 rounded shadow hover:bg-[#eeeeee] transition-colors text-sm"
                        >
                          <span className="text-red-500">กด2ที</span>ดูโปรเจค →
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <CardContent>
          <motion.div
           className="border-2 border-[#999999] p-4 rounded-lg step-highlight bg-white grid grid-flow-col space-x-4"
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           >
              <Image 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" 
                height={30} 
                width={30}
                alt="rust logo" 
              />
              <Image 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" 
                height={30} 
                width={30}
                alt="bash logo" 
              />
              <Image 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
                height={30} 
                width={30}
                alt="python logo" 
              />
              <Image 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" 
                height={30} 
                width={30}
                alt="cplusplus logo" 
              />
              <Image 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" 
                height={30} 
                width={30}
                alt="typescript logo" 
              />
              <Image 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" 
                height={30} 
                width={30}
                alt="nextjs logo" 
              />
              <Image 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg" 
                height={30} 
                width={30}
                alt="anaconda logo" 
              />
              <Image 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" 
                height={30} 
                width={30}
                alt="jupyter logo" 
              />
              <Image 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nixos/nixos-original.svg" 
                height={30} 
                width={30}
                alt="nixos logo" 
              />
              <Image 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" 
                height={30} 
                width={30}
                alt="pytorch logo" 
              />
          </motion.div>
          </CardContent>
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link href="https://fridayz.cloud">
            <Image
              src="/banner.gif"
              alt="Welcome GIF"
              width={400}
              height={100}
              className="mx-auto border-2 border-[#999999] step-bounce w-max"
            />
          </Link>
        </motion.div>
      </main>
    </div>
  )
}


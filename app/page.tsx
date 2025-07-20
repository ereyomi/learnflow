"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Book,
  Video,
  Wrench,
  ClipboardList,
  Code,
  ChevronRight,
  ArrowLeft,
  Play,
  ExternalLink,
} from "lucide-react"

export default function Component() {
  const [currentView, setCurrentView] = useState<"paths" | "modules" | "resources">("paths")
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const learningPaths = [
    {
      id: "video-editing",
      name: "Video Editing Fundamentals",
      description: "Master the basics of video editing, from software essentials to advanced techniques.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "8 weeks",
      level: "Beginner",
      modules: [
        {
          id: "intro-ve",
          name: "Introduction to Video Editing",
          description: "Learn the basics of video editing and industry standards",
          duration: "1 week",
        },
        {
          id: "software-basics",
          name: "Software Basics (Premiere Pro)",
          description: "Get familiar with Adobe Premiere Pro interface and tools",
          duration: "2 weeks",
        },
        {
          id: "timeline-editing",
          name: "Timeline Editing & Transitions",
          description: "Master timeline editing and smooth transitions",
          duration: "1.5 weeks",
        },
        {
          id: "audio-mixing",
          name: "Audio Mixing & Sound Design",
          description: "Learn professional audio editing techniques",
          duration: "2 weeks",
        },
        {
          id: "color-grading",
          name: "Color Grading & Correction",
          description: "Advanced color correction and grading workflows",
          duration: "1.5 weeks",
        },
      ],
    },
    {
      id: "coding-basics",
      name: "Coding for Beginners",
      description: "Learn the foundational concepts of programming, starting with Python.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "10 weeks",
      level: "Beginner",
      modules: [
        {
          id: "intro-coding",
          name: "What is Coding?",
          description: "Understanding programming fundamentals and concepts",
          duration: "1 week",
        },
        {
          id: "python-syntax",
          name: "Python Syntax & Data Types",
          description: "Learn Python basics, variables, and data types",
          duration: "2 weeks",
        },
        {
          id: "control-flow",
          name: "Control Flow & Functions",
          description: "Master loops, conditions, and function creation",
          duration: "2.5 weeks",
        },
        {
          id: "data-structures",
          name: "Basic Data Structures",
          description: "Work with lists, dictionaries, and sets",
          duration: "2 weeks",
        },
        {
          id: "oop-intro",
          name: "Introduction to OOP",
          description: "Object-oriented programming concepts in Python",
          duration: "2.5 weeks",
        },
      ],
    },
    {
      id: "web-development",
      name: "Web Development Essentials",
      description: "Build modern websites with HTML, CSS, and JavaScript.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "12 weeks",
      level: "Intermediate",
      modules: [
        {
          id: "html-basics",
          name: "HTML Fundamentals",
          description: "Structure web pages with semantic HTML",
          duration: "2 weeks",
        },
        {
          id: "css-styling",
          name: "CSS Styling & Layout",
          description: "Style and layout web pages with CSS",
          duration: "3 weeks",
        },
        {
          id: "javascript-basics",
          name: "JavaScript Fundamentals",
          description: "Add interactivity with JavaScript",
          duration: "4 weeks",
        },
        {
          id: "responsive-design",
          name: "Responsive Web Design",
          description: "Create mobile-friendly websites",
          duration: "2 weeks",
        },
        {
          id: "web-projects",
          name: "Building Web Projects",
          description: "Apply skills in real-world projects",
          duration: "1 week",
        },
      ],
    },
  ]

  const resources = [
    // Video Editing Resources
    {
      id: "resource-1",
      title: "Understanding the Premiere Pro Interface",
      description: "A comprehensive guide to navigating Adobe Premiere Pro's workspace.",
      type: "video",
      thumbnail: "/placeholder.svg?height=180&width=320",
      pathId: "video-editing",
      moduleId: "software-basics",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "15 min",
    },
    {
      id: "resource-2",
      title: "The Art of Storytelling in Video",
      description: "Learn how to craft compelling narratives through your video edits.",
      type: "article",
      thumbnail: "/placeholder.svg?height=180&width=320",
      pathId: "video-editing",
      moduleId: "intro-ve",
      url: "https://www.example.com/storytelling-article",
      duration: "8 min read",
    },
    {
      id: "resource-3",
      title: "Essential Keyboard Shortcuts for Faster Editing",
      description: "Boost your editing speed with these must-know shortcuts.",
      type: "tool",
      thumbnail: "/placeholder.svg?height=180&width=320",
      pathId: "video-editing",
      moduleId: "software-basics",
      url: "https://www.example.com/editing-shortcuts-tool",
      duration: "Reference",
    },
    {
      id: "resource-4",
      title: "Practice Project: Edit a Short Travel Vlog",
      description: "Apply your skills by editing a provided travel vlog footage.",
      type: "practice",
      thumbnail: "/placeholder.svg?height=180&width=320",
      pathId: "video-editing",
      moduleId: "timeline-editing",
      url: "https://www.example.com/travel-vlog-practice",
      duration: "2 hours",
    },
    // Coding Resources
    {
      id: "resource-5",
      title: "Python Variables and Data Types Explained",
      description: "A beginner-friendly introduction to variables, numbers, strings, and booleans in Python.",
      type: "video",
      thumbnail: "/placeholder.svg?height=180&width=320",
      pathId: "coding-basics",
      moduleId: "python-syntax",
      url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
      duration: "22 min",
    },
    {
      id: "resource-6",
      title: "Your First Python Program: 'Hello, World!'",
      description: "Write and run your very first Python program.",
      type: "practice",
      thumbnail: "/placeholder.svg?height=180&width=320",
      pathId: "coding-basics",
      moduleId: "intro-coding",
      url: "https://www.example.com/hello-world-practice",
      duration: "30 min",
    },
    {
      id: "resource-7",
      title: "Understanding Loops in Programming",
      description: "Dive deep into for and while loops and their applications.",
      type: "article",
      thumbnail: "/placeholder.svg?height=180&width=320",
      pathId: "coding-basics",
      moduleId: "control-flow",
      url: "https://www.example.com/loops-article",
      duration: "12 min read",
    },
    {
      id: "resource-8",
      title: "Online Python Interpreter Tool",
      description: "An interactive online tool to write and test Python code directly in your browser.",
      type: "tool",
      thumbnail: "/placeholder.svg?height=180&width=320",
      pathId: "coding-basics",
      moduleId: "python-syntax",
      url: "https://www.programiz.com/python-programming/online-compiler/",
      duration: "Interactive",
    },
    // Web Development Resources
    {
      id: "resource-9",
      title: "HTML5 Semantic Elements Guide",
      description: "Learn about modern HTML5 semantic elements and their proper usage.",
      type: "article",
      thumbnail: "/placeholder.svg?height=180&width=320",
      pathId: "web-development",
      moduleId: "html-basics",
      url: "https://www.example.com/html5-semantic-guide",
      duration: "10 min read",
    },
    {
      id: "resource-10",
      title: "CSS Flexbox Complete Tutorial",
      description: "Master CSS Flexbox layout with practical examples.",
      type: "video",
      thumbnail: "/placeholder.svg?height=180&width=320",
      pathId: "web-development",
      moduleId: "css-styling",
      url: "https://www.youtube.com/watch?v=JJSoEo8JSnc",
      duration: "35 min",
    },
  ]

  const getCurrentPath = () => learningPaths.find((path) => path.id === selectedPath)
  const getCurrentModule = () => getCurrentPath()?.modules.find((module) => module.id === selectedModule)
  const getCurrentResources = () =>
    resources.filter((resource) => resource.pathId === selectedPath && resource.moduleId === selectedModule)

  const handlePathClick = (pathId: string) => {
    setSelectedPath(pathId)
    setCurrentView("modules")
    setSelectedModule(null)
  }

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId)
    setCurrentView("resources")
  }

  const handleBackToModules = () => {
    setCurrentView("modules")
    setSelectedModule(null)
  }

  const handleBackToPaths = () => {
    setCurrentView("paths")
    setSelectedPath(null)
    setSelectedModule(null)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "article":
        return <Book className="h-4 w-4" />
      case "tool":
        return <Wrench className="h-4 w-4" />
      case "practice":
        return <ClipboardList className="h-4 w-4" />
      default:
        return <Book className="h-4 w-4" />
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
        <div className="mb-6 flex items-center gap-2">
          <Code className="h-6 w-6" />
          <span className="text-lg font-semibold">LearnFlow</span>
        </div>
        <ScrollArea className="flex-1">
          <nav className="grid gap-2">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Learning Paths</h3>
            {learningPaths.map((path) => (
              <div key={path.id} className="grid gap-1">
                <button
                  onClick={() => handlePathClick(path.id)}
                  className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-muted text-left ${
                    selectedPath === path.id ? "bg-muted" : ""
                  }`}
                >
                  <span>{path.name}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                {selectedPath === path.id && (
                  <div className="ml-4 grid gap-1 border-l pl-4">
                    {path.modules.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => handleModuleClick(module.id)}
                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted text-left ${
                          selectedModule === module.id ? "bg-muted" : ""
                        }`}
                      >
                        {module.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 md:px-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search resources..." className="w-full rounded-lg bg-muted pl-9" />
          </div>
          <Avatar className="ml-4 h-9 w-9">
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
        </header>

        <main className="flex-1 p-4 md:p-6">
          {/* Learning Paths View */}
          {currentView === "paths" && (
            <section>
              <div className="mb-8">
                <h1 className="text-3xl font-bold">Learning Paths</h1>
                <p className="mt-2 text-muted-foreground">
                  Choose a structured learning path to master new skills step by step.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {learningPaths.map((path) => (
                  <Card
                    key={path.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handlePathClick(path.id)}
                  >
                    <CardHeader className="p-0">
                      <Image
                        src={path.thumbnail || "/placeholder.svg"}
                        alt={path.name}
                        width={300}
                        height={200}
                        className="aspect-video w-full rounded-t-lg object-cover"
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="outline">{path.level}</Badge>
                        <span className="text-sm text-muted-foreground">{path.duration}</span>
                      </div>
                      <CardTitle className="text-xl font-bold mb-2">{path.name}</CardTitle>
                      <CardDescription className="mb-4">{path.description}</CardDescription>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{path.modules.length} modules</span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Modules View */}
          {currentView === "modules" && getCurrentPath() && (
            <section>
              <div className="mb-6 flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={handleBackToPaths}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Paths
                </Button>
              </div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold">{getCurrentPath()?.name}</h1>
                <p className="mt-2 text-muted-foreground">{getCurrentPath()?.description}</p>
                <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
                  <span>Duration: {getCurrentPath()?.duration}</span>
                  <span>Level: {getCurrentPath()?.level}</span>
                  <span>Modules: {getCurrentPath()?.modules.length}</span>
                </div>
              </div>
              <div className="grid gap-4">
                {getCurrentPath()?.modules.map((module, index) => (
                  <Card
                    key={module.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleModuleClick(module.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                              {index + 1}
                            </div>
                            <CardTitle className="text-lg">{module.name}</CardTitle>
                          </div>
                          <CardDescription className="ml-11">{module.description}</CardDescription>
                          <div className="ml-11 mt-2 text-sm text-muted-foreground">Duration: {module.duration}</div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Resources View */}
          {currentView === "resources" && getCurrentModule() && (
            <section>
              <div className="mb-6 flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={handleBackToModules}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Modules
                </Button>
              </div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold">{getCurrentModule()?.name}</h1>
                <p className="mt-2 text-muted-foreground">{getCurrentModule()?.description}</p>
                <div className="mt-4 text-sm text-muted-foreground">Duration: {getCurrentModule()?.duration}</div>
              </div>

              <Tabs defaultValue="all" className="mb-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="video">
                    <Video className="mr-2 h-4 w-4" /> Video
                  </TabsTrigger>
                  <TabsTrigger value="article">
                    <Book className="mr-2 h-4 w-4" /> Article
                  </TabsTrigger>
                  <TabsTrigger value="tool">
                    <Wrench className="mr-2 h-4 w-4" /> Tool
                  </TabsTrigger>
                  <TabsTrigger value="practice">
                    <ClipboardList className="mr-2 h-4 w-4" /> Practice
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {getCurrentResources().map((resource) => (
                      <Card key={resource.id}>
                        <CardHeader className="p-0">
                          {resource.type === "video" && resource.url && getYouTubeVideoId(resource.url) ? (
                            <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
                              <iframe
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(resource.url)}`}
                                title={resource.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                              ></iframe>
                            </div>
                          ) : (
                            <div className="relative">
                              <Image
                                src={resource.thumbnail || "/placeholder.svg"}
                                alt={resource.title}
                                width={320}
                                height={180}
                                className="aspect-video w-full rounded-t-lg object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-t-lg">
                                {resource.type === "video" ? (
                                  <Play className="h-12 w-12 text-white" />
                                ) : (
                                  <ExternalLink className="h-8 w-8 text-white" />
                                )}
                              </div>
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(resource.type)}
                              <Badge variant="secondary" className="capitalize">
                                {resource.type}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">{resource.duration}</span>
                          </div>
                          <CardTitle className="text-lg font-semibold mb-2">{resource.title}</CardTitle>
                          <CardDescription className="line-clamp-2 mb-4">{resource.description}</CardDescription>
                          {resource.url && (
                            <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
                              <Button variant="outline" size="sm" className="w-full bg-transparent">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Access Resource
                              </Button>
                            </Link>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Filtered tabs */}
                {["video", "article", "tool", "practice"].map((type) => (
                  <TabsContent key={type} value={type}>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {getCurrentResources()
                        .filter((r) => r.type === type)
                        .map((resource) => (
                          <Card key={resource.id}>
                            <CardHeader className="p-0">
                              {resource.type === "video" && resource.url && getYouTubeVideoId(resource.url) ? (
                                <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
                                  <iframe
                                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(resource.url)}`}
                                    title={resource.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                  ></iframe>
                                </div>
                              ) : (
                                <div className="relative">
                                  <Image
                                    src={resource.thumbnail || "/placeholder.svg"}
                                    alt={resource.title}
                                    width={320}
                                    height={180}
                                    className="aspect-video w-full rounded-t-lg object-cover"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-t-lg">
                                    {resource.type === "video" ? (
                                      <Play className="h-12 w-12 text-white" />
                                    ) : (
                                      <ExternalLink className="h-8 w-8 text-white" />
                                    )}
                                  </div>
                                </div>
                              )}
                            </CardHeader>
                            <CardContent className="p-4">
                              <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {getTypeIcon(resource.type)}
                                  <Badge variant="secondary" className="capitalize">
                                    {resource.type}
                                  </Badge>
                                </div>
                                <span className="text-xs text-muted-foreground">{resource.duration}</span>
                              </div>
                              <CardTitle className="text-lg font-semibold mb-2">{resource.title}</CardTitle>
                              <CardDescription className="line-clamp-2 mb-4">{resource.description}</CardDescription>
                              {resource.url && (
                                <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
                                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Access Resource
                                  </Button>
                                </Link>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

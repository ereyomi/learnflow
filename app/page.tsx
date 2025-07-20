"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Book,
  Video,
  Wrench,
  ClipboardList,
  Code,
  ChevronRight,
  ArrowLeft,
  Play,
  ExternalLink,
  Monitor,
  Server,
  Smartphone,
  Database,
  Brain,
  Shield,
  Palette,
  BarChart3,
  Globe,
  Cpu,
  Plus,
} from "lucide-react"

export default function Component() {
  const [currentView, setCurrentView] = useState<"roadmaps" | "roadmap-detail" | "resources">("roadmaps")
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null)
  const [selectedStep, setSelectedStep] = useState<string | null>(null)

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const roleBasedRoadmaps = [
    {
      id: "frontend",
      title: "Frontend",
      description: "Step by step guide to becoming a modern frontend developer",
      icon: <Monitor className="h-8 w-8" />,
      color: "bg-blue-500",
      steps: [
        { id: "html-basics", title: "Learn HTML", description: "Structure web pages with semantic HTML" },
        { id: "css-fundamentals", title: "CSS Fundamentals", description: "Style and layout web pages" },
        { id: "javascript-basics", title: "JavaScript Basics", description: "Add interactivity to web pages" },
        { id: "react-framework", title: "React Framework", description: "Build modern web applications" },
        { id: "build-tools", title: "Build Tools", description: "Webpack, Vite, and modern tooling" },
      ],
    },
    {
      id: "backend",
      title: "Backend",
      description: "Step by step guide to becoming a backend developer",
      icon: <Server className="h-8 w-8" />,
      color: "bg-green-500",
      steps: [
        { id: "programming-language", title: "Pick a Language", description: "Choose Python, Node.js, or Java" },
        { id: "databases", title: "Learn Databases", description: "SQL and NoSQL databases" },
        { id: "apis", title: "APIs & Web Services", description: "REST, GraphQL, and microservices" },
        { id: "deployment", title: "Deployment", description: "Docker, AWS, and cloud platforms" },
      ],
    },
    {
      id: "devops",
      title: "DevOps",
      description: "Step by step guide to becoming a DevOps engineer",
      icon: <Cpu className="h-8 w-8" />,
      color: "bg-purple-500",
      steps: [
        { id: "linux-basics", title: "Linux Basics", description: "Command line and system administration" },
        { id: "containerization", title: "Containerization", description: "Docker and Kubernetes" },
        { id: "ci-cd", title: "CI/CD", description: "Continuous integration and deployment" },
        { id: "monitoring", title: "Monitoring", description: "Application and infrastructure monitoring" },
      ],
    },
    {
      id: "mobile",
      title: "Mobile Developer",
      description: "Step by step guide to becoming a mobile app developer",
      icon: <Smartphone className="h-8 w-8" />,
      color: "bg-pink-500",
      steps: [
        { id: "mobile-basics", title: "Mobile Fundamentals", description: "iOS and Android development basics" },
        { id: "react-native", title: "React Native", description: "Cross-platform mobile development" },
        { id: "native-development", title: "Native Development", description: "Swift for iOS, Kotlin for Android" },
        { id: "app-store", title: "App Store Deployment", description: "Publishing to app stores" },
      ],
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      description: "Step by step guide to becoming a data scientist",
      icon: <BarChart3 className="h-8 w-8" />,
      color: "bg-orange-500",
      steps: [
        { id: "python-data", title: "Python for Data Science", description: "NumPy, Pandas, and data manipulation" },
        { id: "statistics", title: "Statistics & Math", description: "Statistical analysis and mathematics" },
        { id: "machine-learning", title: "Machine Learning", description: "ML algorithms and frameworks" },
        {
          id: "data-visualization",
          title: "Data Visualization",
          description: "Creating insights through visualization",
        },
      ],
    },
    {
      id: "ai-engineer",
      title: "AI Engineer",
      description: "Step by step guide to becoming an AI engineer",
      icon: <Brain className="h-8 w-8" />,
      color: "bg-indigo-500",
      badge: "New",
      steps: [
        { id: "ai-fundamentals", title: "AI Fundamentals", description: "Machine learning and deep learning basics" },
        { id: "neural-networks", title: "Neural Networks", description: "Understanding neural network architectures" },
        { id: "nlp", title: "Natural Language Processing", description: "Working with text and language models" },
        { id: "ai-deployment", title: "AI Model Deployment", description: "Deploying AI models to production" },
      ],
    },
    {
      id: "cybersecurity",
      title: "Cyber Security",
      description: "Step by step guide to becoming a cybersecurity expert",
      icon: <Shield className="h-8 w-8" />,
      color: "bg-red-500",
      steps: [
        {
          id: "security-basics",
          title: "Security Fundamentals",
          description: "Basic security concepts and principles",
        },
        { id: "network-security", title: "Network Security", description: "Securing networks and communications" },
        {
          id: "ethical-hacking",
          title: "Ethical Hacking",
          description: "Penetration testing and vulnerability assessment",
        },
        { id: "incident-response", title: "Incident Response", description: "Handling security incidents" },
      ],
    },
    {
      id: "ux-design",
      title: "UX Design",
      description: "Step by step guide to becoming a UX designer",
      icon: <Palette className="h-8 w-8" />,
      color: "bg-teal-500",
      steps: [
        { id: "design-thinking", title: "Design Thinking", description: "User-centered design process" },
        { id: "wireframing", title: "Wireframing & Prototyping", description: "Creating design mockups" },
        { id: "user-research", title: "User Research", description: "Understanding user needs and behavior" },
        { id: "design-tools", title: "Design Tools", description: "Figma, Sketch, and design software" },
      ],
    },
  ]

  const skillBasedRoadmaps = [
    {
      id: "javascript",
      title: "JavaScript",
      description: "Complete guide to JavaScript programming",
      icon: <Code className="h-6 w-6" />,
      color: "bg-yellow-500",
    },
    {
      id: "python",
      title: "Python",
      description: "Learn Python programming from basics to advanced",
      icon: <Code className="h-6 w-6" />,
      color: "bg-blue-600",
    },
    {
      id: "sql",
      title: "SQL",
      description: "Master database queries and management",
      icon: <Database className="h-6 w-6" />,
      color: "bg-gray-600",
    },
    {
      id: "git",
      title: "Git & GitHub",
      description: "Version control and collaboration",
      icon: <Code className="h-6 w-6" />,
      color: "bg-orange-600",
    },
    {
      id: "docker",
      title: "Docker",
      description: "Containerization and deployment",
      icon: <Globe className="h-6 w-6" />,
      color: "bg-blue-400",
    },
    {
      id: "aws",
      title: "AWS",
      description: "Amazon Web Services cloud platform",
      icon: <Globe className="h-6 w-6" />,
      color: "bg-orange-500",
    },
  ]

  const resources = [
    // Frontend - HTML Basics
    {
      id: "resource-1",
      title: "HTML5 Semantic Elements Guide",
      description: "Learn about modern HTML5 semantic elements and their proper usage.",
      type: "article",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "frontend",
      stepId: "html-basics",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element",
      duration: "10 min read",
    },
    {
      id: "resource-2",
      title: "HTML Validator Tool",
      description: "Validate your HTML code and check for errors and best practices.",
      type: "tool",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "frontend",
      stepId: "html-basics",
      url: "https://validator.w3.org/",
      duration: "Interactive",
    },
    {
      id: "resource-3",
      title: "Build Your First Webpage",
      description: "Create a complete personal portfolio webpage using semantic HTML.",
      type: "practice",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "frontend",
      stepId: "html-basics",
      url: "https://www.freecodecamp.org/learn/responsive-web-design/basic-html-and-html5/",
      duration: "2 hours",
    },

    // Frontend - CSS Fundamentals
    {
      id: "resource-4",
      title: "CSS Flexbox Complete Tutorial",
      description: "Master CSS Flexbox layout with practical examples.",
      type: "video",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "frontend",
      stepId: "css-fundamentals",
      url: "https://www.youtube.com/watch?v=JJSoEo8JSnc",
      duration: "35 min",
    },
    {
      id: "resource-5",
      title: "CSS Grid vs Flexbox: When to Use What",
      description: "Comprehensive guide on choosing between CSS Grid and Flexbox for different layouts.",
      type: "article",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "frontend",
      stepId: "css-fundamentals",
      url: "https://css-tricks.com/quick-whats-the-difference-between-flexbox-and-grid/",
      duration: "8 min read",
    },
    {
      id: "resource-6",
      title: "CSS Grid Generator",
      description: "Interactive tool to generate CSS Grid layouts with visual interface.",
      type: "tool",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "frontend",
      stepId: "css-fundamentals",
      url: "https://cssgrid-generator.netlify.app/",
      duration: "Interactive",
    },
    {
      id: "resource-7",
      title: "Responsive Design Challenge",
      description: "Build a responsive website that works on mobile, tablet, and desktop.",
      type: "practice",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "frontend",
      stepId: "css-fundamentals",
      url: "https://www.frontendmentor.io/challenges",
      duration: "3-5 hours",
    },

    // Frontend - JavaScript Basics
    {
      id: "resource-8",
      title: "JavaScript ES6+ Features",
      description: "Modern JavaScript features every developer should know.",
      type: "article",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "frontend",
      stepId: "javascript-basics",
      url: "https://www.example.com/js-es6",
      duration: "15 min read",
    },
    {
      id: "resource-9",
      title: "JavaScript Fundamentals Course",
      description: "Complete beginner-friendly course covering all JavaScript basics.",
      type: "video",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "frontend",
      stepId: "javascript-basics",
      url: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
      duration: "3 hours",
    },
    {
      id: "resource-10",
      title: "JavaScript Console & Debugger",
      description: "Browser developer tools for testing and debugging JavaScript code.",
      type: "tool",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "frontend",
      stepId: "javascript-basics",
      url: "https://developer.chrome.com/docs/devtools/console/",
      duration: "Reference",
    },
    {
      id: "resource-11",
      title: "30 Days of JavaScript Challenges",
      description: "Daily coding challenges to practice JavaScript fundamentals.",
      type: "practice",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "frontend",
      stepId: "javascript-basics",
      url: "https://javascript30.com/",
      duration: "30 days",
    },

    // Frontend - React Framework
    {
      id: "resource-12",
      title: "React Hooks Explained",
      description: "Complete guide to React Hooks with examples.",
      type: "video",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "frontend",
      stepId: "react-framework",
      url: "https://www.youtube.com/watch?v=O6P86uwfdR0",
      duration: "45 min",
    },
    {
      id: "resource-13",
      title: "React Component Patterns",
      description: "Best practices and patterns for writing maintainable React components.",
      type: "article",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "frontend",
      stepId: "react-framework",
      url: "https://react.dev/learn/thinking-in-react",
      duration: "12 min read",
    },
    {
      id: "resource-14",
      title: "React Developer Tools",
      description: "Browser extension for debugging React applications.",
      type: "tool",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "frontend",
      stepId: "react-framework",
      url: "https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi",
      duration: "Extension",
    },
    {
      id: "resource-15",
      title: "Build a Todo App with React",
      description: "Step-by-step project to create a fully functional todo application.",
      type: "practice",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "frontend",
      stepId: "react-framework",
      url: "https://www.example.com/react-todo-tutorial",
      duration: "4 hours",
    },

    // Backend - Programming Language
    {
      id: "resource-16",
      title: "Python vs Node.js: Which to Choose?",
      description: "Comprehensive comparison of Python and Node.js for backend development.",
      type: "article",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "backend",
      stepId: "programming-language",
      url: "https://www.example.com/python-vs-nodejs",
      duration: "10 min read",
    },
    {
      id: "resource-17",
      title: "Node.js Crash Course",
      description: "Learn Node.js fundamentals and build your first server.",
      type: "video",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "backend",
      stepId: "programming-language",
      url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4",
      duration: "90 min",
    },
    {
      id: "resource-18",
      title: "Online Python Interpreter",
      description: "Run Python code directly in your browser without installation.",
      type: "tool",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "backend",
      stepId: "programming-language",
      url: "https://repl.it/languages/python3",
      duration: "Interactive",
    },
    {
      id: "resource-19",
      title: "Build a REST API",
      description: "Create your first REST API using Express.js and Node.js.",
      type: "practice",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "backend",
      stepId: "programming-language",
      url: "https://www.example.com/build-rest-api",
      duration: "3 hours",
    },

    // Backend - Databases
    {
      id: "resource-20",
      title: "SQL vs NoSQL: Complete Guide",
      description: "Understanding the differences and when to use each database type.",
      type: "article",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "backend",
      stepId: "databases",
      url: "https://www.mongodb.com/nosql-explained/nosql-vs-sql",
      duration: "12 min read",
    },
    {
      id: "resource-21",
      title: "PostgreSQL Tutorial for Beginners",
      description: "Complete guide to PostgreSQL database management.",
      type: "video",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "backend",
      stepId: "databases",
      url: "https://www.youtube.com/watch?v=qw--VYLpxG4",
      duration: "4 hours",
    },
    {
      id: "resource-22",
      title: "DB Diagram Tool",
      description: "Visual database design tool for creating ER diagrams.",
      type: "tool",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "backend",
      stepId: "databases",
      url: "https://dbdiagram.io/",
      duration: "Interactive",
    },
    {
      id: "resource-23",
      title: "Database Design Project",
      description: "Design and implement a database for an e-commerce application.",
      type: "practice",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "backend",
      stepId: "databases",
      url: "https://www.example.com/database-design-project",
      duration: "6 hours",
    },

    // DevOps - Linux Basics
    {
      id: "resource-24",
      title: "Linux Command Line Essentials",
      description: "Master the most important Linux commands for system administration.",
      type: "article",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "devops",
      stepId: "linux-basics",
      url: "https://www.digitalocean.com/community/tutorials/linux-commands",
      duration: "20 min read",
    },
    {
      id: "resource-25",
      title: "Linux for Beginners Course",
      description: "Complete beginner course covering Linux fundamentals.",
      type: "video",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "devops",
      stepId: "linux-basics",
      url: "https://www.youtube.com/watch?v=sWbUDq4S6Y8",
      duration: "5 hours",
    },
    {
      id: "resource-26",
      title: "Linux Command Cheat Sheet",
      description: "Quick reference for essential Linux commands and shortcuts.",
      type: "tool",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "devops",
      stepId: "linux-basics",
      url: "https://www.linuxtrainingacademy.com/linux-commands-cheat-sheet/",
      duration: "Reference",
    },
    {
      id: "resource-27",
      title: "Linux System Administration Lab",
      description: "Hands-on exercises for managing users, permissions, and services.",
      type: "practice",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "devops",
      stepId: "linux-basics",
      url: "https://www.example.com/linux-admin-lab",
      duration: "8 hours",
    },

    // AI Engineer - AI Fundamentals
    {
      id: "resource-28",
      title: "Machine Learning Explained",
      description: "Comprehensive introduction to machine learning concepts and algorithms.",
      type: "article",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "ai-engineer",
      stepId: "ai-fundamentals",
      url: "https://www.example.com/ml-explained",
      duration: "25 min read",
    },
    {
      id: "resource-29",
      title: "AI and Machine Learning Course",
      description: "Complete course covering AI fundamentals and practical applications.",
      type: "video",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "ai-engineer",
      stepId: "ai-fundamentals",
      url: "https://www.youtube.com/watch?v=ukzFI9rgwfU",
      duration: "10 hours",
    },
    {
      id: "resource-30",
      title: "Jupyter Notebook Environment",
      description: "Interactive environment for data science and machine learning experiments.",
      type: "tool",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "ai-engineer",
      stepId: "ai-fundamentals",
      url: "https://jupyter.org/try",
      duration: "Interactive",
    },
    {
      id: "resource-31",
      title: "Build Your First ML Model",
      description: "Create a machine learning model to predict house prices using Python.",
      type: "practice",
      thumbnail: "/placeholder.svg?height=180&width=320",
      roadmapId: "ai-engineer",
      stepId: "ai-fundamentals",
      url: "https://www.kaggle.com/learn/intro-to-machine-learning",
      duration: "4 hours",
    },
  ]

  const getCurrentRoadmap = () => roleBasedRoadmaps.find((roadmap) => roadmap.id === selectedRoadmap)
  const getCurrentStep = () => getCurrentRoadmap()?.steps.find((step) => step.id === selectedStep)
  const getCurrentResources = () =>
    resources.filter((resource) => resource.roadmapId === selectedRoadmap && resource.stepId === selectedStep)

  const handleRoadmapClick = (roadmapId: string) => {
    setSelectedRoadmap(roadmapId)
    setCurrentView("roadmap-detail")
    setSelectedStep(null)
  }

  const handleStepClick = (stepId: string) => {
    setSelectedStep(stepId)
    setCurrentView("resources")
  }

  const handleBackToRoadmaps = () => {
    setCurrentView("roadmaps")
    setSelectedRoadmap(null)
    setSelectedStep(null)
  }

  const handleBackToRoadmap = () => {
    setCurrentView("roadmap-detail")
    setSelectedStep(null)
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
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-600">
                <Code className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">LearnFlow</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#" className="text-sm text-slate-300 hover:text-white">
                Start Here
              </Link>
              <Link href="#" className="text-sm text-slate-300 hover:text-white">
                Roadmaps
              </Link>
              <Link href="#" className="text-sm text-slate-300 hover:text-white">
                AI Tutor
              </Link>
              <Link href="#" className="text-sm text-slate-300 hover:text-white">
                Teams
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              Login
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Roadmaps Overview */}
        {currentView === "roadmaps" && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Developer Roadmaps
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                LearnFlow is a community effort to create roadmaps, guides and other educational content to help guide
                developers in picking up a path and guide their learnings.
              </p>
            </div>

            {/* Role-based Roadmaps */}
            <section className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-slate-300 mb-2">Role-based Roadmaps</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {roleBasedRoadmaps.map((roadmap) => (
                  <Card
                    key={roadmap.id}
                    className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer group"
                    onClick={() => handleRoadmapClick(roadmap.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${roadmap.color} text-white`}>{roadmap.icon}</div>
                        {roadmap.badge && (
                          <Badge variant="secondary" className="bg-green-600 text-white">
                            {roadmap.badge}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {roadmap.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{roadmap.description}</p>
                    </CardContent>
                  </Card>
                ))}

                {/* Create your own roadmap card */}
                <Card className="bg-slate-800 border-slate-700 border-dashed hover:bg-slate-750 transition-colors cursor-pointer group">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
                    <div className="p-3 rounded-lg bg-slate-700 text-slate-400 mb-4 group-hover:bg-slate-600 transition-colors">
                      <Plus className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-300 mb-2 group-hover:text-purple-400 transition-colors">
                      Create your own Roadmap
                    </h3>
                    <p className="text-sm text-slate-500">Build a custom learning path</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Skill-based Roadmaps */}
            <section className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-slate-300 mb-2">Skill-based Roadmaps</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {skillBasedRoadmaps.map((skill) => (
                  <Card
                    key={skill.id}
                    className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer group"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded ${skill.color} text-white`}>{skill.icon}</div>
                        <div>
                          <h3 className="font-medium text-white group-hover:text-purple-400 transition-colors">
                            {skill.title}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Roadmap Detail View */}
        {currentView === "roadmap-detail" && getCurrentRoadmap() && (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToRoadmaps}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Roadmaps
              </Button>
            </div>

            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className={`p-4 rounded-lg ${getCurrentRoadmap()?.color} text-white`}>
                  {getCurrentRoadmap()?.icon}
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white">{getCurrentRoadmap()?.title} Roadmap</h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">{getCurrentRoadmap()?.description}</p>
            </div>

            <div className="grid gap-4 max-w-4xl mx-auto">
              {getCurrentRoadmap()?.steps.map((step, index) => (
                <Card
                  key={step.id}
                  className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer group"
                  onClick={() => handleStepClick(step.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-slate-400">{step.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Resources View */}
        {currentView === "resources" && getCurrentStep() && (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToRoadmap}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Roadmap
              </Button>
            </div>

            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-white">{getCurrentStep()?.title}</h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">{getCurrentStep()?.description}</p>
            </div>

            <Tabs defaultValue="all" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-5 bg-slate-800">
                <TabsTrigger value="all" className="data-[state=active]:bg-slate-700">
                  All
                </TabsTrigger>
                <TabsTrigger value="video" className="data-[state=active]:bg-slate-700">
                  <Video className="mr-2 h-4 w-4" /> Video
                </TabsTrigger>
                <TabsTrigger value="article" className="data-[state=active]:bg-slate-700">
                  <Book className="mr-2 h-4 w-4" /> Article
                </TabsTrigger>
                <TabsTrigger value="tool" className="data-[state=active]:bg-slate-700">
                  <Wrench className="mr-2 h-4 w-4" /> Tool
                </TabsTrigger>
                <TabsTrigger value="practice" className="data-[state=active]:bg-slate-700">
                  <ClipboardList className="mr-2 h-4 w-4" /> Practice
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {getCurrentResources().map((resource) => (
                    <Card key={resource.id} className="bg-slate-800 border-slate-700">
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
                              ) : resource.type === "tool" ? (
                                <Wrench className="h-12 w-12 text-white" />
                              ) : resource.type === "practice" ? (
                                <ClipboardList className="h-12 w-12 text-white" />
                              ) : (
                                <Book className="h-12 w-12 text-white" />
                              )}
                            </div>
                          </div>
                        )}
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(resource.type)}
                            <Badge
                              variant="secondary"
                              className={`capitalize ${
                                resource.type === "video"
                                  ? "bg-red-600 text-white"
                                  : resource.type === "article"
                                    ? "bg-blue-600 text-white"
                                    : resource.type === "tool"
                                      ? "bg-green-600 text-white"
                                      : resource.type === "practice"
                                        ? "bg-purple-600 text-white"
                                        : "bg-slate-700 text-slate-300"
                              }`}
                            >
                              {resource.type}
                            </Badge>
                          </div>
                          <span className="text-xs text-slate-400">{resource.duration}</span>
                        </div>
                        <CardTitle className="text-lg font-semibold mb-2 text-white">{resource.title}</CardTitle>
                        <CardDescription className="line-clamp-2 mb-4 text-slate-400">
                          {resource.description}
                        </CardDescription>
                        {resource.url && (
                          <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              {resource.type === "tool"
                                ? "Open Tool"
                                : resource.type === "practice"
                                  ? "Start Practice"
                                  : "Access Resource"}
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
                <TabsContent key={type} value={type} className="mt-8">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {getCurrentResources()
                      .filter((r) => r.type === type)
                      .map((resource) => (
                        <Card key={resource.id} className="bg-slate-800 border-slate-700">
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
                                  ) : resource.type === "tool" ? (
                                    <Wrench className="h-12 w-12 text-white" />
                                  ) : resource.type === "practice" ? (
                                    <ClipboardList className="h-12 w-12 text-white" />
                                  ) : (
                                    <Book className="h-12 w-12 text-white" />
                                  )}
                                </div>
                              </div>
                            )}
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {getTypeIcon(resource.type)}
                                <Badge
                                  variant="secondary"
                                  className={`capitalize ${
                                    resource.type === "video"
                                      ? "bg-red-600 text-white"
                                      : resource.type === "article"
                                        ? "bg-blue-600 text-white"
                                        : resource.type === "tool"
                                          ? "bg-green-600 text-white"
                                          : resource.type === "practice"
                                            ? "bg-purple-600 text-white"
                                            : "bg-slate-700 text-slate-300"
                                  }`}
                                >
                                  {resource.type}
                                </Badge>
                              </div>
                              <span className="text-xs text-slate-400">{resource.duration}</span>
                            </div>
                            <CardTitle className="text-lg font-semibold mb-2 text-white">{resource.title}</CardTitle>
                            <CardDescription className="line-clamp-2 mb-4 text-slate-400">
                              {resource.description}
                            </CardDescription>
                            {resource.url && (
                              <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  {resource.type === "tool"
                                    ? "Open Tool"
                                    : resource.type === "practice"
                                      ? "Start Practice"
                                      : "Access Resource"}
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
          </div>
        )}
      </main>
    </div>
  )
}

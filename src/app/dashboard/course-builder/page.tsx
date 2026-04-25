'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  BookOpen, 
  Video, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  GripVertical, 
  Edit, 
  Trash2,
  Save,
  Eye
} from 'lucide-react'

interface Lesson {
  id: string
  title: string
  type: 'video' | 'text' | 'quiz'
  duration: string
  order: number
}

interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  order: number
  expanded: boolean
}

function CourseBuilderContent() {
  const { user } = useAuth()
  const [courseTitle, setCourseTitle] = useState('JavaScript Fundamentals')
  const [courseDescription, setCourseDescription] = useState('Learn JavaScript from scratch with hands-on projects and real-world examples.')
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: 'Introduction to JavaScript',
      description: 'Get started with the basics of JavaScript programming',
      lessons: [
        { id: '1-1', title: 'What is JavaScript?', type: 'video', duration: '10:30', order: 1 },
        { id: '1-2', title: 'Setting up your environment', type: 'text', duration: '5:00', order: 2 },
        { id: '1-3', title: 'Your first JavaScript program', type: 'video', duration: '15:45', order: 3 },
      ],
      order: 1,
      expanded: true
    },
    {
      id: '2',
      title: 'Variables and Data Types',
      description: 'Understanding variables, data types, and type conversion',
      lessons: [
        { id: '2-1', title: 'Variables and constants', type: 'video', duration: '12:20', order: 1 },
        { id: '2-2', title: 'Data types overview', type: 'text', duration: '8:15', order: 2 },
      ],
      order: 2,
      expanded: false
    }
  ])

  const toggleModule = (moduleId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, expanded: !module.expanded }
        : module
    ))
  }

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: 'New Module',
      description: 'Module description',
      lessons: [],
      order: modules.length + 1,
      expanded: true
    }
    setModules([...modules, newModule])
  }

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: `${moduleId}-${Date.now()}`,
      title: 'New Lesson',
      type: 'video',
      duration: '0:00',
      order: modules.find(m => m.id === moduleId)?.lessons.length || 0 + 1
    }
    
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, lessons: [...module.lessons, newLesson] }
        : module
    ))
  }

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, lessons: module.lessons.filter(lesson => lesson.id !== lessonId) }
        : module
    ))
  }

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter(module => module.id !== moduleId))
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />
      case 'text':
        return <FileText className="w-4 h-4" />
      case 'quiz':
        return <BookOpen className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Course Builder</h1>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Course
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Description</label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Modules and Lessons */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Course Content</h2>
          <Button onClick={addModule} className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Module
          </Button>
        </div>

        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Module Header */}
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={module.title}
                        onChange={(e) => {
                          setModules(modules.map(m => 
                            m.id === module.id ? { ...m, title: e.target.value } : m
                          ))
                        }}
                        className="font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1"
                      />
                      <input
                        type="text"
                        value={module.description}
                        onChange={(e) => {
                          setModules(modules.map(m => 
                            m.id === module.id ? { ...m, description: e.target.value } : m
                          ))
                        }}
                        className="text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1 mt-1 w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    >
                      {module.expanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteModule(module.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Lessons */}
              {module.expanded && (
                <div className="p-4 space-y-2">
                  {module.lessons.map((lesson) => (
                    <div key={lesson.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getLessonIcon(lesson.type)}
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => {
                              setModules(modules.map(m => ({
                                ...m,
                                lessons: m.lessons.map(l => 
                                  l.id === lesson.id ? { ...l, title: e.target.value } : l
                                )
                              })))
                            }}
                            className="font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1"
                          />
                          <div className="flex items-center gap-4 mt-1">
                            <select
                              value={lesson.type}
                              onChange={(e) => {
                                setModules(modules.map(m => ({
                                  ...m,
                                  lessons: m.lessons.map(l => 
                                    l.id === lesson.id ? { ...l, type: e.target.value as 'video' | 'text' | 'quiz' } : l
                                  )
                                })))
                              }}
                              className="text-xs text-gray-600 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1"
                            >
                              <option value="video">Video</option>
                              <option value="text">Text</option>
                              <option value="quiz">Quiz</option>
                            </select>
                            <input
                              type="text"
                              value={lesson.duration}
                              onChange={(e) => {
                                setModules(modules.map(m => ({
                                  ...m,
                                  lessons: m.lessons.map(l => 
                                    l.id === lesson.id ? { ...l, duration: e.target.value } : l
                                  )
                                })))
                              }}
                              placeholder="Duration"
                              className="text-xs text-gray-600 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1 w-20"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => deleteLesson(module.id, lesson.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => addLesson(module.id)}
                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 text-gray-600"
                  >
                    <Plus className="w-4 h-4" />
                    Add Lesson
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CourseBuilder() {
  return (
    
      <CourseBuilderContent />
    
  )
}

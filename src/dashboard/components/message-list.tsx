"use client"

import { CardFooter } from "@/components/ui/card"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send } from "lucide-react"
import { useState } from "react"

interface Message {
  id: string
  sender: {
    name: string
    avatar?: string
    role: "student" | "instructor" | "admin"
  }
  content: string
  timestamp: string
  read: boolean
}

interface Conversation {
  id: string
  participant: {
    name: string
    avatar?: string
    role: "student" | "instructor" | "admin"
  }
  lastMessage: string
  timestamp: string
  unread: number
}

export function MessageList() {
  const [activeConversation, setActiveConversation] = useState<string | null>("conv1")
  const [messageInput, setMessageInput] = useState("")

  const conversations: Conversation[] = [
    {
      id: "conv1",
      participant: {
        name: "Dr. Sarah Miller",
        role: "instructor",
      },
      lastMessage: "When will the next assignment be due?",
      timestamp: "10:42 AM",
      unread: 2,
    },
    {
      id: "conv2",
      participant: {
        name: "Michael Brown",
        role: "student",
      },
      lastMessage: "Thanks for the feedback on my project!",
      timestamp: "Yesterday",
      unread: 0,
    },
    {
      id: "conv3",
      participant: {
        name: "Emma Rodriguez",
        role: "instructor",
      },
      lastMessage: "The course materials have been updated.",
      timestamp: "May 5",
      unread: 0,
    },
  ]

  const messages: Record<string, Message[]> = {
    conv1: [
      {
        id: "msg1",
        sender: {
          name: "Dr. Sarah Miller",
          role: "instructor",
        },
        content: "Hi Alex, how are you doing with the React assignment?",
        timestamp: "10:30 AM",
        read: true,
      },
      {
        id: "msg2",
        sender: {
          name: "Alex Johnson",
          role: "student",
        },
        content: "I'm making good progress, but I have a question about hooks.",
        timestamp: "10:35 AM",
        read: true,
      },
      {
        id: "msg3",
        sender: {
          name: "Dr. Sarah Miller",
          role: "instructor",
        },
        content: "Sure, what's your question?",
        timestamp: "10:38 AM",
        read: true,
      },
      {
        id: "msg4",
        sender: {
          name: "Alex Johnson",
          role: "student",
        },
        content: "When should I use useEffect vs useMemo?",
        timestamp: "10:40 AM",
        read: true,
      },
      {
        id: "msg5",
        sender: {
          name: "Dr. Sarah Miller",
          role: "instructor",
        },
        content:
          "That's a great question! useEffect is for side effects, while useMemo is for memoizing expensive calculations. When will the next assignment be due?",
        timestamp: "10:42 AM",
        read: false,
      },
    ],
    conv2: [
      {
        id: "msg1",
        sender: {
          name: "Michael Brown",
          role: "student",
        },
        content: "Hello, I've submitted my JavaScript project.",
        timestamp: "Yesterday",
        read: true,
      },
      {
        id: "msg2",
        sender: {
          name: "Alex Johnson",
          role: "student",
        },
        content: "Great! I'll take a look at it soon.",
        timestamp: "Yesterday",
        read: true,
      },
      {
        id: "msg3",
        sender: {
          name: "Michael Brown",
          role: "student",
        },
        content: "Thanks for the feedback on my project!",
        timestamp: "Yesterday",
        read: true,
      },
    ],
    conv3: [
      {
        id: "msg1",
        sender: {
          name: "Emma Rodriguez",
          role: "instructor",
        },
        content: "Hello students, I've updated the course materials for next week.",
        timestamp: "May 5",
        read: true,
      },
      {
        id: "msg2",
        sender: {
          name: "Alex Johnson",
          role: "student",
        },
        content: "Thank you! I'll check them out.",
        timestamp: "May 5",
        read: true,
      },
      {
        id: "msg3",
        sender: {
          name: "Emma Rodriguez",
          role: "instructor",
        },
        content: "The course materials have been updated.",
        timestamp: "May 5",
        read: true,
      },
    ],
  }

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeConversation) return

    // In a real app, you would send this to an API
    console.log("Sending message:", messageInput)
    setMessageInput("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Communicate with instructors and students</p>
      </div>

      <Card className="flex h-[calc(100vh-220px)]">
        <div className="w-full md:w-1/3 border-r">
          <CardHeader className="p-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search messages..." className="pl-8" />
            </div>
          </CardHeader>
          <div className="overflow-auto h-[calc(100%-70px)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-muted/50 ${
                  activeConversation === conversation.id ? "bg-muted" : ""
                }`}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={conversation.participant.name} />
                  <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-medium text-sm truncate">{conversation.participant.name}</h4>
                    <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {conversation.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex flex-col w-2/3">
          {activeConversation ? (
            <>
              <CardHeader className="p-4 border-b">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40`}
                      alt={conversations.find((c) => c.id === activeConversation)?.participant.name}
                    />
                    <AvatarFallback>
                      {conversations.find((c) => c.id === activeConversation)?.participant.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">
                      {conversations.find((c) => c.id === activeConversation)?.participant.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground capitalize">
                      {conversations.find((c) => c.id === activeConversation)?.participant.role}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <div className="flex-1 overflow-auto p-4 space-y-4">
                {messages[activeConversation]?.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender.role !== "student" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`flex gap-2 max-w-[80%] ${message.sender.role !== "student" ? "flex-row" : "flex-row-reverse"}`}
                    >
                      {message.sender.role !== "student" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={message.sender.name} />
                          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender.role !== "student"
                              ? "bg-muted text-foreground"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {message.content}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">{message.timestamp}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <CardFooter className="p-4 border-t">
                <div className="flex w-full gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </CardFooter>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="font-medium">Select a conversation</h3>
                <p className="text-sm text-muted-foreground">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

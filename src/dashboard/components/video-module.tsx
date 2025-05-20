import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play } from "lucide-react"

interface VideoModuleProps {
  title: string
  course: string
  duration: string
  thumbnail: string
  progress: number
}

export function VideoModule({ title, course, duration, thumbnail, progress }: VideoModuleProps) {
  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-64 h-36 flex-shrink-0">
            <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-full object-cover rounded-md" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full w-12 h-12 bg-background/80 hover:bg-background/90"
              >
                <Play className="h-6 w-6" />
                <span className="sr-only">Play video</span>
              </Button>
            </div>
            {progress > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-1">
                <Progress value={progress} className="h-1" />
              </div>
            )}
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{course}</p>
            <p className="text-sm">{duration}</p>
            {progress === 100 && (
              <div className="flex items-center text-sm text-green-600">
                <span className="font-medium">Completed</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm">
          {progress > 0 && progress < 100 ? "Resume" : progress === 100 ? "Rewatch" : "Start"}
        </Button>
        <Button variant="ghost" size="sm">
          Download Resources
        </Button>
      </CardFooter>
    </Card>
  )
}

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"

interface CertificateCardProps {
  title: string
  issueDate: string
  instructor: string
  image: string
}

export function CertificateCard({ title, issueDate, instructor, image }: CertificateCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={`${title} Certificate`} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-xl">{title}</h3>
          <p className="text-white/80 text-sm">Issued on {issueDate}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Instructor:</span>
            <span className="text-sm">{instructor}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Certificate ID:</span>
            <span className="text-sm">
              CERT-
              {Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, "0")}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="outline" className="flex-1">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}

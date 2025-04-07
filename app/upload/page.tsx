"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Camera, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { OcrResultDisplay } from "@/components/ocr-result-display"
import { ThreeDCard } from "@/components/three-d-card"

import Tesseract from "tesseract.js"

export default function UploadPage() {
  const { toast } = useToast()
  const [image, setImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [ocrResult, setOcrResult] = useState<any>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setOcrResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const processImage = async () => {
    if (!image) return

    setIsProcessing(true)
    setProgress(0)

    try {
      const { data } = await Tesseract.recognize(image, "eng", {
        logger: (m: any) => {
          if (m.status === "recognizing text") {
            setProgress(Math.floor(m.progress * 100))
          }
        },
      })

      const extractedInfo = {
        date: data.text.match(/\d{2}\/\d{2}\/\d{4}/)?.[0] || "Unknown",
        amount: data.text.match(/\$\d+(\.\d{2})?/)?.[0]?.replace("$", "") || "Unknown",
        vendor: data.text.split("\n")[0] || "Unknown",
      }

      setOcrResult({ fullText: data.text, extractedInfo })

      toast({
        title: "Receipt processed successfully",
        description: "Text successfully extracted using OCR.",
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Processing failed",
        description: "There was an error processing your receipt.",
      })
    } finally {
      setIsProcessing(false)
      setProgress(100)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-sf-pro gradient-text">Upload Receipt</h1>
          <p className="text-muted-foreground">Upload a receipt image to extract expense information using OCR.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Upload Card */}
          <ThreeDCard>
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Upload Receipt</CardTitle>
                <CardDescription>Upload a clear image of your receipt for best results</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upload">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload Image</TabsTrigger>
                    <TabsTrigger value="camera">Take Photo</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="mt-4">
                    <div className="flex flex-col gap-4">
                      <Input type="file" accept="image/*" onChange={handleImageUpload} />
                      {image && (
                        <img
                          src={image}
                          alt="Receipt Preview"
                          className="w-full max-h-64 object-contain rounded-md border"
                        />
                      )}
                      <Button onClick={processImage} disabled={isProcessing || !image}>
                        {isProcessing ? "Processing..." : "Extract Text"}
                      </Button>
                      {isProcessing && <Progress value={progress} />}
                    </div>
                  </TabsContent>
                  <TabsContent value="camera" className="mt-4">
                    <div className="text-muted-foreground">Camera feature coming soon 📷</div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </ThreeDCard>

          {/* Extracted Information Card */}
          <ThreeDCard>
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Extracted Information</CardTitle>
                <CardDescription>Review and edit the extracted information</CardDescription>
              </CardHeader>
              <CardContent>
                {ocrResult ? (
                  <OcrResultDisplay result={ocrResult} />
                ) : (
                  <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Upload and process a receipt to see extracted information
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </ThreeDCard>
        </div>
      </motion.div>
    </div>
  )
}

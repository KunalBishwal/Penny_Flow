"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Camera, FileText, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { OcrResultDisplay } from "@/components/ocr-result-display"

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
      // Create a mock result for demo purposes
      // This avoids Tesseract.js issues in the preview environment
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 10
          if (newProgress >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return newProgress
        })
      }, 200)

      // Mock OCR result
      const mockResult = {
        fullText:
          "RECEIPT\n\nStarbucks Coffee\n123 Main Street\nNew York, NY 10001\n\nDate: 04/05/2025\nTime: 10:30 AM\n\nCappuccino      $4.50\nCroissant       $3.25\nBottled Water   $2.75\n\nSubtotal        $10.50\nTax (8%)        $0.84\nTip             $2.00\n\nTotal           $13.34\n\nThank you for your visit!",
        extractedInfo: {
          date: "04/05/2025",
          amount: "13.34",
          vendor: "Starbucks Coffee",
        },
      }

      setOcrResult(mockResult)

      toast({
        title: "Receipt processed successfully",
        description: "We've extracted the information from your receipt.",
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
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div
                      className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                      onClick={() => document.getElementById("receipt-upload")?.click()}
                    >
                      {image ? (
                        <img
                          src={image || "/placeholder.svg"}
                          alt="Receipt preview"
                          className="h-full object-contain p-2"
                        />
                      ) : (
                        <>
                          <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                          <p className="text-xs text-muted-foreground">Supports JPG, PNG, HEIC</p>
                        </>
                      )}
                      <Input
                        id="receipt-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                    {image && (
                      <Button
                        onClick={processImage}
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                      >
                        {isProcessing ? "Processing..." : "Process Receipt"}
                      </Button>
                    )}
                    {isProcessing && (
                      <div className="w-full space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Processing</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-1" />
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="camera" className="mt-4">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex h-64 w-full flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
                      <Camera className="mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Camera functionality will be available in the app</p>
                    </div>
                    <Button disabled className="w-full">
                      Take Photo
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

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
        </div>
      </motion.div>
    </div>
  )
}


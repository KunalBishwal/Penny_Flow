"use client"

import { useEffect, useState } from "react"
import { auth, storage } from "@/lib/firebase"
import { onAuthStateChanged, updateProfile } from "firebase/auth"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

const defaultColors = [
  "#FF6B6B", "#6BCB77", "#4D96FF", "#FFC300", "#A66DD4", "#FF7F50",
]

function getInitialAvatar(name: string, color: string): File {
  const initial = name?.[0]?.toUpperCase() || "U"
  const canvas = document.createElement("canvas")
  canvas.width = 100
  canvas.height = 100
  const ctx = canvas.getContext("2d")!
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "#fff"
  ctx.font = "50px sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(initial, 50, 55)

  const dataUrl = canvas.toDataURL("image/png")
  const byteString = atob(dataUrl.split(",")[1])
  const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  const blob = new Blob([ab], { type: mimeString })
  return new File([blob], "avatar.png", { type: "image/png" })
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [pendingFile, setPendingFile] = useState<File | null>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setPreview(u?.photoURL || null)
    })
    return () => unsub()
  }, [])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
      setPendingFile(file)
    }
    reader.readAsDataURL(file)
  }

  const handleDefaultPic = (color: string) => {
    if (!user) return
    const avatarFile = getInitialAvatar(user?.displayName || "U", color)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
      setPendingFile(avatarFile)
    }
    reader.readAsDataURL(avatarFile)
  }

  const handleSave = async () => {
    if (!user || !pendingFile) {
      console.log("No user or pending file.")
      return
    }

    try {
      const storageRef = ref(storage, `avatars/${user.uid}`)
      await uploadBytes(storageRef, pendingFile)
      const downloadURL = await getDownloadURL(storageRef)

      await updateProfile(user, { photoURL: downloadURL })
      setPreview(downloadURL)
      setPendingFile(null)
      console.log("Profile picture updated:", downloadURL)
    } catch (err) {
      console.error("Upload failed:", err)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <div className="flex flex-col items-center space-y-4">
        <img
          src={preview || "/default-profile.png"}
          alt="Profile"
          className="h-24 w-24 rounded-full object-cover"
        />

        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
        />

        <p className="text-muted-foreground">Or choose a default avatar:</p>
        <div className="flex gap-2 flex-wrap justify-center">
          {defaultColors.map((color) => (
            <Button
              key={color}
              className="h-12 w-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: color }}
              onClick={() => handleDefaultPic(color)}
              variant="ghost"
            >
              <span className="text-white font-bold text-xl">
                {(user?.displayName || "U")[0]}
              </span>
            </Button>
          ))}
        </div>

        {pendingFile && (
          <Button onClick={handleSave} className="mt-4">
            Save Profile Picture
          </Button>
        )}
      </div>
    </div>
  )
}

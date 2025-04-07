"use client"

import React from "react"

interface UserAvatarProps {
  photoURL?: string | null
  displayName?: string | null
  size?: number 
}

const colors = [
  "#FF6B6B", "#6BCB77", "#4D96FF", "#FFC300", "#A66DD4", "#FF7F50",
]

function getInitial(name: string | undefined | null) {
  if (!name || name.trim().length === 0) return "U"
  return name.trim()[0].toUpperCase()
}

function getColor(name: string | undefined | null) {
  const index = name ? name.charCodeAt(0) % colors.length : 0
  return colors[index]
}

export default function UserAvatar({
  photoURL,
  displayName,
  size = 96,
}: UserAvatarProps) {
  const initial = getInitial(displayName)
  const bgColor = getColor(displayName)

  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt="User Avatar"
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold"
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        fontSize: size / 2.5,
      }}
    >
      {initial}
    </div>
  )
}

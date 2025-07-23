

import { Button } from "@components/ui/button"
import { ReactNode } from "react"

interface SocialAuthButtonProps {
  icon: ReactNode
  text: string
  onClick: () => void
}

export function SocialAuthButton({ icon: Icon, text, onClick }: SocialAuthButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-full h-12 flex items-center justify-center space-x-3 border-gray-300 hover:bg-gray-50 text-gray-700 bg-transparent"
      onClick={onClick}
    >{Icon}
      <span className="font-medium">{text}</span>
    </Button>
  )
}

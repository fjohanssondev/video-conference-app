import clsx from "clsx"
import type React from "react"
import type { VideoHTMLAttributes } from "react"

type Rounded = "sm" | "md" | "lg" | "xl" | "full"

const roundedClasses: Record<Rounded, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full"
}

interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  ref: React.RefObject<HTMLVideoElement | null>
  className?: string
  children: React.ReactNode
  autoPlay?: boolean
  rounded?: Rounded
}

interface VideoTitleProps {
  children: React.ReactNode
}

interface VideoUserDetailsProps {
  role: string
  name: string
}

function Video({ ref, className, children, autoPlay = true, rounded = "xl", ...props }: VideoProps) {
  return (
    <div className="relative">
      <video autoPlay={autoPlay} className={clsx(rounded ? roundedClasses[rounded] : "", "absolute object-cover", className)} ref={ref} {...props} />
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}

function VideoTitle({ children }: VideoTitleProps){
  return (
    <div className="absolute text-6xl">
      {children}
    </div>
  )
}

function VideoUserDetails({ role, name }: VideoUserDetailsProps){
  return (
    <div className="flex flex-col">
      <span className="text-white text-base">{role}</span>
      <span className="text-white text-2xl font-medium">{name}</span>
    </div>
  )
}

export { Video, VideoTitle, VideoUserDetails }
import { useEffect, useRef, useState } from 'react'
import { Peer } from "peerjs"
import type { MediaConnection } from "peerjs"
import { Button } from '@/components/ui/button'
import { Video, VideoTitle, VideoUserDetails } from '@/components/ui/video'

function App() {
  const params = new URLSearchParams(window.location.search)
  const peerId = params.get('id') || '123'
  const peerRef = useRef(new Peer(peerId))
  const streamRef = useRef<MediaStream | null>(null)
  const userVideo = useRef<HTMLVideoElement | null>(null)
  const remoteVideo = useRef<HTMLVideoElement | null>(null)

  const [connection, setConnection] = useState<MediaConnection | null>(null)

  const getMediaAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      streamRef.current = stream

      if (userVideo.current){
        userVideo.current.srcObject = stream
      }
    } catch (e){
      console.log(e)
    }
  }

  useEffect(() => {
    getMediaAccess()
  }, [])

  useEffect(() => {
    connection?.on("stream", (remote) => {
      if (remoteVideo.current){
        remoteVideo.current.srcObject = remote
      }
    })

    return () => {
      connection?.close()
    }
  }, [connection])

  useEffect(() => {
    const call = peerRef.current
    call.on("call", (incoming) => {
      if (!streamRef.current){
        getMediaAccess()
        return
      }

      incoming.answer(streamRef.current)
      setConnection(incoming)
    })

    return () => {
      call.off("call")
    }
  }, [])

  const callSomeone = async () => {
    if (!streamRef.current){
      console.log("User must give per")
      return
    }

    const connection = peerRef.current.call("123", streamRef.current)
    setConnection(connection)
  }

  return (
    <>
      <Button onClick={getMediaAccess}>Get media access</Button>
      <Button onClick={callSomeone}>Call Someone</Button>
      <div className="flex space-x-8">
        <div className="w-96">
        <Video ref={userVideo} muted>
          <VideoTitle>
            <VideoUserDetails
              role="Frontend Engineer"
              name="John Doe"
            />
          </VideoTitle>
        </Video>
      </div>
      <div className="w-96">
        <Video ref={remoteVideo}>
          <VideoTitle>
            <VideoUserDetails
              role="Backend Engineer"
              name="John Doe"
            />
          </VideoTitle>
        </Video>
      </div>
      </div>
    </>
  )
}

export default App

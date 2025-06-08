import ImageSequenceCanvas from "@/components/ImageSequenceCanvas";

export default function Home() {
  return (
     <ImageSequenceCanvas
        scrollHeight={5000}
        numFrames={278}
        width={1920}
        height={1024}
      />
  );
}

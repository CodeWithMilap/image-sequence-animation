'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ImageSequenceCanvasProps {
  scrollHeight: number;
  numFrames: number;
  width: number;
  height: number;
}

const getCurrentFrame = (index: number): string => {
  return `/Frames/${index.toString().padStart(4, '0')}.png`;
};

const ImageSequenceCanvas: React.FC<ImageSequenceCanvasProps> = ({
  scrollHeight,
  numFrames,
  width,
  height,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [frameIndex, setFrameIndex] = useState<number>(0);

  // Preload images
  const preloadImages = () => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= numFrames; i++) {
      const img = new Image();
      img.src = getCurrentFrame(i);
      loadedImages.push(img);
    }
    setImages(loadedImages);
  };

  // Handle scroll events
  const handleScroll = () => {
    const scrollFraction = window.scrollY / (scrollHeight - window.innerHeight);
    const index = Math.min(numFrames - 1, Math.floor(scrollFraction * numFrames));

    if (index <= 0 || index >= numFrames) return;
    setFrameIndex(index);
  };

  // Set up canvas
  const renderCanvas = () => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');
    if (context) {
      context.canvas.width = width;
      context.canvas.height = height;
    }
  };

  // Initialize component
  useEffect(() => {
    preloadImages();
    renderCanvas();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Render images to canvas
  useEffect(() => {
    if (!canvasRef.current || images.length < 1) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    let requestId: number;
    const render = () => {
      if (images[frameIndex]) {
        context.clearRect(0, 0, width, height);
        context.drawImage(images[frameIndex], 0, 0, width, height);
      }
      requestId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(requestId);
  }, [frameIndex, images, width, height]);

  return (
    <div style={{ height: `${scrollHeight}px` }} className="relative">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 transform w-full h-full"
      />
    </div>
  );
};

export default ImageSequenceCanvas;
'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ImageSequenceCanvasProps {
  scrollHeight: number;
  numFrames: number;
  width: number;
  height: number;
}

interface CanvasSize {
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
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });

  // Calculate responsive canvas size
  const updateCanvasSize = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const aspectRatio = width / height;
    
    let newWidth = viewportWidth;
    let newHeight = viewportWidth / aspectRatio;
    
    // If height is too tall, scale based on height instead
    if (newHeight > viewportHeight) {
      newHeight = viewportHeight;
      newWidth = viewportHeight * aspectRatio;
    }
    
    setCanvasSize({
      width: newWidth,
      height: newHeight
    });
  };

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
      context.canvas.width = canvasSize.width;
      context.canvas.height = canvasSize.height;
    }
  };

  // Initialize component
  useEffect(() => {
    preloadImages();
    updateCanvasSize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  // Update canvas size when container size changes
  useEffect(() => {
    renderCanvas();
  }, [canvasSize]);

  // Render images to canvas
  useEffect(() => {
    if (!canvasRef.current || images.length < 1) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    let requestId: number;
    const render = () => {
      if (images[frameIndex]) {
        context.clearRect(0, 0, canvasSize.width, canvasSize.height);
        context.drawImage(images[frameIndex], 0, 0, canvasSize.width, canvasSize.height);
      }
      requestId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(requestId);
  }, [frameIndex, images, canvasSize]);

  return (
    <div style={{ height: `${scrollHeight}px` }} className="relative">
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          style={{
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`
          }}
        />
      </div>
    </div>
  );
};

export default ImageSequenceCanvas;
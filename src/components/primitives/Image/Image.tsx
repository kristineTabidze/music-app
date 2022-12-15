import React from "react";
import { IImageProps } from "./types"; 
import '../../../styles/primitives/_image.scss'
import { twMerge } from "tailwind-merge";

const Image: React.FC<IImageProps> = ({ alt = '', src, className = "", isRound }) => {
  return <img alt={alt} src={src} className={twMerge(`image ${isRound ? 'image--round' : ''}`, className)} />;
};

export default Image;

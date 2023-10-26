import { AlphaTabApi } from '@coderline/alphatab/dist/alphaTab.mjs';
export {};

declare global {
  interface Window {
    alphaTab: any;
  }
}
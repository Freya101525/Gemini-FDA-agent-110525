
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import { performOcrOnImage } from './geminiService';
import type { GoogleGenAI } from '@google/genai';
import type { OcrMethod } from '../types';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://aistudiocdn.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export function parsePageSelection(selectionStr: string, maxPages: number): number[] {
  if (!selectionStr) {
    return Array.from({ length: maxPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  const parts = selectionStr.split(',');

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart.includes('-')) {
      const [start, end] = trimmedPart.split('-').map(Number);
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= maxPages) {
            pages.add(i);
          }
        }
      }
    } else {
      const pageNum = Number(trimmedPart);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPages) {
        pages.add(pageNum);
      }
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

export async function getPageCount(file: File): Promise<number> {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    return pdf.numPages;
}


async function processPdf(file: File, ai: GoogleGenAI | undefined, method: OcrMethod, pagesToProcess: number[]): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (const pageNum of pagesToProcess) {
        const page = await pdf.getPage(pageNum);
        let pageText = '';

        if (method === 'direct') {
            try {
                const textContent = await page.getTextContent();
                pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
                if (!pageText.trim()) {
                    pageText = `(No text found on this page with Direct Extraction. Try LLM-based OCR if this is a scanned document.)`;
                }
            } catch (error) {
                pageText = `Error during direct text extraction: ${error instanceof Error ? error.message : String(error)}. Try LLM-based OCR.`;
            }
        } else { // 'llm'
            if (!ai) {
                throw new Error('GoogleGenAI instance is required for LLM-based OCR.');
            }
            const viewport = page.getViewport({ scale: 1.5 });
            
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            if (!context) {
                throw new Error('Could not get canvas context');
            }

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            await page.render(renderContext).promise;

            const blob: Blob | null = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.8));
            if (blob) {
                try {
                    pageText = await performOcrOnImage(ai, blob);
                } catch (error) {
                     pageText = `OCR Failed: ${error instanceof Error ? error.message : String(error)}`;
                }
            }
        }
        
        fullText += `\n\n--- Page ${pageNum} ---\n\n${pageText.trim()}`;
        page.cleanup();
    }
    return fullText;
}

function processTxt(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsText(file);
  });
}

export async function processFile(file: File, ai: GoogleGenAI, method: OcrMethod, pagesToProcess?: number[]): Promise<string> {
  if (file.type === 'application/pdf') {
    if (!pagesToProcess) {
      throw new Error("Page selection is required for PDF processing.");
    }
    return processPdf(file, method === 'llm' ? ai : undefined, method, pagesToProcess);
  } else if (file.type === 'text/plain') {
    return processTxt(file);
  } else {
    throw new Error(`Unsupported file type: ${file.type}`);
  }
}

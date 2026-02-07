import { Injectable } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import markdown from 'highlight.js/lib/languages/markdown';
import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('python', python);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('bash', bash);

@Injectable({
  providedIn: 'root',
})
export class HighlightCodeService {
  highlightAll(container: HTMLElement) {
    const codeBlocks = container.querySelectorAll('pre code');
    console.log(codeBlocks);

    codeBlocks.forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }
}

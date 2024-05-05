/* editor-page.component.ts */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FugueRuntimeService } from '../fugue-runtime.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HostListener } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.css'
})

export class EditorPageComponent implements OnInit {
  userString: string = 'reckless: ';
  editorContent: string = '';
  isSidebarOpen = false;
  
  programOutputHTML: string = '';
  debuggerStateHTML: string = '';
  debuggerControlHTML: string = '';
  memoryViewHTML: string = '';
  
  topActiveTab: string = 'debugger-control';
  bottomActiveTab: string = 'debugger-state';
  
  // NOTE: top panel = console and bottom panel = debugger
  // because changing the ids causes shit to not display properly and idk where the ids are referenced
  lastClickedTopOrBottom: boolean = true;
  
  setActiveTab(id: string) {
    if (this.lastClickedTopOrBottom) this.topActiveTab = id;
    else this.bottomActiveTab = id;
  }
  
  console = console;
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.editorContent = params['content'];
    });

    this.fugue.fugueState.subscribe((state: string) => {
      if (state.startsWith('ERROR: ')) {
        const msg = "Could not compile program! (See output window for more information)"
        this.programOutputHTML   = state;
        this.debuggerStateHTML   = msg;
        this.debuggerControlHTML = msg;
        this.memoryViewHTML      = msg;
      } else {
        const [dbg, out, con, mem, ...rest] = state.split('{{{___FUNKY_SEPERATOR___}}}');
        this.programOutputHTML   = this.sanitizer.bypassSecurityTrustHtml(out) as string;
        this.debuggerStateHTML   = this.sanitizer.bypassSecurityTrustHtml(dbg) as string;
        this.debuggerControlHTML = this.sanitizer.bypassSecurityTrustHtml(con) as string;
        this.memoryViewHTML      = this.sanitizer.bypassSecurityTrustHtml(mem) as string;
      }
    });
  }
  
  @HostListener("click", ["$event.target"])
  onClick(targetElement: any) {
    if (targetElement.tagName.toLowerCase() === "button") {
      if (targetElement.dataset.ip !== undefined) {
        this.fugue.stepProgramTo(targetElement.dataset.ip);
      } else if (targetElement.dataset.id === 'step') {
        this.fugue.stepProgram();
      } else if (targetElement.dataset.id === 'reset') {
        this.fugue.resetProgram();
      }
    }
  }

  constructor(private fugue: FugueRuntimeService, private sanitizer: DomSanitizer, private route: ActivatedRoute) {}

  /* Allows us to watch text editor field */
  @ViewChild('editor') editor!: ElementRef;
  
  updateSource() { this.fugue.loadProgram(this.editor.nativeElement.value); }
  toggleSidebar() { this.isSidebarOpen = !this.isSidebarOpen; }
  closeSidebar() { this.isSidebarOpen = false; }

    /* Prevents Tab from switching focus and appends the space to textarea */
    onKeydownTab(event:Event):void {
      if(event instanceof KeyboardEvent) {
        if(event.key === 'Tab') {
          event.preventDefault();
          const cursorPos = this.editor.nativeElement.selectionStart;
          const currentValue = this.editor.nativeElement.value;
          const newValue = currentValue.slice(0, cursorPos) + '\t' + currentValue.slice(cursorPos);
          this.editor.nativeElement.value = newValue;
          this.editor.nativeElement.setSelectionRange(cursorPos + 1, cursorPos + 1);
        }

        
        const cursorPos = this.editor.nativeElement.selectionStart;
        const textBeforeCursor = this.editor.nativeElement.value.substring(0, cursorPos);
        const lastWord = textBeforeCursor.split(/[^\w]/).pop();

        if (lastWord && lastWord.length > 1) {
          this.autoCompleteValue = lastWord;
          this.showAutoComplete = true;
        } else {
          this.showAutoComplete = false;
          this.autoCompleteValue = '';
        }
      }
    }
  
    // Autocompletion variables and methods
    autoCompleteOptions: string[] = ['def','main','end'];
    showAutoComplete: boolean = false;
    autoCompleteValue: string = '';
  
    onKeyUp(event: KeyboardEvent) {
      if (event.key === 'Backspace' || event.key === 'Delete' || event.key === 'delete') {
        this.showAutoComplete = false;
        this.autoCompleteValue = '';
        return;
      }
  
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        return;
      }
  
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Tab') {
        this.showAutoComplete = false;
        this.autoCompleteValue = '';
        return;
      }
      
      console.log("Reach this point");

      const cursorPos = this.editor.nativeElement.selectionStart;
      const textBeforeCursor = this.editor.nativeElement.value.substring(0, cursorPos);
      const lastWord = textBeforeCursor.split(/[^\w]/).pop();
  
      if (lastWord && lastWord.length > 1) {
        this.autoCompleteValue = lastWord;
        this.showAutoComplete = true;
      } else {
        this.showAutoComplete = false;
        this.autoCompleteValue = '';
      }
    }
  
    onAutoCompleteSelect(option: string) {
      const cursorPos = this.editor.nativeElement.selectionStart;
      const text = this.editor.nativeElement.value;
      const startOfLine = text.lastIndexOf('\n', cursorPos - 1) + 1;
      const endOfLine = text.indexOf('\n', cursorPos);
      const line = text.substring(startOfLine, endOfLine === -1 ? text.length : endOfLine);
      const words = line.split(/\s+/);
      const lastWordIndex = line.lastIndexOf(words[words.length - 1]);

      if (lastWordIndex !== -1) {
        const newText = text.substring(0, startOfLine + lastWordIndex) + option;
        this.editor.nativeElement.value = newText + text.substring(startOfLine + lastWordIndex + words[words.length - 1].length);
        this.editor.nativeElement.setSelectionRange(cursorPos + option.length - this.autoCompleteValue.length, cursorPos + option.length - this.autoCompleteValue.length);
        this.updateSource();
      }
      this.showAutoComplete = false;
      this.autoCompleteValue = '';
    }
  }
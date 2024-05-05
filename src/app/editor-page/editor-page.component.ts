import { Component, ElementRef, ViewChild } from '@angular/core';
import { FugueRuntimeService } from '../fugue-runtime.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.css'
})

export class EditorPageComponent {
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

  constructor(private fugue: FugueRuntimeService, private sanitizer: DomSanitizer) {}

  /* Allows us to watch text editor field */
  @ViewChild('editor') editor!: ElementRef;
  
  updateSource() { this.fugue.loadProgram(this.editor.nativeElement.value); }
  toggleSidebar() { this.isSidebarOpen = !this.isSidebarOpen; }
  closeSidebar() { this.isSidebarOpen = false; }

  /* Prevents Tab from switching focus and appends the space to textarea */
  onKeydownTab(event:Event):void {
    if(event instanceof KeyboardEvent) {
    // console.log('Editor input event triggered');
    
    console.log(this.bottomActiveTab);
    
      if(event.key === 'Tab') {
        console.log('Tab keydown event triggered');
        event.preventDefault();
        const cursorPos = this.editor.nativeElement.selectionStart;
        const currentValue = this.editor.nativeElement.value;
        const newValue = currentValue.slice(0, cursorPos) + '\t' + currentValue.slice(cursorPos);
        this.editor.nativeElement.value = newValue;
        this.editor.nativeElement.setSelectionRange(cursorPos + 1, cursorPos + 1);
      }
    }
  }

  
}

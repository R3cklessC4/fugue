/* app.component.ts */
import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fugue';
  imagePath: any;
  isLogin: boolean = false;

  beginner = 'def main \n\t34 34 + puti \nend';
  intermediate = 'def main \n\t0 while dup 20 < do \n\t\t0 while dup over(2) < do \n\t\t\t"*" puts \n\t\t\t1 + end drop \n\t\t"<br>" puts \n\t\t1 + \n\tend drop \nend';
  controlStructures = '  # Now that we have gone over the basic kinds of variables and how to manipulate them, time to get to the good stuff.\n\
  # If you want a program to do anything useful, you need to have access to two mechanisms:\n\
  # Decision: You need to be able to execute different code depending on the current state of the program.\n\
  # Repetition: You need the ability to run the same code multiple times.\n\
  \n\
  # If you\'ve done any programming, this statement might be extremely obvious, but it is important to mention nevertheless\n\
  # because without a programming language way to handle these two things, it\'s just a calculator.\n\
  \n\
  # Fugue deals with decisions in the same way most programming languages do, with if statements! The only difference\n\
  # is the usual postfix shenanigans. And they come in two forms:\n\
  # condition if codeThatRunsIfTrue end\n\
  # condition if codeThatRunsIfTrue else codeThatRunsIfFalse end\n\
  \n\
  # The if construction consumes the top element of the stack (must be a boolean, i.e., a result of some kind of comparison)\n\
  # and runs the condition block if the value is true.\n\
  \n\
  # A little on type checking, the register stack state at the end of codeThatRunsIfTrue\n\
  # must match the code after the end in the case without the else branch.\n\
  # And the register stack after codeThatRunsIfTrue must match the register stack\n\
  # after codeThatRunsIfFalse if an else branch is present.\n\
  \n\
  # Now we have our repetition construction, the while loop. This is the only looping structure the language has by default,\n\
  # but there are secret features that we will cover later that can let you write your very own custom loop constructs.\n\
  # Here is the while loop syntax:\n\
  # while loopCondition do loopBody end\n\
  \n\
  # One important thing to note is that the state of the register stack immediately after the while word needs to match\n\
  # the type stack right before the end word is encountered. This makes sense if you think about the fact that you go from the\n\
  # end of the loop back to the condition body and if things did not line up, you could very easily trash your stack.\n\
  \n\
  # You will be provided with a number on the top of the stack (n).\n\
  # Your task is to print whether that number is even or odd, followed by n exclamation points.\n\n\def main\n\ \nend';

  arithmetic = '  # Welcome to Fugue!\n\
  # To get started we first need to talk about stacks and reverse Hungarian notation (don\'t worry it\'s not that bad).\n\
  # This language is a bit funkier than your average programming language, and one of the main ways this manifests is in how\n\
  # mathematical expressions are written.\n\
  \n\
  # Most programming languages use "infix" expressions, meaning that if you want to add 3 to 2 you write "3 + 2".\n\
  # Fugue uses "postfix" (that\'s the Hungarian stuff), meaning that if you want to add 3 to 2 you write "3 2 +".\n\
  \n\
  # This is where the stacks come in. Let\'s take a look at the above example and what the Fugue interpreter will do\n\
  # when it encounters each of the symbols in "3 2 +".\n\
  # 3 -> push 3 onto the "register stack"                             ==> stack is now [3]\n\
  # 2 -> push 2 onto the "register stack"                             ==> stack is now [3, 2]\n\
  # + -> consume the top two elements on the stack and push their sum ==> stack is now [5]\n\
  \n\
  # We will explain the register stack in more detail in the next tutorial, but for now just think of it as your local\n\
  # variables you work with when doing math and stuff.\n\
  \n\
  # The main function will provide you with a number at the top of your register stack and your task is to print:\n\
  # Double that number plus 12.\n\
  # For example: if the task was to add two to the input number, we would just have to write "2 +" because there is already a number\n\
  # on the stack.\n\
  # Hint: you can consume and print the top of the stack with the \'puti\' word (i.e., "3 puti" would print 3).\n\n\def main\n\ \nend';
  

  constructor(private router: Router){
    this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.isLogin = event.url === '/login-page';
    });
  }

  setEditorContent(content: string) {
    console.log(content);
    this.router.navigate(['/editor-page'], { queryParams: { content: content } });
  }

  setBeginner(){
    this.setEditorContent(this.beginner);
  }

  setIntermediate(){
    this.setEditorContent(this.intermediate);
  }

  setControlStructure(){ 
    this.setEditorContent(this.controlStructures);
  }

  setArithmetic(){ 
    this.setEditorContent(this.arithmetic);
  }
}

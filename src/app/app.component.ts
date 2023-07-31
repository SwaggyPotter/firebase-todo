import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, deleteDoc } from '@angular/fire/firestore';
import { doc, setDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';

interface Item {
  name: string,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebase-todo';
  todos$: Observable<any[]>;
  firestore: Firestore = inject(Firestore);
  todoText: string = '';

  constructor() {
    const itemCollection = collection(this.firestore, 'todos');
    this.todos$ = collectionData(itemCollection);

    this.todos$.subscribe((newtodos) => {
      console.log('Neue todos:', newtodos)
    })
  }

  async addTodo() {
    const itemCollection = collection(this.firestore, 'todos');
    await setDoc(doc(itemCollection, this.todoText), { name: this.todoText });
  }

  async deleteTodo(todoName: any) {
    const itemCollection = collection(this.firestore, 'todos');
    await deleteDoc(doc(itemCollection, todoName));
  }
}

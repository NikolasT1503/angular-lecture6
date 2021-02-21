import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mod1',
  templateUrl: './mod1.component.html',
  styleUrls: ['./mod1.component.css'],
})
export class Mod1Component implements OnInit {
  // поведение в объекте
  form1 = { name: '', description: '' };

  //поведение в форме
  name1 = '';
  description1 = '';

  toggle: boolean;

  reactivForm1 = new FormGroup({
    name: new FormControl(),
    description: new FormControl(''),
  });

  reactivFormBuilder: FormGroup;

  constructor(fb: FormBuilder) {
    this.reactivFormBuilder = fb.group({
      name: [null,Validators.required],
      /*       description: [''],  - старый вариант - альтернативный*/
      description: fb.control(undefined,Validators.required), //если всего один валидатор, то можно без массива - вторым параметром
      phones: fb.array([['+7955123456'], ['+7983654321'], ['+7995987654']]),
      age: fb.control(null,[Validators.min(10), Validators.max(100)]),
      title: [{value:null, disabled:true},Validators.required],
    });

    this.reactivFormBuilder.get('name').valueChanges.subscribe(value => {
      if (value === "Привет") {
        this.reactivFormBuilder.get('description').setValue(value);
      }
    })

    this.reactivFormBuilder.get('title').statusChanges.subscribe(newStatus => {
      this.reactivFormBuilder.get('description').setValue('Статус изменился, новый статус: ' + this.reactivFormBuilder.get('title').status);
    })
  }

  ngOnInit(): void {}

  get getPhones() {
    return this.reactivFormBuilder.get('phones') as FormArray;
  }

  get getAge() {
    return this.reactivFormBuilder.get('age') as FormControl;
  }

  toggleDE(){
    if (this.reactivFormBuilder.get('title').enabled) {
      this.reactivFormBuilder.get('title').disable();
    }
    else{
      this.reactivFormBuilder.get('title').enable();
    }  
  }

  refresh(){
    this.reactivFormBuilder.reset();  //сбрасывает все поля модели reactivFormBuilder к пустым 
  }
}

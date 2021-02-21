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

  hint: string;
  hint1: string;

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
      sum: [0,Validators.pattern('[0-9]*')],
    });

    this.reactivFormBuilder.get('sum').valueChanges.subscribe(value => {
      if (value != 0) {
        this.hint1 = 'Сумма была изменена! Новое значение = '+value + ' Старое значение = '+ this.reactivFormBuilder.value['sum'];
      }
    })

    this.reactivFormBuilder.get('sum').statusChanges.subscribe(newStatus => {
      this.hint = 'Статус изменился, новый статус: ' + this.reactivFormBuilder.get('sum').status;
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

import { Component, OnInit, Input} from '@angular/core';
import {UserService} from '../../Services/user.service'
import {User} from '../../Model/User'
import { format } from 'url';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import {Card} from '../../Model/Card'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  user: Observable<User>
  private userDoc: AngularFirestoreDocument<User>;

  subjectList: any[] = [];
  teachersList: any[] = [];

  // Nome do usuario no card
  @Input() cardNome: string;

  // Profissao do card
  @Input() cardProfissao: string;

  // Rating
  @Input() cardRating: number;

  @Input() cardImgUser: string;


  cardList2: Card[] = [
    {
      cardNome: 'Guilherme Moretti',
      cardProfissao: 'Professor',
      cardImgUser: 'https://www.revide.com.br/media/upload/ckeditor/2017/09/21/guilherme-moretti-2.jpg'
    },
    {
      cardNome: 'Bill Jobs',
      cardProfissao: 'Técnico de informática',
      cardImgUser: 'http://s2.glbimg.com/_W40Fnhda--F6kUXBaPR4YWhayk=/smart/e.glbimg.com/og/ed/f/original/2016/02/25/billgatesdjvinyl0216-616x440.jpg'
    },
    {
      cardNome: 'Steve Gates',
      cardProfissao: 'R.I.P',
      cardImgUser: 'http://rpv.org.br/wp-content/uploads/2016/08/desperto_alem_do_tumulo_0.jpg'
    },
    {
      cardNome: 'The Rock',
      cardProfissao: 'Ator',
      cardImgUser: 'https://reseuro.magzter.com/1513x1500/articles/3401/179041/57bc4e761a10f/Dwayne-Johnson-The-Rock-Wrestling-Fitness-Workout-Luke-Hobbs-Arnold-Schwarzenegger-Baywatch_1471980235.jpg?utm_source=link&utm_campaign=link_art_campaign&dt=1471564800#.W_h382n4xMY.link'
    }
  ]

  cardsList: any[] = [
    {
      'cardNome': 'Peter Park',
      'cardProfissao': 'Fotógrafo',
      'cardImgUser': 'https://static.glamurama.uol.com.br/mediacenter/mediacenter_fotos_final2010/20100702_1405320625.jpg'
    },
    {
      'cardNome': 'And Pika',
      'cardProfissao': 'Ator porno',
      'cardImgUser': 'http://4.bp.blogspot.com/_dUQscAK9jn4/SYJMFzbc1QI/AAAAAAAAAEc/h5NT4qxEEgs/s320/peter.bmp'
    },
    {
      'cardNome': 'Vitim frango',
      'cardProfissao': '55 kilos',
      'cardImgUser': 'https://static.glamurama.uol.com.br/mediacenter/mediacenter_fotos_final2010/20100702_1405320625.jpg'
    },
    {
      'cardNome': 'Danilin de saco cheio',
      'cardProfissao': 'Vendo PC',
      'cardImgUser': 'http://4.bp.blogspot.com/_dUQscAK9jn4/SYJMFzbc1QI/AAAAAAAAAEc/h5NT4qxEEgs/s320/peter.bmp'
    },
    {
      'cardNome': 'Peter Park',
      'cardProfissao': 'Fotógrafo',
      'cardImgUser': 'https://static.glamurama.uol.com.br/mediacenter/mediacenter_fotos_final2010/20100702_1405320625.jpg'
    },
    {
      'cardNome': 'And Pika',
      'cardProfissao': 'Ator porno',
      'cardImgUser': 'http://4.bp.blogspot.com/_dUQscAK9jn4/SYJMFzbc1QI/AAAAAAAAAEc/h5NT4qxEEgs/s320/peter.bmp'
    },
    {
      'cardNome': 'Vitim frango',
      'cardProfissao': '55 kilos',
      'cardImgUser': 'https://static.glamurama.uol.com.br/mediacenter/mediacenter_fotos_final2010/20100702_1405320625.jpg'
    },
    {
      'cardNome': 'Danilin de saco cheio',
      'cardProfissao': 'Vendo PC',
      'cardImgUser': 'http://4.bp.blogspot.com/_dUQscAK9jn4/SYJMFzbc1QI/AAAAAAAAAEc/h5NT4qxEEgs/s320/peter.bmp'
    }

  ]

  constructor(
    private userService: UserService,
    public db: AngularFirestore,
    public afAuth: AngularFireAuth) 
    { }

  ngOnInit() {  

    var ref = this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).valueChanges();
      ref.subscribe(res =>{
       var user = res as User;
       this.subjectList = user.learn;

       for(let item of this.subjectList){
        //  console.log('Item que deseja aprender ' + item);
        var queryRef = this.db.collection('subjects').doc(item).valueChanges()
         queryRef.subscribe(result => {
          var users = result as any;
          this.teachersList = users.teach;
          console.log(this.teachersList)

       });
      }

    

      })
    
  }

  showCards(){

    
  }


}

import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import emailjs from '@emailjs/browser';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { PersonioService } from '../../personio.service';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit{
  uploadProgress: number | undefined;
  selectedFile: File | null = null;
  employees: any[] = [];


  constructor(private firestore: Firestore, private storage: AngularFireStorage) { }


  //Personio teil
  ngOnInit(): void {
    // this.personioService.authenticate().subscribe(
    //   data => {
    //     console.log('Authentication success:', data);
    //   },
    //   error => {
    //     console.error('Authentication error:', error);
    //   }
    // );
  }

  

  //Firebase 
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      const filePath = `uploads/${this.selectedFile.name}`;
      const storageRef = ref(getStorage(), filePath);
      const uploadTask = uploadBytesResumable(storageRef, this.selectedFile);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploadProgress = progress;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Upload error:', error);
        },
        () => {
          // Upload abgeschlossen, jetzt die Download-URL abrufen
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            // Hier kannst du die Download-URL speichern oder weiterverarbeiten
          }).catch((error) => {
            console.error('Fehler beim Abrufen der Download-URL:', error);
          });
        }
      );
    }
  }

  addData(f: NgForm): void {
    console.log(f);

    if (f.valid) {
      const fachrichtung = f.value.Fachrichtung.Systemintegration;

      if (fachrichtung) {
        const collectionInstance = collection(this.firestore, 'bewerbungsformular');
        addDoc(collectionInstance, {

          Fachrichtung: fachrichtung
        })
        .then(() => {
          console.log('Daten wurden erfolgreich gespeichert');
          f.resetForm();
        })
        .catch((err) => {
          console.error('Fehler beim Speichern der Daten:', err);
        });
      } else {
        console.log('Bitte füllen Sie alle erforderlichen Felder aus.');
      }
    }
  }

  sendEmail(e: Event): void {
    e.preventDefault();

    emailjs.sendForm('service_nntwli6', 'template_jz61pi2', e.target as HTMLFormElement, 'cMAg9qSGriPxI14Ox')
      .then(
        () => {
          console.log('E-Mail wurde erfolgreich gesendet!');
        },
        (error: any) => {
          console.error('Fehler beim Senden der E-Mail:', error);
        }
      );
  }



}

import { Component } from '@angular/core';
import { MusicService } from '../services/music.service';
import { ModalController } from '@ionic/angular';
import { SongsModalPage } from '../songs-modal/songs-modal.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  artists: any;
  artistsFromJson: any;
  albums: any ;
  currentSong;
  newTime;
  slideOps = {
    initialSlide: 1,
    slidesPerView: 3,
    centeredSlide: true,
    speed: 400
  }
  song = {
    playing: false,
    name: '',
    preview_url: ''
  }
  constructor(
    private musicService: MusicService,
    private modalController: ModalController) {}
  ionViewDidEnter() {
    this.musicService.getArtists().then(listArtists => { //lista de artistas desde po
    this.artists = listArtists;
    });
    this.artistsFromJson = this.musicService.getArtistsFromJson(); // listas de artistas desde api json
    this.musicService.getAlbums().then(listAlbums => { // listas de albums desde api
    this.albums = listAlbums;
    })
  }
  async showSongs(artist) {
    const songs = await this.musicService.getArtistTracks(artist.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs,
        artist: artist.name
      }
    });
  
    modal.onDidDismiss().then( dataReturned => {
      this.song = dataReturned.data
    })
    return await modal.present();
  }
  async showSongsAlbum(album) {
    const songs = await this.musicService.getAlbumsTracks(album.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs,
        album: album.name
      }
    });

    modal.onDidDismiss().then( dataReturned => {
      this.song = dataReturned.data
    })
    return await modal.present();
  }

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime = (1 / this.currentSong.duration ) * this.currentSong.currentTime;
    })
    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }
  
  parseTime( time = "0.00") {
    if (time) {
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime / 60 ).toString();
      if (minutes.length == 1) {
        minutes = "0" + minutes;
      }
      let seconds = (partTime % 60 ).toString();
      if (seconds.length == 1) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds
    }
  }
}
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment.development';
import type { GiphyReponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {
    constructor() {
      this.loadTrendingGifs();
    }
    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    private http = inject(HttpClient)


  loadTrendingGifs(){
    this.http.get<GiphyReponse>(`${ environment.giphyUrl }/gifs/trending`,{
      params:{
        api_key: environment.giphyApiKey,
        limit: 20,
      }
    })
    .subscribe( (resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data)
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false)
    } )
  }

  searchGifs(query: string){
    return this.http.get<GiphyReponse>(`${ environment.giphyUrl }/gifs/search`,{
      params:{
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query,
      }
    })
    .pipe(
      map(({data}) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
    );
    // TODO: Historial
    // .subscribe( (resp) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data)
    //   console.log({search: gifs});
    // } )
  }
}

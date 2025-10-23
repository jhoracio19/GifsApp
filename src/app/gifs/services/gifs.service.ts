import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment.development';
import type { GiphyReponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

const GIF_KEY = 'gifs'

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);

  return gifs
}

@Injectable({providedIn: 'root'})
export class GifService {
    constructor() {
      this.loadTrendingGifs();
    }
    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage())
    searchHistoryKeys = computed( () => Object.keys(this.searchHistory()));

    private http = inject(HttpClient)

    saveGifsToLocalStorage = effect(() => {
      const historyString = JSON.stringify(this.searchHistory())
      localStorage.setItem(GIF_KEY, historyString)
    })


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

      //  Historial
      tap( items => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLowerCase()]: items,
        }))
      })
    );
    // .subscribe( (resp) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data)
    //   console.log({search: gifs});
    // } )
  }

  getHistoryGifs(query: string): Gif[]{
    return this.searchHistory()[query] ?? [];
  }
}

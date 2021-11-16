export class PagedResults<T>{
  constructor(
    public totalCount: number,
    public items: T[] = [],
  ){}
}

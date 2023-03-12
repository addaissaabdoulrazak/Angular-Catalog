export interface Product {
    id: string;
    name: string;
    price: number;
    promotion : boolean
}

export interface pageProduct{

    products : Product[];

    size : number;

    currentPage :number;

    totalPages : number;

}

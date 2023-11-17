export interface IFiltersState {
  description: string;
  categoryId: string;
  mouth: string;
  year: string;
}

export interface IFilterPayload {
  filters: {
    description?: string;
    categoryId?: string;
    mouth?: string;
    year?: string;
  };
}

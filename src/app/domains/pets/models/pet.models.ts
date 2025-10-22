export type PetKind = 'dog' | 'cat' | 'other';
export type HealthTier = 'unhealthy' | 'healthy' | 'very healthy';


export interface Pet {
  id: number;
  name: string;
  kind: PetKind;
  weight: number;
  height: number;
  length: number;
  photo_url: string;
  description: string;
  number_of_lives?: number;
}

export interface PetWithHealth extends Pet {
  healthScore: number;
  healthTier: HealthTier;
}

export type PetSortValue = 'name' | 'weight' | 'height' | 'length' | 'kind' | null;
export type PetSortDirection = 'asc' | 'desc' | null;

export interface PetSortApi {
  sortValue: PetSortValue;
  sortDirection: PetSortDirection;
}

export interface PetSort {
  value: PetSortValue;
  viewValue: string;
}


export interface PetsPagination {
  page: number;
  perPage: number;
}

import { CreateCategoryDTO } from 'src/categories/dtos/CreateCategoryDTO';

type Override = Partial<CreateCategoryDTO>;

export function makeCategory(override: Override = {}) {
  return {
    description: 'Outros',
    userId: override.userId,
    icon: 'Other',
    ...override,
  };
}

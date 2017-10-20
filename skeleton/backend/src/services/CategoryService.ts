import CategoryRepository from '../repositories/CategoryRepository';
import Category from "../entities/Category";
import { CreateCategoryRequest, UpdateCategoryRequest } from "../interfaces/CategoryRequests";

class CategoryService {

    private static instance: CategoryService;

    public static getInstance(): CategoryService {
        if (!CategoryService.instance) {
            CategoryService.instance = new CategoryService();
        }

        return CategoryService.instance;
    }

    public async getCategoryByID(categoryID: number): Promise<Category|undefined> {
        return CategoryRepository.findOneById(categoryID);
    }

    public async getCategories(): Promise<Category[] | undefined> {
        return CategoryRepository.findAll();
    }

    public async createCategory(data: CreateCategoryRequest): Promise<Category> {
        const category: Category = await Category.create(data);

        return CategoryRepository.save(category);
    }

    public async updateCategory(category: Category, data: UpdateCategoryRequest) {
        if (data.name) {
            category.name = data.name;
        }

        await CategoryRepository.save(category);

        return category;
    }

    public async removeCategory(category: Category) {

        return CategoryRepository.remove(category);
    }

}

export default CategoryService.getInstance();
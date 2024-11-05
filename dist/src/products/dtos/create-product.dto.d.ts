import { StatusType } from '../../common/statusType.enum';
import { CreateSuggestionDto } from '../../suggestions/dtos/create-suggestions.dto';
export declare class CreateProductDto {
    name: string;
    status: StatusType;
    categoryId: string;
    imageUrl: string;
    price: number;
    remaining: number;
    description?: string;
    tags: string[];
    slug: string;
    couponCode?: string;
    suggestion: CreateSuggestionDto | null;
}

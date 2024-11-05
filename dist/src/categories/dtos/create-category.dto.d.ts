import { StatusType } from '../../common/statusType.enum';
export declare class CreateCategoryDto {
    name: string;
    description?: string;
    imageUrl?: string;
    order?: number;
    status: StatusType;
}

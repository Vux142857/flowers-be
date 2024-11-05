import { Tag } from '../tag.entity';
import { Repository } from 'typeorm';
export declare class TagService {
    private readonly tagRepository;
    constructor(tagRepository: Repository<Tag>);
    getTags(tagIds: string[]): Promise<Tag[]>;
}

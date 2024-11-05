import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserService } from './providers/users.service';
import { GetByParamDto } from '../common/get-by-param';
import { GetUserDto } from './dtos/get-user.dto';
import { RequireParamDto } from '../common/require-param';
import { SearchQueryDto } from '../common/search/dtos/search-query.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    getCustomer(getUserDto: GetUserDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<import("./user.entity").User>>;
    searchUser(searchQueryDto: SearchQueryDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<import("./user.entity").User>>;
    filterUser(filterUserDto: GetUserDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<import("./user.entity").User>>;
    countUser(getUserDto: GetUserDto): Promise<number>;
    getUsers(getUserParamDto: GetByParamDto, getUserDto: GetUserDto): Promise<import("../common/pagination/interfaces/paginated.interface").Paginated<import("./user.entity").User>> | Promise<import("./user.entity").User>;
    createUser(createUserDto: CreateUserDto): Promise<import("./user.entity").User>;
    patchUser(patchUserParamDto: RequireParamDto, patchUserDto: PatchUserDto): Promise<import("typeorm").UpdateResult>;
    deleteUser(deleteUserParamDto: RequireParamDto): {
        message: string;
    };
}

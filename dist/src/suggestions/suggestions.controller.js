"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const require_param_1 = require("../common/require-param");
const patch_suggestions_dto_1 = require("./dtos/patch-suggestions.dto");
const get_by_param_1 = require("../common/get-by-param");
const create_suggestions_dto_1 = require("./dtos/create-suggestions.dto");
const get_suggestion_dto_1 = require("./dtos/get-suggestion.dto");
const suggestions_service_1 = require("./providers/suggestions.service");
let SuggestionsController = class SuggestionsController {
    constructor(suggestionService) {
        this.suggestionService = suggestionService;
    }
    getSuggestions(getProductParamDto, getProductDto) {
        const { id } = getProductParamDto;
        const { limit, page } = getProductDto;
        return id
            ? this.suggestionService.getSuggestion(id)
            : this.suggestionService.getSuggestions(limit, page);
    }
    createSuggestion(createSuggestionDto) {
        return this.suggestionService.createSuggestion(createSuggestionDto);
    }
    updateSuggestion(patchSuggestionParamDto, patchSuggestionDto) {
        const { id } = patchSuggestionParamDto;
        return this.suggestionService.updateSuggestion(id, patchSuggestionDto);
    }
    deleteSuggestion(deleteProductParamDto) {
        const { id } = deleteProductParamDto;
        return this.suggestionService.deleteSuggestion(id);
    }
};
exports.SuggestionsController = SuggestionsController;
__decorate([
    (0, common_1.Get)('/:id?'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products or get only one product by id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The product has been successfully found.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: 'numberf', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: 'number', required: false }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_by_param_1.GetByParamDto,
        get_suggestion_dto_1.GetSuggestionDto]),
    __metadata("design:returntype", void 0)
], SuggestionsController.prototype, "getSuggestions", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_suggestions_dto_1.CreateSuggestionDto]),
    __metadata("design:returntype", void 0)
], SuggestionsController.prototype, "createSuggestion", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [require_param_1.RequireParamDto,
        patch_suggestions_dto_1.PatchSuggestionDto]),
    __metadata("design:returntype", void 0)
], SuggestionsController.prototype, "updateSuggestion", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [require_param_1.RequireParamDto]),
    __metadata("design:returntype", void 0)
], SuggestionsController.prototype, "deleteSuggestion", null);
exports.SuggestionsController = SuggestionsController = __decorate([
    (0, common_1.Controller)('suggestions'),
    __metadata("design:paramtypes", [suggestions_service_1.SuggestionService])
], SuggestionsController);
//# sourceMappingURL=suggestions.controller.js.map
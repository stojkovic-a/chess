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
exports.PositionToGameService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const position_to_game_entity_1 = require("./models/position-to-game.entity");
const typeorm_2 = require("typeorm");
let PositionToGameService = exports.PositionToGameService = class PositionToGameService {
    constructor(posToGameRepo) {
        this.posToGameRepo = posToGameRepo;
    }
    async getPosToGame(id) {
        return await this.posToGameRepo.findOneBy({ id: id });
    }
    async deletePosToGame(id) {
        return await this.posToGameRepo.delete(id);
    }
    async createPosToGame(dto) {
        const posToGame = await this.posToGameRepo.create(dto);
        return await this.posToGameRepo.save(posToGame);
    }
    async updatePosToGame(id, dto) {
        return await this.posToGameRepo.update(id, dto);
    }
};
exports.PositionToGameService = PositionToGameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(position_to_game_entity_1.PositionToGame)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PositionToGameService);
//# sourceMappingURL=position-to-game.service.js.map
import request from "./index";
import {ILevel} from "../types/level";


class LevelApi {
    getLevels = () => request.get<ILevel[]>('/levels')
}

export default new LevelApi()
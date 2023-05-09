import request from "./index";
import {ILevel} from "../types/level";


class LevelApi {
    getLevels = () => request.get<ILevel[]>('/levels')
    getLevel = (levelId: number) => request.get<ILevel>('/level/'+levelId)

    createLevel = (text: string) => request.post<ILevel>('/level/create', {
        text
    })

    editLevel = (level_id: number, text: string) => request.post<ILevel>('/level/edit', {
        level_id, text
    })

    removeLevel = (level_id: number) => request.delete('/level/remove', {
        level_id
    })

    addSubject = (level_id: number, subject_id: number) => request.post('/level_subject/add', {
        level_id, subject_id
    })

    removeSubject = (level_id: number, subject_id: number) => request.delete('/level_subject/remove', {
        level_id, subject_id
    })
}

export default new LevelApi()
import { DialogueVo } from "../dialogue/dialoguevo";

export interface DbRestoreData {
    filename: string;
    targetDbName: object;
    pwd: string;
    dialogueVo: DialogueVo;
}

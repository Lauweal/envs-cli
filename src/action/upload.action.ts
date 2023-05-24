import { Input } from "../command";
import { AbstractAction } from "./abstract.action";

export class UploadAction extends AbstractAction {
    public handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
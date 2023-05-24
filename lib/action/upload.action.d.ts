import { Input } from "../command";
import { AbstractAction } from "./abstract.action";
export declare class UploadAction extends AbstractAction {
    handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void>;
}

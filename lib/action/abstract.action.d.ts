import { Input } from "../command";
export declare abstract class AbstractAction {
    abstract handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void>;
}

import { parseError } from "./combinators/parseError.js";
import { parseWithErrorMessage } from "./combinators/parseWithErrorMessage.js";

export const parseIdentifier = parseWithErrorMessage<string>(
	"Expected an identifier",
	parseError,
);

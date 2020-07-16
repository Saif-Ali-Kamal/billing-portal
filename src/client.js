import Service from "./services/service";
import { getToken } from "./utils"

const service = new Service(getToken())
export default service
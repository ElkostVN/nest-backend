import { cleanEnv, port } from 'envalid'

export default (config: Record<string, unknown>) => cleanEnv(config, {
	APPLICATION_PORT: port()
})
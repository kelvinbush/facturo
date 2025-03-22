import pino from 'pino'
// @ts-ignore
export const logger = pino({
  transport: {
    target: 'pino-pretty'
  }
})
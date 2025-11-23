import { Thing, WithContext } from 'schema-dts'

/**
 * JSON-LD構造化データを生成するヘルパー関数
 */
export const generateJsonLd = (
    data: WithContext<Thing> | WithContext<Thing>[]
): string => {
    return JSON.stringify(data)
}

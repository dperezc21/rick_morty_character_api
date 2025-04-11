import NodeCache from "node-cache";

const nodeCache = new NodeCache();

export abstract class CacheRepository<T> {
    abstract getValue(key: string): T
    abstract setValue(key: string, value: T): void
}

export class NodeCacheService<T> implements CacheRepository<T>{
    getValue(key: string): T {
        return nodeCache.get(key);
    }

    setValue(key: string, value: T): void {
        nodeCache.set(key, JSON.stringify(value));
    }
}
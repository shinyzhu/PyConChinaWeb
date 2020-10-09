import { observable } from 'mobx';

import { service } from './service';

export interface BaseData {
    id: number;
    created_at: string;
    updated_at: string;
    published_at: string;
}

export type NewData<T extends BaseData> = {
    [key in keyof T]?: T[key] extends BaseData
        ? number
        : T[key] extends BaseData[]
        ? number[]
        : T[key];
};

export abstract class BaseModel<D extends BaseData, K extends keyof D = null> {
    abstract scope: string;

    @observable
    loading = false;

    @observable
    current = {} as D;

    @observable
    list: D[] = [];

    async searchBy(key: K, keyword: string) {
        const { body } = await service.get<D[]>(
            `${this.scope}?${key}_contains=${keyword}`
        );
        return (this.list = body);
    }

    select(key: keyof D, value: D[keyof D]) {
        const item = this.list.find(({ [key]: data }) => data === value);

        return (this.current = item ?? ({} as D));
    }

    async update({ id, ...data }: NewData<D>) {
        const { body } = await (id
            ? service.put<D>(`${this.scope}/${id}`, data)
            : service.post<D>(this.scope, data));

        return (this.current = body);
    }
}
import { BaseUser, BaseData, MediaData, service } from 'mobx-strapi';

import { Organization } from './Organization';

if (self.location.hostname !== 'localhost')
    service.baseURI = 'https://pycon.onazure.dev/';

export interface User extends BaseUser {
    name?: string;
    organizations: Organization[];
    avatar?: MediaData;
    summary: string;
    telphone?: string;
}

export interface Category extends BaseData {
    name: string;
    summary?: string;
}

export interface Place extends BaseData {
    name: string;
    location: string;
    capacity: number;
    indoor: boolean;
    available_times: any[];
    contacts: User[];
    owner: Organization;
    equipments: any[];
    films: MediaData[];
}

import {
    attribute,
    component,
    createCell,
    mixin,
    watch,
    Fragment
} from 'web-cell';
import { observer } from 'mobx-web-cell';
import debounce from 'lodash.debounce';

import { TabPanel, TabView } from 'boot-cell/source/Content/TabView';
import { Step } from 'boot-cell/source/Navigator/Stepper';
import { Button } from 'boot-cell/source/Form/Button';
import { FormField } from 'boot-cell/source/Form/FormField';

import { activity, organization } from '../model';
import { formToJSON } from 'web-utility/source/DOM';

export interface ExhibitionApplyProps {
    aid: number;
}

interface ExhibitionApplyState {
    step: number;
    organization: number;
}

@observer
@component({
    tagName: 'exhibition-apply',
    renderTarget: 'children'
})
export class ExhibitionApply extends mixin<
    ExhibitionApplyProps,
    ExhibitionApplyState
>() {
    @attribute
    @watch
    aid = 0;

    state = { step: 0, organization: 0 };

    connectedCallback() {
        this.classList.add('d-block', 'container');

        super.connectedCallback();
    }

    searchOrganization = debounce(
        ({ data }: InputEvent) => data && organization.searchBy('name', data),
        500
    );

    selectOrganization = ({ target }: Event) => {
        const { value } = target as HTMLInputElement;

        if (organization.current.name !== value)
            organization.select('name', value);
    };

    saveOrganization = async (event: MouseEvent) => {
        event.preventDefault();

        const { type, form } = event.target as HTMLButtonElement;

        const { id, name } = await organization.update(formToJSON(form));

        if (type !== 'submit') return this.setState({ step: 2 });

        await activity.createProgram({
            activity: this.aid,
            organization: id,
            type: 'exhibition',
            title: name
        });
        self.alert(`展示组织 ${name} 的展位申请已提交`);

        history.back();
    };

    renderOrganization() {
        const {
            list,
            current: { slogan, summary, link, message_link }
        } = organization;

        return (
            <form>
                <FormField
                    type="search"
                    name="name"
                    required
                    label="名称"
                    placeholder="可搜索已注册组织"
                    list="organization-list"
                    onInput={this.searchOrganization}
                    onChange={this.searchOrganization}
                    onBlur={this.selectOrganization}
                />
                <datalist id="organization-list">
                    {list.map(({ name }) => (
                        <option value={name} />
                    ))}
                </datalist>

                <FormField name="slogan" label="标语" value={slogan ?? ''} />
                <FormField
                    is="textarea"
                    name="summary"
                    label="简介"
                    value={summary ?? ''}
                />
                <FormField
                    type="url"
                    name="link"
                    label="官方网址"
                    value={link ?? ''}
                />
                <FormField
                    type="url"
                    name="message_link"
                    label="即时通讯链接"
                    placeholder="加群二维码、公众平台账号等对应的链接"
                    value={message_link ?? ''}
                />
                <Button
                    type="submit"
                    color="success"
                    onClick={this.saveOrganization}
                >
                    展示组织
                </Button>
                <Button onClick={this.saveOrganization}>展示项目</Button>
            </form>
        );
    }

    render({ aid }: ExhibitionApplyProps, { step }: ExhibitionApplyState) {
        return (
            <>
                <h2 className="mt-5 mb-4">开源市集 展位申请</h2>

                <TabView linear activeIndex={step}>
                    <Step icon={1}>参展单位</Step>
                    <TabPanel>
                        <Button
                            color="warning"
                            size="lg"
                            onClick={() => this.setState({ step: 2 })}
                        >
                            个人
                        </Button>
                        <Button
                            size="lg"
                            onClick={() => this.setState({ step: 1 })}
                        >
                            组织
                        </Button>
                    </TabPanel>

                    <Step icon={2}>组织信息</Step>
                    <TabPanel>{this.renderOrganization()}</TabPanel>

                    <Step icon={3}>项目信息</Step>
                    <TabPanel></TabPanel>
                </TabView>
            </>
        );
    }
}

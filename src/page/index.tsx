import { createCell, Fragment } from 'web-cell';
import { CellRouter } from 'cell-router/source';
import { observer } from 'mobx-web-cell';
import { service } from 'mobx-strapi';

import { NavBar } from 'boot-cell/source/Navigator/NavBar';
import { NavLink } from 'boot-cell/source/Navigator/Nav';
import { Button } from 'boot-cell/source/Form/Button';
import { DropMenu, DropMenuItem } from 'boot-cell/source/Navigator/DropMenu';

import { history, session } from '../model';
import { ProfilePage } from './Profile';
import { AgendaPage } from './Activity';
import { ExhibitionApply } from './Activity/ExhibitionApply';
import { ShowRoom } from './Activity/ShowRoom';
import { PartnerDetail } from './Activity/PartnerDetail';
import { AgendaDetail } from './Activity/AgendaDetail';

const menu = [
    {
        title: '首页',
        href: '/'
    },
    {
        title: '合作伙伴',
        href: 'activity/showroom?aid=1'
    },
    {
        title: 'Python开发者调研',
        href: 'https://www.wjx.cn/m/43310160.aspx'
    },
    {
        title: '立即购票',
        href: 'https://www.bagevent.com/event/6975077#website_moduleId_864150'
    }
];

export const PageFrame = observer(() => (
    <div>
        <NavBar
            narrow
            brand={
                <>
                    <img
                        alt="PyConChina 2020"
                        src="https://sres.blob.core.windows.net/img/main_logo_f718f64140.png"
                        style={{ width: '2rem', marginRight: '0.5rem' }}
                    />
                    PyConChina 2020
                </>
            }
        >
            {menu.map(({ title, ...props }) => (
                <NavLink {...props}>{title}</NavLink>
            ))}

            <Button
                style={{ margin: 'auto 1em auto auto' }}
                href={
                    'https://www.bagevent.com/event/6975077#website_moduleId_864150'
                }
            >
                立即购票（线上免费）
            </Button>

            {!session.user ? (
                <Button href={service.baseURI + 'connect/github/'}>登录</Button>
            ) : (
                <DropMenu caption={session.user.username}>
                    <DropMenuItem href="profile">基本信息</DropMenuItem>
                    <DropMenuItem onClick={() => session.signOut()}>
                        退出
                    </DropMenuItem>
                </DropMenu>
            )}
        </NavBar>

        <CellRouter
            style={{ minHeight: '60vh' }}
            history={history}
            routes={[
                { paths: [''], component: AgendaPage },
                { paths: ['profile'], component: ProfilePage },
                {
                    paths: ['activity/exhibition/apply'],
                    component: ExhibitionApply
                },
                { paths: ['activity/showroom'], component: ShowRoom },
                { paths: ['activity/partner'], component: PartnerDetail },
                { paths: ['activity/agenda'], component: AgendaDetail }
            ]}
        />
        <footer className="text-center bg-light py-5">
            Proudly developed with
            <a className="mx-1" target="_blank" href="https://web-cell.dev/">
                WebCell v2
            </a>
            &amp;
            <a
                className="mx-1"
                target="_blank"
                href="https://web-cell.dev/BootCell/"
            >
                BootCell v1
            </a>{' '}
            and hosted on{' '}
            <a href="https://azure.microsoft.com/?WT.mc_id=python-10572-xinglzhu">
                Microsoft Azure
            </a>{' '}
            by{' '}
            <a href="https://docs.microsoft.com/azure/static-web-apps/?WT.mc_id=python-10572-xinglzhu">
                Static Web Apps
            </a>
            .
        </footer>
    </div>
));

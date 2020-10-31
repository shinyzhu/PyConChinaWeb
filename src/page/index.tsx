import { createCell, Fragment } from 'web-cell';
import { CellRouter } from 'cell-router/source';
import { observer } from 'mobx-web-cell';

import { NavBar } from 'boot-cell/source/Navigator/NavBar';
import { NavLink } from 'boot-cell/source/Navigator/Nav';
import { Button } from 'boot-cell/source/Form/Button';
import { DropMenu, DropMenuItem } from 'boot-cell/source/Navigator/DropMenu';

import { history, service, session } from '../model';
import { ProfilePage } from './Profile';
import { AgendaPage } from './Activity';
import { ExhibitionApply } from './Activity/ExhibitionApply';
import { ShowRoom } from './Activity/ShowRoom';
import { PartnerDetail } from './Activity/PartnerDetail';
import { AgendaDetail } from './Activity/AgendaDetail';

const menu = [
    {
        title: '大会议程 Agenda',
        href: '#conf-agenda'
    },
    {
        title: '立即投稿 CFP',
        href: 'https://jinshuju.net/f/zWuGxB'
    },
    {
        title: '报名志愿者 Volunteer',
        href: 'https://jinshuju.net/f/t58Hb6'
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
            and hosted on <a href="https://azure.microsoft.com/?WT.mc_id=python-10572-xinglzhu">Microsoft Azure</a> by{' '}
            <a href="https://docs.microsoft.com/azure/static-web-apps/?WT.mc_id=python-10572-xinglzhu">Static Web Apps</a>.
        </footer>
    </div>
));

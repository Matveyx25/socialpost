import { useMemo } from "react";
import { Breadcrumb } from "react-breadcrumbs";
import { Link } from "react-router-dom";
import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs";
import { useProfile } from "../../../hooks/useProfile";
import s from './Breadcrumbs.module.scss'
import { useCampaignById } from "../../../hooks/useCampaignById";
import { usePost } from '../../../hooks/usePost';

const DynamicCampaign = ({ match }) => {
	const {data} = useCampaignById(match.params.companyId)
	
	return (
  	<span>{data?.name}</span>
	)
};
const DynamicPost = ({ match }) => {
	const {data} = usePost(match.params.postId)
	
	return (
  	<span>{data?.name}</span>
	)
};


const publisherRoutes = [
	{path: '/profile/', breadcrumb: 'Профиль'},
	{path: '/dashboard/', breadcrumb: 'Дашборд'},
	{path: '/my-channels/', breadcrumb: 'Мои каналы'},
	{path: '/placement-appointments/', breadcrumb: 'Заявки на размещение'},
	{path: '/appointment/', breadcrumb: 'Заявки на размещение / Бесплатный урок'},
	{path: '/payments/', breadcrumb: 'Кошелек'},
	{path: '/requisites/', breadcrumb: 'Реквизиты'},
	{path: '/faq/', breadcrumb: 'FAQ'},
	{path: '/support/', breadcrumb: 'Поддержка'},
]

const advertiserRoutes = [
	{path: '/profile/', breadcrumb: 'Настройки'},
	{path: '/dashboard/', breadcrumb: 'Рекламные компании'},
	{path: '/dashboard/:companyId', breadcrumb: DynamicCampaign},
	{path: '/dashboard/:companyId/:postId', breadcrumb: DynamicPost},
	{path: '/dashboard/:companyId/:postId/create-request', breadcrumb: 'Разместить запись'},
	{path: '/clients/', breadcrumb: 'Клиенты'},
	{path: '/placement-appointments/', breadcrumb: 'Заявки на размещение'},
	{path: '/appointment/', breadcrumb: 'Заявки на размещение / Бесплатный урок'},
	{path: '/payments/', breadcrumb: 'Кошелек'},
	{path: '/requisites/', breadcrumb: 'Реквизиты'},
	{path: '/faq/', breadcrumb: 'FAQ'},
	{path: '/support/', breadcrumb: 'Поддержка'},
]


export const Breadcrumbs = () => {
	const {data: profile} = useProfile()
  const breadcrumbs = useReactRouterBreadcrumbs(profile.roles.includes('PUBLISHER') ? publisherRoutes : advertiserRoutes, {disableDefaults: true}); // Pass custom routes if any

  return (
    <nav aria-label="breadcrumb" className={s.breadcrumbs}>
      <ol>
        {breadcrumbs.map(({ breadcrumb, match }, index) => (
          <li key={index}>
            <Link to={match.pathname}>
              {breadcrumb}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

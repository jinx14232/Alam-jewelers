import { Link } from 'react-router-dom';

export default function BreadCrumbs({ breadCrumbs }) {

    return (
        <div className="breadcrumbs">

            {breadCrumbs.map((crumb, id) => (
                <>
                    <Link key={id} to={crumb.link} className={id == breadCrumbs.length - 1? 'current': ''} >{crumb.name}</Link>
                    {id < breadCrumbs.length - 1 &&
                        <span>/</span>
                    }
                </>
            ))}

        </div>
    )

}

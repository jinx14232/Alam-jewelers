export default function (props) {
    return (
        <>
            <div className="page-heading">
                <div>
                    <h1 className='main-heading'>{props.heading}</h1>
                    <p className="page-description muted">
                        {props.subHeading}
                    </p>
                </div>
            </div>
        </>
    )
}
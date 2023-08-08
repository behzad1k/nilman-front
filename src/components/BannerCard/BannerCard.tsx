type IProps = {
    title: string,
    description: string,
    button: string,
    iconSrc: string
    // style?: Style
}
export function BannerCard({title,description,button,iconSrc}: IProps) {
    return (
        <article className="bannerCard">
            <img src={iconSrc}/>
            <h2>{title}</h2>
            <p>{description}</p>
            <button>
                {button}
                <i></i>
            </button>
        </article>
    )
}

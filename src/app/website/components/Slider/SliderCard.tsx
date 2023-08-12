type IProps = {
    imgSrc: string,
}
export default function SliderCard({imgSrc}: IProps) {
    return(
        <div className="sliderCard" style={{backgroundImage: `url(${imgSrc})`}}>
            <span>
                <p>ناخن خوب</p>
                <i></i>
            </span>

        </div>
    )
}

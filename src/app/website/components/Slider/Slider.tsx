import SliderCard from "./SliderCard.tsx";

type IProps = {
    title?: string
}
export function Slider({title}: IProps) {
    return(
        <div className="sliderContainer">
            <h4>{title}</h4>
            <div className="sliderCardContainer">
                <SliderCard imgSrc='../../public/img/img1.jpg'/>
                <SliderCard imgSrc='../../public/img/img2.jpg'/>
                <SliderCard imgSrc='../../public/img/img3.jpg'/>
                <SliderCard imgSrc='../../public/img/img4.jpg'/>
                <SliderCard imgSrc='../../public/img/img5.jpg'/>
            </div>
        </div>
    )
}

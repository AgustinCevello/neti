import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import './embla.css'

const noSelect = {
    WebkitUserSelect: 'none', MozUserSelect: 'none',
    msUserSelect: 'none', userSelect: 'none',
    WebkitUserDrag: 'none',
}

const EmblaCarousel = ({ slides, options }) => {
    const autoplayPlugin = Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { ...options, loop: true },
        [autoplayPlugin]
    )

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((src, index) => (
                        <div className="embla__slide" key={index}>
                            <img
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="embla__slide__img"
                                style={noSelect}
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>
                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '')}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel
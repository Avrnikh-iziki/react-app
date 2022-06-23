import React, { useState, useCallback, useEffect } from 'react'
import './pagination.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'


function Pagination({ numberOfPages, page, setpage }) {
    const [width, setWidth] = useState(window.innerWidth);
    const [incr, setincr] = useState(0)

    let index = width > 200
        ? width > 240
            ? width > 340
                ? width > 400
                    ? 9
                    : 7
                : 5
            : 3
        : 2


    const pages = numberOfPages > index ? index : numberOfPages
    const handleLeft = () => {
        if (incr > 0) setincr(incr - 1)
    }

    const handleRight = () => {
        if (incr < numberOfPages - index) setincr(incr + 1)
    }

    const handlepage = useCallback(
        (currentpage) => () => {
            setpage(currentpage)
            if (currentpage === incr + index && incr < numberOfPages - index) setincr(incr + 1)
            if (currentpage === incr + 1 && incr > 0) setincr(incr - 1)
        }, [incr, numberOfPages, setpage, index]
    )


    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

 
    return (
        < div className='pagination'>
            <div className='arraw' onClick={handleLeft}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className='slid'>
                {
                    (incr > 0 && numberOfPages > index) && <div className='dote'> ..</div>
                }
                {
                    [...Array(pages)].map((el, index) => {
                        let currentpage = (index + 1) + incr
                        return (
                            <button
                                key={index}
                                className={page === currentpage
                                    ? 'pagenumber active'
                                    : 'pagenumber'}
                                onClick={handlepage(currentpage)}
                            >
                                {currentpage}
                            </button>
                        )
                    })
                }
                {
                    (incr + index < numberOfPages && numberOfPages > index) && <div className='dote'> ..</div>
                }
            </div>
            <div className='arraw' onClick={handleRight}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </div>
    )
}

export default Pagination
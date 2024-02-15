import React, { useState, useEffect, useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import RightContent from './RightSideContent/RightContent';
import { FilterContext } from '../../context/FilterContext';
// import './CategoryBody.css'; // Import CSS file for styles

const CategoryBody = () => {
    const { selectedSort, setSelectedSort } = useContext(FilterContext);
    // const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(window.innerWidth > 576);
    const [sortByOpen, setSortByOpen] = useState(false);

    const handleSortBy = () => {
        setSortByOpen(!sortByOpen);
    };
    useEffect(() => {
        const handleResize = () => {
            setIsFilterOpen(window.innerWidth > 576);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };
    const onChangeSort = (e) => {
        setSortByOpen(false);
        setSelectedSort(e.target.value)
    }

    return (
        <>
            <div className="filter-sort-half">
                <div className="filter-half" onClick={toggleFilter}>Filter</div>
                <div className="filter-half" onClick={handleSortBy}>Sort By</div>
                {/* {sortByOpen && ( */}
                <div className={`sort-options ${sortByOpen ? 'open' : ''}`}>
                    <div className='options-content'>
                        <label htmlFor="default">Default</label>
                        <input type="radio" id="default" name="sortOption" value="" onChange={(e) => onChangeSort(e)} checked={selectedSort === ''} />
                    </div>
                    <div className='options-content'>
                        <label htmlFor="popular">Popular</label>
                        <input type="radio" id="popular" name="sortOption" value="popular" onChange={(e) => onChangeSort(e)} checked={selectedSort === 'popular'} />
                    </div>
                    <div className='options-content'>
                        <label htmlFor="new_arrival">New Arrivals</label>
                        <input type="radio" id="new_arrival" name="sortOption" value="new_arrival" onChange={(e) => onChangeSort(e)} checked={selectedSort === 'new_arrival'} />
                    </div>
                    <div className='options-content'>
                        <label htmlFor="ascending">Price Low to High</label>
                        <input type="radio" id="ascending" name="sortOption" value="ascending" onChange={(e) => onChangeSort(e)} checked={selectedSort === 'ascending'} />
                    </div>
                    <div className='options-content'>
                        <label htmlFor="descending">Price High to Low</label>
                        <input type="radio" id="descending" name="sortOption" value="descending" onChange={(e) => onChangeSort(e)} checked={selectedSort === 'descending'} />
                    </div>
                </div>
                {/* )} */}
            </div>
            <Container fluid>
                <Row>
                    <Col md={3} className={`left-sidebar ${isFilterOpen ? 'open' : ''}`}>
                        <LeftSideBar onClose={toggleFilter} />
                    </Col>
                    <Col md={9} className='mobile-grey'>
                        <RightContent />
                    </Col>
                </Row>
            </Container>
            {isFilterOpen && (
                <div className="backdrop" onClick={toggleFilter}></div>
            )}
        </>
    );
};

export default CategoryBody;

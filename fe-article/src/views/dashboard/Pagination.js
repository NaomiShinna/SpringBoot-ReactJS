import React from 'react'
import './pagination.css'
import { CCard, CCol, CRow, CCardBody } from '@coreui/react'
const renderData = (data) => {
  return (
    <>
      {data &&
        data.map((item, index) => (
          <CCard className="mb-4" key={index}>
            <CCardBody>
              <table className="table">
                <thead>
                  <tr>
                    <th className="h2">{item.title}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="h6">Category: {item.category}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="h6">{item.content}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Created Date: {new Date(item.created_date).toString()}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        ))}
    </>
  )
}
const Pagination = (props) => {
  const { currentPage, maxPageLimit, minPageLimit, response } = props;
  const totalPages = maxPageLimit - 1;
  const data = response;

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  const handlePrevClick = () => {
    props.onPrevClick()
    console.log(data, ' ini hasil data ')
  }

  const handleNextClick = () => {
    props.onNextClick()
  }

  const handlePageClick = (e) => {
    props.onPageChange(Number(e.target.id))
  }

  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li
          key={page}
          id={page}
          onClick={handlePageClick}
          className={currentPage === page ? 'active' : null}
        >
          {page}
        </li>
      )
    } else {
      return null
    }
  })

  // page ellipses
  let pageIncrementEllipses = null
  if (pages.length > maxPageLimit) {
    pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>
  }
  let pageDecremenEllipses = null
  if (minPageLimit >= 1) {
    pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li>
  }

  return (
    <div className="main">
      <div className="mainData">{renderData(data)}</div>
      <div className="mainData">{renderData(data)}</div>
      <ul className="pageNumbers">
        <li>
          <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>
            Prev
          </button>
        </li>
        {pageDecremenEllipses}
        {pageNumbers}
        {pageIncrementEllipses}
        <li>
          <button onClick={handleNextClick} disabled={currentPage === pages[pages.length - 1]}>
            Next
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination

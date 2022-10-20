import React, { useEffect, useState } from 'react'
import {  CCol, CRow } from '@coreui/react'
import './pagination.css'
import Pagination from './Pagination'

const Preview = () => {
  const [setJumlahData] = useState([])
  const [setArticle] = useState([])
  const pageNumberLimit = 2
  const [dataArticle, setDataArticle] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPageLimit, setMaxPageLimit] = useState(1)
  const [minPageLimit, setMinPageLimit] = useState(0)
  const urlAPI = 'http://localhost:8080/article'
  const urlAPIPagination = 'http://localhost:8080/article/publish/2/'
  const paramsGet = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  }

  useEffect(() => {
    getPublishArticle()
  }, [])

  useEffect(() => {
    console.log(dataArticle, ' masuk sini')
    getArticlePublishByLimitOffset()
  }, [currentPage])

  const getArticlePublishByLimitOffset = async () => {
    setLoading(true)
    // fetch(`https://api.instantwebtools.net/v1/passenger?currentPage=${currentPage}&size=5`)
    await fetch(urlAPIPagination.concat(currentPage), paramsGet)
      .then((response) => response.json())
      .then((data) => {
        setDataArticle(data), setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getPublishArticle = async () => {
    await fetch(urlAPI.concat('/publish'), paramsGet)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data), setJumlahData(data.length)
      })
  }

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const onPrevClick = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit)
      setMinPageLimit(minPageLimit - pageNumberLimit)
    }
    setCurrentPage((prev) => prev - 1)
  }

  const onNextClick = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit)
      setMinPageLimit(minPageLimit + pageNumberLimit)
    }
    setCurrentPage((prev) => prev + 1)
  }

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    response: dataArticle,
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <div>
            <h2>Artikel Publish List</h2>
            {!loading ? (
              <Pagination
                {...paginationAttributes}
                onPrevClick={onPrevClick}
                onNextClick={onNextClick}
                onPageChange={onPageChange}
              />
            ) : (
              <div> AYOOOLAHHH... </div>
            )}
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default Preview

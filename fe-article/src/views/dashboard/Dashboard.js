import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CButton,
  CNav,
  CCardHeader,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CPagination,
  CPaginationItem,
  CTableRow,
  CNavLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'

import { DocsExample } from 'src/components'

const Dashboard = () => {
  const [jumlahData, setJumlahData] = useState([])
  const [article, setArticle] = useState([])
  const urlAPI = 'http://localhost:8080/article'
  const paramsGet = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    // body: JSON.stringify()
  }

  const [stateTabClass, setStateTabClass] = useState([])

  useEffect(() => {
    getArticlePublish()
    setStateTabClass('publish')
  }, [])

  const getAllArticle = async () => {
    await fetch(urlAPI, paramsGet)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data)
      })
  }

  const getArticlePublish = async () => {
    await fetch(urlAPI.concat('/publish'), paramsGet)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data), setJumlahData(data.length)
      })

    setStateTabClass('publish')
  }

  const getArticleDraft = async () => {
    await fetch(urlAPI.concat('/draft'), paramsGet)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data), setJumlahData(data.length)
      })

    setStateTabClass('draft')
  }

  const getArticleTrash = async () => {
    await fetch(urlAPI.concat('/thrash'), paramsGet)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data), setJumlahData(data.length)
      })

    setStateTabClass('trash')
  }

  const [visible, setVisible] = useState(false)
  const [idArticle, setIdArticle] = useState([])
  const [title, setTitle] = useState([])
  const [category, setCategory] = useState([])
  const [content, setContent] = useState([])
  const [status, setStatus] = useState([])
  const [inputPost, setInputPost] = useState([])
  const [jenisButton, setJenisButton] = useState([])

  const [selectedOption, setSelectedOption] = useState([])

  const handleOptionChange = async (changeEvent) => {
    setSelectedOption(changeEvent.target.value)
    setStatus(changeEvent.target.value)
  }

  const urlAPIPOST = 'http://localhost:8080/article'
  const paramsPOST = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      content: content,
      category: category,
      status: status,
    }),
  }

  const closeModalArticle = async () => {
    setVisible(false)
    setSelectedOption('')
    setStatus('')
  }

  const submitPostArticle = async (e) => {

    await fetch(urlAPIPOST, paramsPOST)
      .then((response) => response.json())
      .then((data) => {
        setInputPost(data)
      })

    setVisible(false)
  }

  const urlAPIPUT = 'http://localhost:8080/article/'
  const paramsPUTEdit = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      content: content,
      category: category,
      status: status,
    }),
  }

  const submitEditArticle = async (e) => {
    setVisible(false);
   
    await fetch(urlAPIPUT.concat(idArticle), paramsPUTEdit)
      .then((response) => response.json())
      .then((data) => {
        setInputPost(data)
      });
      window.location.reload();
  }



  const clickEditModal = async (changeEvent) => {
    setVisible(!visible)

    const getIdInAPI = 'http://localhost:8080/article/find/'
    const paramsGetAPI = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    }
    const { value } = changeEvent.target

    fetch(getIdInAPI.concat(value), paramsGetAPI)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title),
          setContent(data.content),
          setCategory(data.category),
          setSelectedOption(data.status),
          setStatus(data.status)
      })
    setIdArticle(value), setJenisButton(changeEvent.target.name)
  }

  const paramsPUT = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      content: content,
      category: category,
      status: 'thrash',
    }),
  }

  const submitEditThrashArticle = async (e) => {
    setVisible(false);
   
    await fetch(urlAPIPUT.concat(idArticle), paramsPUT)
      .then((response) => response.json())
      .then((data) => {
        setInputPost(data)
      });
      window.location.reload();
    
  }

  const urlAPIDELETE = 'http://localhost:8080/article/'
  const paramsDELETE = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  }

  const submitDeleteArticle = async (e) => {
    setVisible(false);
    

    await fetch(urlAPIDELETE.concat(idArticle), paramsDELETE)
      .then((response) => response.json())
      .then((data) => {
        setInputPost(data)
      });
      window.location.reload();
    
  }

  const clickTrashModal = async (changeEvent) => {
    setVisible(!visible)

    const getIdInAPI = 'http://localhost:8080/article/find/'
    const paramsGetAPI = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    }
    const { value } = changeEvent.target


    fetch(getIdInAPI.concat(value), paramsGetAPI)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title),
          setContent(data.content),
          setCategory(data.category),
          setSelectedOption(data.status)
      })
    setIdArticle(value), setJenisButton(changeEvent.target.name)
  }

  const clickPostModal = (changeEvent) => {
    setVisible(!visible)
    setJenisButton(changeEvent.target.name)
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Tab Artikel Post</strong>
              </CCardHeader>
              <CButton color={'primary'} name="new-artikel" onClick={clickPostModal}>
                <span style={{ color: 'white' }}>New Article</span>
              </CButton>
              <CCardBody>
                <DocsExample href="components/nav#working-with-flex-utilities">
                  <CNav component="nav" variant="pills" className="flex-column flex-sm-row">
                    <CNavLink
                      className={stateTabClass == 'publish' ? 'active' : ''}
                      onClick={getArticlePublish}
                    >
                      publish
                    </CNavLink>
                    <CNavLink
                      className={stateTabClass == 'draft' ? 'active' : ''}
                      onClick={getArticleDraft}
                    >
                      draft
                    </CNavLink>
                    <CNavLink
                      className={stateTabClass == 'trash' ? 'active' : ''}
                      onClick={getArticleTrash}
                    >
                      trash
                    </CNavLink>
                  </CNav>
                </DocsExample>
              </CCardBody>
            </CCard>

            <CCardBody>
              <br />
              <span>
                {stateTabClass} data ada sebanyak: {jumlahData}
              </span>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">No.</CTableHeaderCell>
                    <CTableHeaderCell>Title</CTableHeaderCell>
                    <CTableHeaderCell>Category</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {article.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <p>{index + 1}</p>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.title}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.category}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          <CButton
                            style={{ marginRight: 5 }}
                            id={item.id}
                            value={item.id}
                            color={'secondary'}
                            name="edit-artikel"
                            onClick={clickEditModal}
                          >
                            Edit
                          </CButton>
                          <CButton
                            color={'danger'}
                            value={item.id}
                            id={item.id}
                            name="trash-artikel"
                            onClick={clickTrashModal}
                          >
                            {stateTabClass === 'trash' ? 'Delete' : 'Trash'}
                          </CButton>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>


            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal fullscreen backdrop="static" visible={visible} onClose={closeModalArticle}>
        <CModalHeader>
          <CModalTitle>
            {jenisButton === 'new-artikel' ? 'Post Artikel Baru' : 'Artikel'}
          </CModalTitle>
        </CModalHeader>
        <form
          onSubmit={
            stateTabClass === 'trash' && jenisButton === 'trash-artikel'
              ? submitDeleteArticle
              : jenisButton === 'trash-artikel'
              ? submitEditThrashArticle
              : jenisButton === 'new-artikel'
              ? submitPostArticle
              : submitEditArticle
          }
        >
          <CModalBody>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                size="20"
                placeholder="Title"
                className="form-control"
                id="title"
                name="title"
                required
                onChange={(event) => setTitle(event.target.value)}
                value={
                  jenisButton === 'trash-artikel' || jenisButton === 'edit-artikel'
                    ? title
                    : undefined
                }
                disabled={jenisButton === 'trash-artikel' ? true : false}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                size="200"
                placeholder="content"
                required
                className="form-control"
                id="content"
                name="content"
                onChange={(event) => setContent(event.target.value)}
                value={
                  jenisButton === 'trash-artikel' || jenisButton === 'edit-artikel'
                    ? content
                    : undefined
                }
                disabled={jenisButton === 'trash-artikel' ? true : false}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                size="3"
                placeholder="category"
                required
                className="form-control"
                id="category"
                name="category"
                onChange={(event) => setCategory(event.target.value)}
                value={
                  jenisButton === 'trash-artikel' || jenisButton === 'edit-artikel'
                    ? category
                    : undefined
                }
                disabled={jenisButton === 'trash-artikel' ? true : false}
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <div className="radio">
                <label>
                  <input
                    required
                    type="radio"
                    checked={selectedOption === 'publish'}
                    onChange={handleOptionChange}
                    value="publish"
                    name="status"
                    id="status"
                    disabled={jenisButton === 'trash-artikel' ? true : false}
                  />
                  Publish
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    checked={selectedOption === 'draft'}
                    onChange={handleOptionChange}
                    value="draft"
                    name="status"
                    id="status"
                    disabled={jenisButton === 'trash-artikel' ? true : false}
                  />
                  Draft
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    checked={selectedOption === 'thrash'}
                    onChange={handleOptionChange}
                    value="thrash"
                    name="status"
                    id="status"
                    disabled={jenisButton === 'trash-artikel' ? true : false}
                  />
                  Trash
                </label>
              </div>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={closeModalArticle}>
              Close
            </CButton>
            {jenisButton === 'trash-artikel' ? (
              stateTabClass === 'trash' ?  
              <CButton color="danger" type="submit">
              Delete
            </CButton>
            :
              <CButton color="danger" type="submit">
                Trash
              </CButton>
            ) : (
              <CButton color="primary" type="submit">
                Submit
              </CButton>
            )}
          </CModalFooter>
        </form>
      </CModal>
    </>
  )
}

export default Dashboard

import React, { useEffect, useState } from "react"
import api from "../../lib/api"
import PageList from "./list"

const CustomPageList = props => {
  const [pages, setPages] = useState([])

  useEffect(() => {
    fetchData(props)
  }, [])

  // useEffect(nextProps) {
  //   fetchData(nextProps)
  // }

  const fetchData = ({ tags, sort }) => {
    const filter = {
      tags: tags,
      sort: sort,
    }

    api.ajax.pages.list(filter).then(({ status, json }) => {
      setPages(json)
    })
  }

  return <PageList pages={pages} />
}

export default CustomPageList
